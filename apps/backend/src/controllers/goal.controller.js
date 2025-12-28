import Goal from "../models/Goal.js";
import { generateQuest } from "../../../ai/index.js";

export const createGoal = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Goal title is required" });
    }

    // TEMP userId (we’ll replace with auth later)
    const tempUserId = "000000000000000000000001";

    const goal = await Goal.create({
      userId: tempUserId,
      title,
    });

    const quest = await generateQuest(title);


    res.status(201).json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
