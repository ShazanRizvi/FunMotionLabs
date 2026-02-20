import * as blogService from '../services/blog.js';
import { buildBlogMultipartPayload } from '../lib/uploadMiddleware.js';

const getBlogs = async (req, res, next) => {
  try {
    const {
      includeDeleted,
      search,
      isPopular,
      isFeatured,
      isArchived,
      isPublished,
      skip,
      take,
      orderBy,
      order
    } = req.query;

    const blogs = await blogService.getBlogs({
      includeDeleted: includeDeleted === 'true',
      search,
      isPopular: isPopular === undefined ? undefined : isPopular === 'true',
      isFeatured: isFeatured === undefined ? undefined : isFeatured === 'true',
      isArchived: isArchived === undefined ? undefined : isArchived === 'true',
      isPublished: isPublished === undefined ? undefined : isPublished === 'true',
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      orderBy,
      order
    });

    res.json({ data: blogs });
  } catch (error) {
    next(error);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id, {
      includeDeleted: req.query.includeDeleted === 'true'
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ data: blog });
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const payload = buildBlogMultipartPayload(req);
    const blog = await blogService.createBlog(payload);
    res.status(201).json({ data: blog });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const payload = buildBlogMultipartPayload(req);
    const blog = await blogService.updateBlog(req.params.id, payload);
    res.json({ data: blog });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await blogService.deleteBlog(req.params.id, {
      hard: req.query.hard === 'true'
    });
    res.json({ data: blog });
  } catch (error) {
    next(error);
  }
};

export {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};

export default {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
