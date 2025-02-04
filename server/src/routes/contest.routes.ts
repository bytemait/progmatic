import { Router } from "express";
import { getAllContests, getContestById, createNewContest, deleteContest } from "../controllers/contest.controller.js";
import {  authenticateUser, requireAdmin } from "../middlewares/checkRole.js";

const contestRouter = Router()

contestRouter.get('/',authenticateUser,getAllContests);
contestRouter.get('/:id',authenticateUser,getContestById);
contestRouter.post('/createContest',authenticateUser, requireAdmin, createNewContest);
contestRouter.delete('/delete/:id',authenticateUser, requireAdmin, deleteContest);

export default contestRouter