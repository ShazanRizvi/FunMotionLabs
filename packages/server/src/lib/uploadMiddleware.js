import multer from 'multer';

const memoryStorage = multer.memoryStorage();

export const upload = multer({
  storage: memoryStorage,
  limits: {
    files: 20,
    fileSize: 100 * 1024 * 1024 // 100MB per file
  }
});

const asArray = (value) => {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
};

const getBodyArray = (body, field) => {
  const values = [...asArray(body?.[field]), ...asArray(body?.[`${field}[]`])];
  return values.filter((item) => item !== undefined && item !== null && item !== '');
};

const getFilesArray = (files, field) => {
  const values = [...asArray(files?.[field]), ...asArray(files?.[`${field}[]`])];
  return values.filter(Boolean);
};

const getSingle = (body, files, field) => {
  const file = getFilesArray(files, field)[0];
  if (file) return file;

  if (body?.[field] !== undefined) return body[field];
  if (body?.[`${field}[]`] !== undefined) return body[`${field}[]`];
  return undefined;
};

const getCombinedArray = (body, files, field) => {
  const bodyItems = getBodyArray(body, field);
  const fileItems = getFilesArray(files, field);
  return [...bodyItems, ...fileItems];
};

export const buildBlogMultipartPayload = (req) => {
  const body = req.body || {};
  const files = req.files || {};

  return {
    ...body,
    image: getSingle(body, files, 'image')
  };
};

export const buildGamesMultipartPayload = (req) => {
  const body = req.body || {};
  const files = req.files || {};

  const payload = {
    ...body,
    image: getSingle(body, files, 'image'),
    cardImageUrl: getSingle(body, files, 'cardImageUrl'),
    bannerImageUrl: getSingle(body, files, 'bannerImageUrl')
  };

  const heroVideoUrls = getCombinedArray(body, files, 'heroVideoUrls');
  if (heroVideoUrls.length) payload.heroVideoUrls = heroVideoUrls;

  const detailImageUrls = getCombinedArray(body, files, 'detailImageUrls');
  if (detailImageUrls.length) payload.detailImageUrls = detailImageUrls;

  return payload;
};

