import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
    },

    title: { type: String, required: true },
    description: { type: String },

    order: { type: Number, required: true },
    unlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Unit", unitSchema);
