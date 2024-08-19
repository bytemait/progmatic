// controller.js
import express from 'express';
import { createSubmission, getSubmissions, getSubmission, updateSubmission, deleteSubmission } from "../controllers/submission.controller.js";

const submissionRouter = express.Router();

submissionRouter.post('/submissions', createSubmission);
submissionRouter.get('/submissions/:contestId', getSubmissions);
submissionRouter.get('/submissions/:contestId/:submissionId', getSubmission);
submissionRouter.put('/submissions/:submissionId', updateSubmission);
submissionRouter.delete('/submissions/:submissionId', deleteSubmission);

export default submissionRouter;