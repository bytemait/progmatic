import { Request, Response } from 'express';
import Post, { postDocument } from '../models/post.model.js';


export const createPost = async (req: Request, res: Response) => {
  try {

    const post: postDocument = new Post(req.body);
    await post.save();
    res.status(201).json(post);

  } catch (error) {

    console.log(error);
    res.status(400).json({msg:"Sever error"});

  }
};


export const getAllPosts = async (req: Request, res: Response) => {
  try {

    const posts = await Post.find().populate('replies');
    res.status(200).json(posts);

  } catch (error) {

    console.log(error);
    res.status(400).json({msg:"Sever error"});
  }
};


export const getPostById = async (req: Request, res: Response) => {
  try {

    const post = await Post.findById(req.params.id).populate('replies');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);

  } catch (error) {

    console.log(error);
    res.status(400).json({msg:"Sever error"});
  }
};


export const updatePostById = async (req: Request, res: Response) => {
  try {

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);

  } catch (error) {

    console.log(error);
    res.status(400).json({msg:"Sever error"});
  }
};


export const deletePostById = async (req: Request, res: Response) => {
  try {

    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(204).json({msg:"Deleted"});

  } catch (error) {

    console.log(error);
    res.status(400).json({msg:"Sever error"});
  }
};
