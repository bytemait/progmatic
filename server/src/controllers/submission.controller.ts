import { SubmissionModel } from '../models/submission.model.js';
import { Request, Response } from 'express';

// Submit a new submission
export const submitSubmission = async (req: Request, res: Response) => {
  try {
    const submission = new SubmissionModel(req.body);
    const savedSubmission = await submission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};


// Get all submissions
export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await SubmissionModel.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Get submission by user ID or submission ID
export const getSubmissionByUserIdOrSubmissionId = async (req: Request, res: Response) => {
  const { userId, submissionId } = req.params;
  
  try {
    let submission;
    if (submissionId) {
      submission = await SubmissionModel.findById(submissionId);
    } else if (userId) {
      submission = await SubmissionModel.find({ userId });
    }

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
