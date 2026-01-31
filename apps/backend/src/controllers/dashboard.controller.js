import Goal from "../models/Goal.js";
import Unit from "../models/Unit.js";
import Level from "../models/Level.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // --------------------
    // USER
    // --------------------
    const user = await User.findById(userId);

    // --------------------
    // GOALS
    // --------------------
    const goals = await Goal.find({ userId });

    // --------------------
    // QUEST CARDS
    // --------------------
    const quests = [];

    for (let goal of goals) {
      const units = await Unit.find({ goalId: goal._id });

      const completedUnits = units.filter((u) => u.unlocked).length;

      const progress =
        units.length === 0
          ? 0
          : Math.round((completedUnits / units.length) * 100);

      quests.push({
        id: goal._id,
        title: goal.title,
        progress,
      });
    }

    // --------------------
    // ACTIVE TASKS
    // --------------------
    const activeTasks = [];

    for (let goal of goals) {
      // Find first unlocked unit
      const unit = await Unit.findOne({
        goalId: goal._id,
        unlocked: true,
      }).sort({ order: 1 });

      if (!unit) continue;

      // Find first incomplete level
      const level = await Level.findOne({
        unitId: unit._id,
        status: "active",
      }).sort({ order: 1 });

      if (!level) continue;

      // Find tasks
      const tasks = await Task.find({
        levelId: level._id,
        completed: false,
      });

      for (let task of tasks) {
        activeTasks.push({
          goalId: goal._id,
          goalTitle: goal.title,
          taskId: task._id,
          title: task.title,
          xp: task.xp,
        });
      }
    }

    // --------------------
    // STREAK
    // --------------------

    const streakCount = user.streak.current || 0;

    const week = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);

      if (!user.streak.lastCompletedAt) {
        week.push(false);
        continue;
      }

      const last = new Date(user.streak.lastCompletedAt);
      last.setHours(0, 0, 0, 0);

      const diff = (day - last) / (1000 * 60 * 60 * 24);

      week.push(diff <= 0 && diff >= -streakCount + 1);
    }

    // --------------------
    // XP
    // --------------------
    const currentXP = user.totalXP || 0;
    const level = user.level || 1;

    const nextXP = level * 1000;

    // --------------------
    // RESPONSE
    // --------------------
    res.json({
      quests,
      activeTasks,
      streak: {
        count: streakCount,
        week,
      },
      xp: {
        current: currentXP,
        next: nextXP,
        level,
      },
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};
