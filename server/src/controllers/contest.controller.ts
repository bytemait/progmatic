import { ApiError } from "../utils/ApiError.js";
import ContestModel from "../models/contest.model.js";
import QuestionModel from '../models/question.model.js';
import UserModel from "../models/user.model.js";

export const getContestById = async (req: any, res: any, next: any): Promise<void> => {
  const id = req.params.id; // Extract the ID from request parameters
  let contest;

  try {
      // Fetch the contest by ID using findById method
      contest = await ContestModel.findById(id);
  } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Error fetching contest" });
  }

  if (!contest) {
      return res.status(404).json({ error: "Contest not found" });
  }

  return res.status(200).json({ contest });
}


export const getAllContests=async (req:any,res:any,next:any):Promise<void>=>{
    try {
        const contest=await ContestModel.find();
        if(!contest){
            throw new ApiError(400,"No contests found");
            
        }
        res.status(200).json(contest);
    } catch (error) {
        return console.log(error);
    }
}


export const createNewContest = async (req: any, res: any, next: any): Promise<void> => {
  try {
    const { contestId, contestName, contestRules, questionIds, participantIds, timeLimit } = req.body;

    // Validate question IDs (optional)
     const questions = await QuestionModel.find({ _id: { $in: questionIds } });
    // if (questions.length !== questionIds.length) {
    //   return res.status(400).json({ error: 'One or more questions not found' });
    // }

    // Validate participant IDs
     const participants = await UserModel.find({ _id: { $in: participantIds } });
    // if (participants.length !== participantIds.length) {
    //   return res.status(400).json({ error: 'One or more participants not found' });
    // }

    const newContest = await ContestModel.create({
      contestId,
      contestName,
      contestRules,
      questions,// Array of question objects
      participants,
      //extract github username from user model data
      // gitHubUsername: participants.map(user => user.gitHubUsername),
      //gitHubUsername,
      timeLimit,
    });

    res.status(200).send(newContest);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "There was some error" });
  }
};

export const deleteContest = async (req: any, res: any, next: any): Promise<void> => {
  try {
    const contestId = req.params.id;
    console.log(contestId);
    
    const contest = await ContestModel.findById( contestId );
    if (!contest) {
      throw new ApiError(404, "Contest not found");
    }
    await ContestModel.findOneAndDelete({ _id:contestId });
    res.status(200).json({ message: "Contest deleted successfully" });
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};