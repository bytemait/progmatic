import { Document, Schema, model } from 'mongoose';
import { UserDocument } from "./user.model.js";
import {ContestDocument} from "./contest.model.js";
import {QuestionDocument} from "./question.model.js"

interface Question {
  id: QuestionDocument["_id"];
  timeTaken: number; // in minutes
  score: number;
  isCorrect: boolean;
}

interface Submission extends Document {
  contestId: ContestDocument["_id"];
  userId: UserDocument["_id"];
  questions: Question[];
  contestScore: number;
  contestTime : number; // in minutes
}

const questionSchema = new Schema<Question>({
  id: { type: Schema.Types.ObjectId,ref: 'Question', required: true },
  timeTaken: { type: Number, required: true },
  score: { type: Number, default: 0},
  isCorrect: { type: Boolean, default: false },
});

const submissionSchema = new Schema<Submission>({
  contestId: { type: Schema.Types.ObjectId,ref: 'Contest', required: true },
  userId: { type: Schema.Types.ObjectId,ref:"User", required: true },
  questions: { type: [questionSchema], required: true },
  contestScore: { type: Number, default: 0 },
  contestTime : {type: Number, default:0},
});

// Pre-save middleware to set the score based on isCorrect
questionSchema.pre('save', function (next) {
  if (this.isCorrect) {
    this.score = 20;
  } else {
    this.score = 0;
  }
  next();
});

// hook to calculate contest score
submissionSchema.pre('save', function (next) {
  this.contestScore = this.questions.reduce((acc, question) => acc + question.score, 0);
  next();
});

// hook to calculate contest time
submissionSchema.pre('save', function (next) {
  this.contestTime = this.questions.reduce((acc, question) => acc + question.timeTaken, 0);
  next();
});

export const SubmissionModel = model<Submission>('Submission', submissionSchema);
