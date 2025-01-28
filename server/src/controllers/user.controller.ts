import ContestModel from "../models/contest.model.js";
import UserModel from "../models/user.model.js";

export const addParticipant = async (
  req: any,
  res: any,
  next: any
): Promise<void> => {
  const { user, contestId } = req.body;

  try {
    const contest = await ContestModel.findOne({ contestId });
    if (!contest) {
      return res.status(404).json({ success: false, message: "Contest not found" });
    }

    if (contest.participants.includes(user)) {
      return res.status(400).json({ success: false, message: "Participant already added" });
    }

    const participant = await UserModel.findOne({ gitHubUsername: user });

    if (!participant) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    contest.participants.push(user);
    user.myContests.push(contestId);

    await user.save();

    await contest.save();

    res.status(200).json({ success: true, message: "Participant added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding participant", error });
  }
};

export const fetchContest = async (
  req: any,
  res: any,
  next: any
): Promise<void> => {
  const { gitHubUsername } = req.params;

  try {
    const contests = await ContestModel.find({ participants: gitHubUsername });
    res.status(200).json(contests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contests", error });
  }
};

export const startAttempt = async (
  req: any,
  res: any,
  next: any
): Promise<void> => {
  const { contestId } = req.params;
  const { gitHubUsername } = req.body;

  try {
    const contest = await ContestModel.findOne({ contestId });
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    // TODO: add logic to see if user started attempt (palle nahi padh raha ye)

    res.status(200).json({ message: "Contest attempt started successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error starting contest attempt", error });
  }
};
