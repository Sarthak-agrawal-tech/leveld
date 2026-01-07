import express from "express";
import { getProgressSummary } from "../controllers/progress.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/summary", authMiddleware, getProgressSummary);

export default router;
