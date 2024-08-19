import express from 'express';
import SubmissionModel from '../models/submission.model.js';


export const createSubmission = async(req:any, res:any, next:any):Promise <void>  => {
  try {
    const { contestId, languageUsed, timeTaken, score, result, status } = req.body;

    const submission = new SubmissionModel({
      contestId,
      languageUsed,
      timeTaken,
      score,
      result,
      status,
    });

    const savedSubmission = await submission.save();

    res.status(201).json(savedSubmission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create submission' });
  }
};

export const getSubmissions = async (req: express.Request, res: express.Response) => {
  try {
    const { contestId } = req.params;
    const submissions = await SubmissionModel.find({ contestId });
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

export const getSubmission = async (req: express.Request, res: express.Response) => {
  try {
    const { contestId, submissionId } = req.params;
    const submission = await SubmissionModel.findOne({ _id: submissionId, contestId });
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch submission' });
  }
};

export const updateSubmission = async (req: express.Request, res: express.Response) => {
  try {
    const { submissionId } = req.params;
    const updateData = req.body;
    const submission = await SubmissionModel.findByIdAndUpdate(submissionId, updateData, { new: true });
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update submission' });
  }
};

export const deleteSubmission = async (req: express.Request, res: express.Response) => {
  try {
    const { submissionId } = req.params;
    await SubmissionModel.findByIdAndDelete(submissionId);
    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
};