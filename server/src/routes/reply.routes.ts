import express from 'express';
import { createReply, getRepliesByPostId, getReplyById, updateReplyById, deleteReplyById } from '../controllers/reply.controller.js';

const router = express.Router({ mergeParams: true });

router.post('/replies', createReply);
router.get('/getreplies', getRepliesByPostId);
router.get('/replies/:id', getReplyById);
router.put('/replies/:id', updateReplyById);
router.delete('/replies/:id', deleteReplyById);


export default router;
