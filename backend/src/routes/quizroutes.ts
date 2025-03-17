import express from "express";
import * as qc from "../controllers/quiz.controller";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", qc.getLeaderboard);
router.post("/", auth, qc.createLeaderboard);
router.patch("/update/:id", auth, qc.updateLeaderboard);
router.delete("/delete/:id", auth, qc.deleteLeaderboard);

export default router;
