import express from "express";
import { createGoal } from "../controllers/goal.controller.js";

const router = express.Router();

router.post("/", createGoal);

export default router;
