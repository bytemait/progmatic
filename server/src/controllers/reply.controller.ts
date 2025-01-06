import { Request, Response } from 'express';
import Reply, { replyDocument } from '../models/reply.model.js';
import Post from '../models/post.model.js';


export const createReply = async (req: Request, res: Response) => {
  try {

    const reply: replyDocument = new Reply(req.body);
    await reply.save();
    
    await Post.findByIdAndUpdate(reply.postId, { $push: { replies: reply._id } });
    
    res.status(201).json(reply);
  } catch (error) {

    console.log(error);
    res.status(400).json({msg:"Sever error"});

  }
};

export const getRepliesByPostId = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const replies = await Reply.find({ postId: req.params.postId });
    res.status(200).json(replies);

  } catch (error) {

    console.log(error);
    res.status(400).json({msg:"Sever error"});
  }
};


export const getReplyById = async (req: Request, res: Response) => {
  try {

    const reply = await Reply.findById(req.params.id);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }
    res.status(200).json(reply);
  } catch (error) {

    console.log(error);
    res.status(400).json({msg:"Sever error"});
  }
};


export const updateReplyById = async (req: Request, res: Response) => {
  try {

    const reply = await Reply.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }
    res.status(200).json(reply);
  } catch (error) {

    console.log(error);
    res.status(400).json({msg:"Sever error"});
  }
};

 
export const deleteReplyById = async (req: Request, res: Response) => {
  try {

    const reply = await Reply.findByIdAndDelete(req.params.id);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }
    
    await Post.findByIdAndUpdate(reply.postId, { $pull: { replies: reply._id } });
    
    res.status(204).send();
  } catch (error) {

    console.log(error);
    res.status(400).json({msg:"Sever error"});
  }
};
