import { Storage } from '@google-cloud/storage';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

const gcsBucketName = process.env.GCS_BUCKET_NAME;
const gcsProjectId = process.env.GCS_PROJECT_ID;
const gcsKeyFilename = process.env.GCS_KEY_FILE;
const gcsBasePath = process.env.GCS_BASE_PATH || 'assets';

let storageClient;
let bucketClient;

const MIME_TO_EXTENSION = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/quicktime': 'mov'
};

const EXTENSION_TO_MIME = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime'
};

const isUrl = (value) => {
  if (typeof value !== 'string') return false;
  return /^https?:\/\//i.test(value) || /^gs:\/\//i.test(value);
};

const ensureGcsClient = () => {
  if (bucketClient) return bucketClient;
  if (!gcsBucketName) {
    throw new Error('GCS_BUCKET_NAME is required for media uploads');
  }

  if (!storageClient) {
    const config = {};
    if (gcsProjectId) config.projectId = gcsProjectId;
    if (gcsKeyFilename) config.keyFilename = gcsKeyFilename;
    storageClient = new Storage(config);
  }

  bucketClient = storageClient.bucket(gcsBucketName);
  return bucketClient;
};

const sanitizeFileName = (value) =>
  String(value || 'file')
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-');

const extensionFromMime = (mimeType) => MIME_TO_EXTENSION[mimeType] || 'bin';

const mimeFromExtension = (fileName) => {
  const ext = path.extname(String(fileName || '')).replace('.', '').toLowerCase();
  return EXTENSION_TO_MIME[ext];
};

const detectMimeFromBuffer = (buffer) => {
  if (!Buffer.isBuffer(buffer) || buffer.length < 12) return undefined;

  // PNG
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'image/png';
  }

  // JPEG
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }

  // GIF
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) {
    return 'image/gif';
  }

  // WEBP: RIFF....WEBP
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return 'image/webp';
  }

  // MP4/MOV family: ...ftyp....
  if (buffer.length >= 12) {
    const brand = buffer.toString('ascii', 8, 12);
    if (buffer.toString('ascii', 4, 8) === 'ftyp') {
      if (brand === 'qt  ') return 'video/quicktime';
      return 'video/mp4';
    }
  }

  return undefined;
};

const parseDataUrl = (value) => {
  if (typeof value !== 'string') return null;
  const match = value.match(/^data:([^;,]+);base64,(.+)$/);
  if (!match) return null;
  const mimeType = match[1];
  const rawData = match[2];
  return { mimeType, buffer: Buffer.from(rawData, 'base64') };
};

const parseAssetPayload = (value) => {
  if (value == null) return null;

  if (typeof value === 'object' && Buffer.isBuffer(value.buffer) && value.mimetype) {
    return {
      buffer: value.buffer,
      mimeType: value.mimetype,
      fileName: value.originalname ?? value.filename ?? null
    };
  }

  if (typeof value === 'string') {
    if (isUrl(value)) return null;

    if (value === '[object Object]') {
      return null;
    }

    const parsedDataUrl = parseDataUrl(value);
    if (parsedDataUrl) {
      return {
        buffer: parsedDataUrl.buffer,
        mimeType: parsedDataUrl.mimeType,
        fileName: null
      };
    }

    try {
      const parsedJson = JSON.parse(value);
      const parsedFromJson = parseAssetPayload(parsedJson);
      if (parsedFromJson) return parsedFromJson;
    } catch {
      // keep trying other string formats
    }

    return null;
  }

  if (typeof value === 'object') {
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return {
        buffer: Buffer.from(value.data),
        mimeType: 'application/octet-stream',
        fileName: value.fileName ?? value.filename ?? value.name ?? null
      };
    }

    if (value.file && typeof value.file === 'object') {
      const parsedNested = parseAssetPayload(value.file);
      if (parsedNested) return parsedNested;
    }

    const dataValue =
      value.data ??
      value.base64 ??
      value.content ??
      value.dataUrl ??
      value.dataURL ??
      value.base64Data ??
      value.fileData ??
      value.value;

    if (typeof dataValue !== 'string') return null;
    if (isUrl(dataValue)) return null;

    const parsedDataUrl = parseDataUrl(dataValue);
    if (parsedDataUrl) {
      return {
        buffer: parsedDataUrl.buffer,
        mimeType:
          value.mimeType ?? value.contentType ?? value.type ?? value.mime ?? parsedDataUrl.mimeType,
        fileName: value.fileName ?? value.filename ?? value.name ?? null
      };
    }

    const mimeType = value.mimeType ?? value.contentType ?? value.type ?? value.mime ?? 'application/octet-stream';
    return {
      buffer: Buffer.from(dataValue, 'base64'),
      mimeType,
      fileName: value.fileName ?? value.filename ?? value.name ?? null
    };
  }

  return null;
};

const buildDestination = (folder, mimeType, fileNameHint) => {
  const extFromName = path.extname(String(fileNameHint || '')).replace('.', '').toLowerCase();
  const ext = extFromName || extensionFromMime(mimeType);
  const safeHint = fileNameHint
    ? sanitizeFileName(path.basename(fileNameHint, path.extname(fileNameHint)))
    : randomUUID();
  const stampedName = `${Date.now()}-${safeHint}.${ext}`;
  return `${gcsBasePath}/${folder}/${stampedName}`;
};

export const uploadAssetIfNeeded = async (value, folder) => {
  if (value == null) return value;

  const parsed = parseAssetPayload(value);
  if (!parsed) {
    return typeof value === 'object' && value !== null
      ? value.url ?? value.publicUrl ?? null
      : value;
  }

  if (!parsed.buffer || !Buffer.isBuffer(parsed.buffer) || parsed.buffer.length === 0) {
    throw new Error('Invalid upload payload: empty file buffer');
  }

  if (!parsed.mimeType || parsed.mimeType === 'application/octet-stream') {
    parsed.mimeType =
      mimeFromExtension(parsed.fileName) || detectMimeFromBuffer(parsed.buffer) || parsed.mimeType;
  }

  if (!parsed.mimeType || parsed.mimeType === 'application/octet-stream') {
    throw new Error(
      'Could not determine uploaded file type. Ensure ToolJet sends actual file binary in multipart/form-data.'
    );
  }

  const bucket = ensureGcsClient();
  const destination = buildDestination(folder, parsed.mimeType, parsed.fileName);
  const file = bucket.file(destination);

  await file.save(parsed.buffer, {
    metadata: { contentType: parsed.mimeType },
    resumable: false
  });

  return `https://storage.googleapis.com/${gcsBucketName}/${destination}`;
};

export const uploadAssetArrayIfNeeded = async (values, folder) => {
  if (!Array.isArray(values)) return values;
  const uploaded = await Promise.all(values.map((item) => uploadAssetIfNeeded(item, folder)));
  return uploaded.filter(Boolean);
};
