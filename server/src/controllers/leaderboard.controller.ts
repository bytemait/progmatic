import { Request, Response } from 'express';
import ContestModel from "../models/contest.model.js";
import QuestionModel from '../models/question.model.js';
import UserModel from "../models/user.model.js";
import LeaderboardModel from '../models/leaderboard.model.js';


export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { userID, contestId } = req.params;

    const leaderboardData = await LeaderboardModel.find({ contestid: contestId })
      .sort({ score: -1 })
      .populate('userId'); // Populate user information

    res.status(200).json(leaderboardData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};


export const updateLeaderboard = async (req: Request, res: Response) => {
  try {
    const { userId, contestId, correctAnswers, timeTaken } = req.body;

    // Calculate score based on correct answers, time taken, and question difficulty
    const questions = await QuestionModel.find();
    const totalQuestions = questions.length;
    const accuracy = (correctAnswers / totalQuestions) * 100;
    const difficultyFactor = calculateDifficultyFactor(questions); // Implement this function
    const timeBonus = calculateTimeBonus(timeTaken); // Implement this function
    const score = accuracy * difficultyFactor + timeBonus;

    // Find or create leaderboard entry
    let leaderboardEntry = await LeaderboardModel.findOne({ userId, contestId });
    if (!leaderboardEntry) {
      leaderboardEntry = new LeaderboardModel({
        userId,
        contestId,
        score,
        correctAnswers,
        timeTaken,
      });
    } else {
      leaderboardEntry.score = score;
      leaderboardEntry.correctAnswers = correctAnswers;
      leaderboardEntry.timeTaken = timeTaken;
    }

    await leaderboardEntry.save();

    res.status(200).json({ message: 'Leaderboard updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update leaderboard' });
  }
};

// Helper functions for calculating score components
function calculateDifficultyFactor(questions: any[]) {
    // Assuming each question has a difficulty property (1-5)
    const totalDifficulty = questions.reduce((acc, question) => acc + question.difficulty, 0);
    const averageDifficulty = totalDifficulty / questions.length;
    const difficultyFactor = averageDifficulty * 10; // Adjust multiplier as needed
    return difficultyFactor;
  }
  
  function calculateTimeBonus(timeTaken: number) {
    const maxTime = 60 * 60; // Maximum allowed time in seconds
    const timeBonus = Math.max(0, maxTime - timeTaken) / maxTime * 100; // Adjust multiplier as needed
    return timeBonus;
}
