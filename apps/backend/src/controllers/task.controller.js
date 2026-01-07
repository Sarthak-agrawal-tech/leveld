import Task from "../models/Task.js";
import Level from "../models/Level.js";
import Unit from "../models/Unit.js";
import User from "../models/User.js";

export const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const task = await Task.findById(taskId);
    if (!task || task.completed) {
      return res.status(400).json({ message: "Invalid task" });
    }

    // 1️⃣ Complete task
    task.completed = true;
    await task.save();

    // 2️⃣ Add XP to user
    const user = await User.findById(userId);
    user.totalXP += task.xp;
    await user.save();

    // 3️⃣ Check level completion
    const levelTasks = await Task.find({ levelId: task.levelId });
    const levelCompleted = levelTasks.every((t) => t.completed);

    if (levelCompleted) {
      const level = await Level.findById(task.levelId);
      level.status = "completed";
      await level.save();

      // 4️⃣ Unlock next level
      const nextLevel = await Level.findOne({
        unitId: level.unitId,
        order: level.order + 1,
      });

      if (nextLevel) {
        nextLevel.status = "active";
        await nextLevel.save();
      } else {
        // 5️⃣ Complete unit if no more levels
        const unit = await Unit.findById(level.unitId);
        unit.completed = true;
        await unit.save();

        // 6️⃣ Unlock next unit
        const nextUnit = await Unit.findOne({
          goalId: unit.goalId,
          order: unit.order + 1,
        });

        if (nextUnit) {
          nextUnit.unlocked = true;
          await nextUnit.save();
        }
      }
    }

    return res.json({
      success: true,
      gainedXp: task.xp,
      totalXp: user.totalXP,
    });
  } catch (error) {
    console.error("Complete task error:", error.message);
    return res.status(500).json({ message: "Failed to complete task" });
  }
};
