import express from "express";
import { createGoal, getQuestTree } from "../controllers/goal.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createGoal);
router.get("/:goalId/quest-tree", authMiddleware, getQuestTree);
export default router;
