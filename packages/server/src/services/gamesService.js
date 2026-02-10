import prisma from '../lib/prisma.js';

const parseDate = (value) => {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed;
};

const normalizeStringArray = (value) => {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }
  return undefined;
};

const normalizeGameInput = (data = {}) => {
  const {
    title,
    description,
    image,
    cardImageUrl,
    bannerImageUrl,
    heroVideoUrls,
    detailImageUrls,
    displayOrder,
    genre,
    platform,
    studio,
    rating,
    releaseDate,
    publishedAt,
    isPopular,
    isFeatured,
    isArchived,
    isDeleted,
    isPublished
  } = data;

  const normalized = {
    title,
    description,
    image,
    cardImageUrl,
    bannerImageUrl,
    heroVideoUrls: normalizeStringArray(heroVideoUrls),
    detailImageUrls: normalizeStringArray(detailImageUrls),
    displayOrder: displayOrder === undefined ? undefined : Number(displayOrder),
    genre,
    platform,
    studio,
    rating: rating === undefined ? undefined : Number(rating),
    isPopular,
    isFeatured,
    isArchived,
    isDeleted,
    isPublished
  };

  const parsedReleaseDate = parseDate(releaseDate);
  if (parsedReleaseDate) normalized.releaseDate = parsedReleaseDate;

  const parsedPublishedAt = parseDate(publishedAt);
  if (parsedPublishedAt) normalized.publishedAt = parsedPublishedAt;

  return normalized;
};

export const getGames = async (options = {}) => {
  const {
    includeDeleted = false,
    search,
    isPopular,
    isFeatured,
    isArchived,
    isPublished,
    skip,
    take,
    orderBy = 'publishedAt',
    order = 'desc'
  } = options;

  const where = {};
  const andFilters = [];
  if (!includeDeleted) {
    andFilters.push({ OR: [{ isDeleted: false }, { isDeleted: null }] });
  }
  if (typeof isPopular === 'boolean') where.isPopular = isPopular;
  if (typeof isFeatured === 'boolean') where.isFeatured = isFeatured;
  if (typeof isArchived === 'boolean') where.isArchived = isArchived;
  if (typeof isPublished === 'boolean') where.isPublished = isPublished;

  if (search) {
    andFilters.push({
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { genre: { contains: search, mode: 'insensitive' } },
        { studio: { contains: search, mode: 'insensitive' } },
        { platform: { contains: search, mode: 'insensitive' } }
      ]
    });
  }

  if (andFilters.length) {
    where.AND = andFilters;
  }

  return prisma.games.findMany({
    where,
    orderBy: { [orderBy]: order },
    skip,
    take
  });
};

export const getGameById = async (id, options = {}) => {
  const { includeDeleted = false } = options;
  const where = includeDeleted
    ? { id }
    : { id, OR: [{ isDeleted: false }, { isDeleted: null }] };
  return prisma.games.findFirst({ where });
};

export const createGame = async (data) =>
  prisma.games.create({ data: normalizeGameInput(data) });

export const updateGame = async (id, data) =>
  prisma.games.update({ where: { id }, data: normalizeGameInput(data) });

export const deleteGame = async (id, options = {}) => {
  const { hard = false } = options;
  if (hard) {
    return prisma.games.delete({ where: { id } });
  }
  return prisma.games.update({ where: { id }, data: { isDeleted: true } });
};

export default {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
};
