import express from 'express';
const router = express.Router();
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blog.js';

router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.post('/blogs/create', createBlog);
router.put('/blogs/update/:id', updateBlog);
router.delete('/blogs/delete/:id', deleteBlog);

export default router;
