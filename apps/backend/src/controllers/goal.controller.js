import Goal from "../models/Goal.js";
import { generateQuest } from "../../../ai/index.js";
import Unit from "../models/Unit.js";
import Level from "../models/Level.js";
import Task from "../models/Task.js";


export const createGoal = async (req, res) => {
  
  
  
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: "Goal title is required" });
    }

    let quest = null;
let attempts = 0;

while (attempts < 2) {
  const generatedQuest = await generateQuest(title);

  const isValid =
    generatedQuest?.units?.length &&
    generatedQuest.units.every(
      (u) =>
        u.levels?.length &&
        u.levels.every((l) => l.tasks && l.tasks.length > 0)
    );

  if (isValid) {
    quest = generatedQuest;
    break;
  }

  attempts++;
}

if (!quest) {
  throw new Error("Failed to generate valid quest");
}


    if (
    !quest.units?.length ||
    quest.units.some(
      (u) =>
        !u.levels?.length ||
        u.levels.some((l) => !l.tasks || l.tasks.length === 0)
    )
  ) {
    throw new Error("AI generated incomplete quest structure");
  }

    // 1️⃣ Create Goal
    const goal = await Goal.create({
      title,
      userId: req.user.id,
    });

    // 2️⃣ Generate quest via Ollama

    // 3️⃣ Persist quest tree
    let unitOrder = 1;

    for (const unit of quest.units) {
      const createdUnit = await Unit.create({
        goalId: goal._id,
        title: unit.title,
        description: unit.description,
        order: unitOrder,
        unlocked: unitOrder === 1, // first unit unlocked
      });

      let levelOrder = 1;

      for (const level of unit.levels) {
        const createdLevel = await Level.create({
          unitId: createdUnit._id,
          title: level.title,
          order: levelOrder,
          status: levelOrder === 1 ? "active" : "locked",
        });

        for (const task of level.tasks) {
          await Task.create({
            levelId: createdLevel._id,
            title: task.title,
            xp: task.xp,
            completed: false,
          });
        }

        levelOrder++;
      }

      unitOrder++;
    }

    // 4️⃣ Respond
    return res.status(201).json({
      success: true,
      goalId: goal._id,
      message: "Goal and quest created successfully",
    });

  } catch (error) {
    console.error("Create goal error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create goal",
    });
  }
};

