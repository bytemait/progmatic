import mongoose, { Document, Schema,CallbackError } from 'mongoose';
import { UserDocument } from './user.model.js';

export interface postDocument extends Document {
  title: string;
  description: string;
  githubUsername: string;
  date: Date;
  category: string;
  replies: mongoose.Types.ObjectId[];
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubUsername: { type: String }, // Store GitHub username
  date: { type: Date, default:Date.now,required: true }, 
  category: { type: String, required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
});

// PostSchema.pre('save', async function (next: (err?: CallbackError) => void) {
//   if (!this.isModified('githubUsername')) return next();

//   try {
//     const user = await mongoose.model('User').findById(this.gitHubUsername);
//     if (user) {
//       this.gitHubUsername = user.gitHubUsername; // Assuming the field is `githubUsername`
//     } else {
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     return next(error as CallbackError);
//   }

//   next();
// });

const Post = mongoose.model<postDocument>('Post', PostSchema);

export default Post;
