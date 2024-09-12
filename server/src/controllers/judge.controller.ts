import { Request, Response } from 'express';
import { submitCode, submitCodeWithTestCase } from '../utils/judgeService.js';

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

export const handleCodeSubmissionWithTestCase = async (req: Request, res: Response): Promise<void> => {
  const { sourceCode, languageId, programInput, expectedOutput } = req.body;

  try {
    const resultData = await submitCodeWithTestCase(sourceCode, languageId, programInput, expectedOutput);
    
    if (resultData.status.id === 3) {
      res.json({ message: 'Accepted the test case', resultData });
    } else {
      res.json({ message: 'Failed the test case', resultData });
    }
  } catch (error) {
    console.error('Failed to execute code:', error);
    res.status(500).json({ message: 'Failed to execute code.' });
  }
};