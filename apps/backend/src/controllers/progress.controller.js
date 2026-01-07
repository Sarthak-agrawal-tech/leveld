import Goal from "../models/Goal.js";
import Unit from "../models/Unit.js";
import Level from "../models/Level.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getProgressSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ User XP
    const user = await User.findById(userId).lean();

    // 2️⃣ Goals
    const goals = await Goal.find({ userId }).lean();

    let completedGoals = 0;
    const goalProgress = [];

    for (const goal of goals) {
      const units = await Unit.find({ goalId: goal._id }).lean();

      let totalTasks = 0;
      let completedTasks = 0;

      for (const unit of units) {
        const levels = await Level.find({ unitId: unit._id }).lean();

        for (const level of levels) {
          const tasks = await Task.find({ levelId: level._id }).lean();

          totalTasks += tasks.length;
          completedTasks += tasks.filter((t) => t.completed).length;
        }
      }

      const progress =
        totalTasks === 0
          ? 0
          : Math.round((completedTasks / totalTasks) * 100);

      if (progress === 100) completedGoals++;

      goalProgress.push({
        goalId: goal._id,
        title: goal.title,
        progress,
      });
    }

    return res.json({
      totalXp: user.xp,
      totalGoals: goals.length,
      completedGoals,
      activeGoals: goals.length - completedGoals,
      goals: goalProgress,
    });
  } catch (error) {
    console.error("Progress summary error:", error.message);
    return res.status(500).json({ message: "Failed to fetch progress summary" });
  }
};
