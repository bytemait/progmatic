import express from 'express';
import { handleCodeSubmission, handleCodeSubmissionWithTestCase } from '../controllers/judge.controller.js';

const router = express.Router();

router.post('/run-code', handleCodeSubmission);
router.post('/submit-code', handleCodeSubmissionWithTestCase);

export default router;