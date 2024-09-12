import express from 'express';
import { handleCodeSubmission } from '../controllers/judge.controller.js';

const router = express.Router();

router.post('/submit-code', handleCodeSubmission);

export default router;