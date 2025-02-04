import {Router} from "express"
import express from "express"
import { createQuestion, deleteQuestion, getAllQuestions, getQuestionById, updateQuestion } from "../controllers/question.controller.js";
import { getAdapter } from "axios";
import {authenticateUser, requireAdmin } from "../middlewares/checkRole.js";

const questionRouter = express.Router()

questionRouter.get("/", authenticateUser, getAllQuestions);
questionRouter.post("/add", authenticateUser, requireAdmin, createQuestion);
questionRouter.put("/update/:id",authenticateUser, requireAdmin, updateQuestion);
questionRouter.get("/:id",authenticateUser, getQuestionById);
questionRouter.delete("/:id",authenticateUser, requireAdmin, deleteQuestion);

export default questionRouter;

