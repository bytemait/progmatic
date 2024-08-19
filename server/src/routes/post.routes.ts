import express from 'express';
import { createPost, getAllPosts, getPostById, updatePostById, deletePostById } from '../controllers/post.controller.js';
import replyRouter from "./reply.routes.js";
const router = express.Router();

router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.put('/posts/:id', updatePostById);
router.delete('/posts/:id', deletePostById);

router.use('/:postId/reply', replyRouter);

export default router;
