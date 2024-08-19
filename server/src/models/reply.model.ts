import mongoose, { Document, Schema } from 'mongoose';

export interface replyDocument extends Document {
  postId: mongoose.Types.ObjectId;
  username: string,
  content: string;
}

const ReplySchema: Schema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  username: { type: String,required: true },
  content: { type: String, required: true },
});

const Reply = mongoose.model<replyDocument>('Reply', ReplySchema);

export default Reply;
