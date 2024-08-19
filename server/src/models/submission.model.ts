import mongoose, { Document, Schema } from 'mongoose';
import { ContestDocument } from './contest.model.js';

interface SubmissionDocument extends Document {
  contestId: ContestDocument['_id'];
  languageUsed: string;
  timeTaken: number; // Time taken in milliseconds
  score: number;
  status: 'pending' | 'accepted' | 'rejected';
}

const SubmissionSchema: Schema<SubmissionDocument> = new Schema({
  contestId: {
    type: Schema.Types.ObjectId,
    ref: 'Contest',
    required: true
  },
  languageUsed: {
    type: String,
    required: true
  },
  timeTaken: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    required: true
  }
});

const SubmissionModel = mongoose.model<SubmissionDocument>('Submission', SubmissionSchema);
export default SubmissionModel;
