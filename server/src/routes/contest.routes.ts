import { Router } from "express";

import { getAllContests, getContestById, createNewContest, deleteContest } from "../controllers/contest.controller.js";

const contestRouter = Router()

contestRouter.get('/', getAllContests);
contestRouter.get('/:id', getContestById);
contestRouter.post('/createContest', createNewContest);
contestRouter.get('/delete/:id', deleteContest);
// contestRouter.post('/register', registerContest);

export default contestRouter