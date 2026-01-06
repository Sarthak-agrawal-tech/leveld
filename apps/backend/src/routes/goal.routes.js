import express from "express";
import { createGoal } from "../controllers/goal.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createGoal);
export default router;
