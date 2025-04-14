import mongoose, { Document, Schema } from "mongoose";

export interface ContestDocument extends Document {
  contestId: string;
  contestName : string;
  contestRules: string;
  questions: string[];
  totalQuestions: number;
  gitHubUsername: string[];
  startTime: Date;
  timeLimit: number;
  participants: mongoose.Types.ObjectId[];
}

const ContestSchema: Schema<ContestDocument> = new Schema({
  contestId: {
    type: String,
    required: true,
    unique: true,
  },
  contestName: {
    type: String,
    required: true,
    unique: true,
  },
  contestRules: {
    type: String,
    required: true,
  },
  totalQuestions:{
    type: Number,
    required: true,
  },
  questions: {
    type: [String],
    required: true,
  },
  startTime:{
    type: Date,
    required: true,
  },
  timeLimit: {
    type: Number,
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
});

const ContestModel = mongoose.model<ContestDocument>("Contest", ContestSchema);
export default ContestModel;
