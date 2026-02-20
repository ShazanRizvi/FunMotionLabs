import express from 'express';
const router = express.Router();
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blog.js';
import { upload } from '../lib/uploadMiddleware.js';

router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.post(
  '/blogs/create',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  createBlog
);
router.put(
  '/blogs/update/:id',
  upload.fields([{ name: 'image', maxCount: 1 }]),
  updateBlog
);
router.delete('/blogs/delete/:id', deleteBlog);

export default router;
