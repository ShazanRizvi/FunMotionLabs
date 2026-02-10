import prisma from '../lib/prisma.js';

const parseReadTime = (readTime) => {
  if (readTime == null) return undefined;
  if (typeof readTime === 'number' && Number.isFinite(readTime)) return readTime;
  if (typeof readTime === 'string') {
    const match = readTime.match(/\d+/);
    if (match) {
      const value = Number(match[0]);
      return Number.isFinite(value) ? value : undefined;
    }
  }
  return undefined;
};

const normalizeBlogInput = (data = {}) => {
  const {
    title,
    author,
    Author,
    timetoRead,
    readTime,
    image,
    excerpt,
    publishedAt,
    isPopular,
    isFeatured,
    isArchived,
    isDeleted,
    isPublished,
    content
  } = data;

  const normalized = {
    title,
    Author: Author ?? author,
    timetoRead: timetoRead ?? parseReadTime(readTime),
    image,
    excerpt,
    isPopular,
    isFeatured,
    isArchived,
    isDeleted,
    isPublished
  };

  if (publishedAt) {
    const parsedDate = new Date(publishedAt);
    if (!Number.isNaN(parsedDate.getTime())) {
      normalized.publishedAt = parsedDate;
    }
  }

  if (content !== undefined) {
    normalized.content = Array.isArray(content) ? JSON.stringify(content) : content;
  }

  return normalized;
};

const deserializeBlog = (blog) => {
  if (!blog) return blog;
  let content = blog.content;
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        content = parsed;
      }
    } catch {
      // keep original string
    }
  }
  return { ...blog, content };
};

export const getBlogs = async (options = {}) => {
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
      { excerpt: { contains: search, mode: 'insensitive' } },
      { Author: { contains: search, mode: 'insensitive' } }
      ]
    });
  }

  if (andFilters.length) {
    where.AND = andFilters;
  }

  const blogs = await prisma.blogs.findMany({
    where,
    orderBy: { [orderBy]: order },
    skip,
    take
  });

  return blogs.map(deserializeBlog);
};

export const getBlogById = async (id, options = {}) => {
  const { includeDeleted = false } = options;
  const where = includeDeleted
    ? { id }
    : { id, OR: [{ isDeleted: false }, { isDeleted: null }] };
  const blog = await prisma.blogs.findFirst({ where });
  return deserializeBlog(blog);
};

export const createBlog = async (data) => {
  const blog = await prisma.blogs.create({
    data: normalizeBlogInput(data)
  });
  return deserializeBlog(blog);
};

export const updateBlog = async (id, data) => {
  const blog = await prisma.blogs.update({
    where: { id },
    data: normalizeBlogInput(data)
  });
  return deserializeBlog(blog);
};

export const deleteBlog = async (id, options = {}) => {
  const { hard = false } = options;
  if (hard) {
    return prisma.blogs.delete({ where: { id } });
  }
  return prisma.blogs.update({
    where: { id },
    data: { isDeleted: true }
  });
};

export default {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
