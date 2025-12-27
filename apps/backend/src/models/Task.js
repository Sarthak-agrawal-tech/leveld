import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    levelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },

    title: { type: String, required: true },
    xp: { type: Number, required: true },

    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
