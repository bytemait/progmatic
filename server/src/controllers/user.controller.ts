import ContestModel from "../models/contest.model.js";
import UserModel from "../models/user.model.js";
import { Request, Response } from 'express';
import mongoose from "mongoose";


export const addParticipant = async (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { user, contestId } = req.body;

  try {
    const contest = await ContestModel.findById(contestId);
    if (!contest) {
      res.status(404).json({ success: false, message: "Contest not found" });
      return;
    }

    // if (contest.participants.includes(user)) {
    //   res.status(400).json({ success: false, message: "Participant already added" });
    //   return;
    // }

    // const participant = await UserModel.findOne({ gitHubUsername: user });

    // if (!participant) {
    //   res.status(404).json({ success: false, message: "User not found" });
    //   return;
    // }

    // contest.participants.push(user);
    // await contest.save();

    // participant.myContests.push(contestId);
    // await participant.save();

    // Ensure participants is always an array
    if (!Array.isArray(contest.participants)) {
      contest.participants = [];
    }
    const participant = await UserModel.findOne({ gitHubUsername: user });

    if (!participant) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    if (contest.participants.some((p) => p.toString() === (participant._id as mongoose.Types.ObjectId).toString())) {
      res.status(400).json({ success: false, message: "Participant already added" });
      return;
    }

    contest.participants.push(participant._id as mongoose.Types.ObjectId);
    await contest.save();

    participant.myContests.push(contestId);
    await participant.save();


    res.status(200).json({ success: true, message: "Participant added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding participant", error });
    console.log(error);
  }
};

export const deleteParticipant = async (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { contestId, user } = req.body;

  try {
    // Validate contestId format
    if (!mongoose.Types.ObjectId.isValid(contestId)) {
      res.status(400).json({ success: false, message: "Invalid contest ID format" });
      return;
    }

    const contest = await ContestModel.findById(contestId);
    const participant = await UserModel.findOne({ gitHubUsername: user });

    if (!contest || !participant) {
      res.status(404).json({ success: false, message: "Contest or user not found" });
      return;
    }

    // Remove the participant from the contest
    contest.participants = contest.participants.filter(
      (p: mongoose.Types.ObjectId) => !p.equals(participant._id as mongoose.Types.ObjectId)
    );
    await contest.save();

    // Remove the contest from the participant's myContests
    participant.myContests = participant.myContests.filter(
      (c: mongoose.Types.ObjectId) => !c.equals(contest._id as mongoose.Types.ObjectId)
    );
    await participant.save();

    res.status(200).json({ success: true, message: "User unregistered successfully" });

  } catch (error) {
    console.error("Error during unregistration:", error);
    res.status(500).json({ success: false, message: "Error during unregistration", error });
  }
};

export const fetchMyContest = async (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { user } = req.params;

  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(user);
    
    let userId;

    if (isValidObjectId) {
      userId = user;
    } else {
      // If not valid ObjectId, find user by gitHubUsername
      const userRecord = await UserModel.findOne({ gitHubUsername: user });
      if (!userRecord) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }
      userId = userRecord._id;
    }

    const contests = await ContestModel.find({ participants: userId });

    if (!contests.length) {
      res.status(404).json({ success: false, message: "No contests found for this user" });
      return;
    }

    res.status(200).json({ success: true, contests });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching contests", error });
  }
};


export const startAttempt = async (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { contestId } = req.params;
  const { gitHubUsername } = req.body;

  try {
    const contest = await ContestModel.findOne({ contestId });
    if (!contest) {
      res.status(404).json({ success: false, message: "Contest not found" });
      return; // Added return to prevent further execution
    }

    const participant = await UserModel.findOne({ gitHubUsername });
    if (!participant) {
      res.status(404).json({ success: false, message: "User not found" });
      return; // Added return to prevent further execution
    }

    // TODO: add logic to see if user started attempt

    res.status(200).json({ success: true, message: "Contest attempt started successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error starting contest attempt", error });
  }
};
