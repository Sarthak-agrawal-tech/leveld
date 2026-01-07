import express from "express";
import { completeTask } from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.patch("/:taskId/complete", authMiddleware, completeTask);

export default router;
