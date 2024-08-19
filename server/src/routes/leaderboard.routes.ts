import {Router} from "express"
import express from "express"
import {getLeaderboard, updateLeaderboard} from "../controllers/leaderboard.controller.js"
import { getAdapter } from "axios";

const leaderboardRouter = express.Router()

leaderboardRouter.get("/getBoard", getLeaderboard)
leaderboardRouter.post("/updateBoard", updateLeaderboard)
// questionRouter.put("/update/:id", updateQuestion)
// questionRouter.get("/:id", getQuestionById)
// questionRouter.delete("/:id", deleteQuestion)

export default leaderboardRouter;

