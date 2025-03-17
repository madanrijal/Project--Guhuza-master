import express from "express";
import * as qc from "../controllers/question.controller";

const router = express.Router();

router.get("/", qc.getQuizQuestions);

export default router;
