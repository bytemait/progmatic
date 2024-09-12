import { Request, Response } from 'express';
import { submitCode } from '../utils/judgeService.js';

export const handleCodeSubmission = async (req: Request, res: Response): Promise<void> => {
  const { sourceCode, languageId, programInput } = req.body;

  try {
    const resultData = await submitCode(sourceCode, languageId, programInput);
    res.json(resultData);
  } catch (error) {
    console.error('Failed to execute code:', error);
    res.status(500).json({ message: 'Failed to execute code.' });
  }
};