import express from 'express';
import { createPost, getAllPosts, getPostById, updatePostById, deletePostById } from '../controllers/post.controller.js';
import replyRouter from "./reply.routes.js";
const postRouter = express.Router();

postRouter.post('/posts', createPost);
postRouter.get('/posts', getAllPosts);
postRouter.get('/posts/:id', getPostById);
postRouter.put('/posts/:id', updatePostById);
postRouter.delete('/posts/:id', deletePostById);

postRouter.use('/:postId/reply', replyRouter);

export default postRouter;
