import express from "express";
import {
  addParticipant,
  deleteParticipant,
  fetchMyContest,
  startAttempt,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", addParticipant);
userRouter.post("/unregister", deleteParticipant); 
userRouter.get("/dashboard/:user", fetchMyContest);
userRouter.post("/attempt/:contestId", startAttempt); //TODO

export default userRouter;