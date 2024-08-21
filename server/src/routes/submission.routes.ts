import express from 'express';
import { submitSubmission, getAllSubmissions, getSubmissionByUserIdOrSubmissionId } from '../controllers/submission.controller.js';

const submissionRouter = express.Router();

submissionRouter.post('/submissions', submitSubmission);
submissionRouter.get('/submissions', getAllSubmissions);
submissionRouter.get('/submissions/:submissionId', getSubmissionByUserIdOrSubmissionId);
submissionRouter.get('/submissions/user/:userId', getSubmissionByUserIdOrSubmissionId);

export default submissionRouter;
