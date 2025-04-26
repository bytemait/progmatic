import { Router } from "express";
import { getAllContests, getContestById, createNewContest, deleteContest } from "../controllers/contest.controller.js";
import {  authenticateUser, requireAdmin } from "../middlewares/checkRole.js";

const contestRouter = Router()

contestRouter.get('/',getAllContests);
contestRouter.get('/:id',getContestById);
contestRouter.post('/createContest',createNewContest);
contestRouter.delete('/delete/:id',deleteContest);

export default contestRouter