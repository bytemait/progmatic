import mongoose, { Document, Schema } from 'mongoose';

export interface postDocument extends Document {
  title: string;
  description: string;
  username: string;
  date: Date;
  category: string;
  replies: mongoose.Types.ObjectId[];
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  username: { type: String, ref:'User',required: true },
  date: { type: Date, default:Date.now,required: true }, 
  category: { type: String, required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
});

const Post = mongoose.model<postDocument>('Post', PostSchema);

export default Post;
