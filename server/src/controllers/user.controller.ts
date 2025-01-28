import ContestModel from "../models/contest.model.js";
import UserModel from "../models/user.model.js";
import { Request, Response } from 'express';

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

    if (contest.participants.includes(user)) {
      res.status(400).json({ success: false, message: "Participant already added" });
      return;
    }

    const participant = await UserModel.findOne({ gitHubUsername: user });

    if (!participant) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    contest.participants.push(user);
    await contest.save();

    participant.myContests.push(contestId);
    await participant.save();

    res.status(200).json({ success: true, message: "Participant added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding participant", error });
  }
};

export const fetchMyContest = async (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  const { user } = req.params;

  try {
    const contests = await ContestModel.find({ participants: user });
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
