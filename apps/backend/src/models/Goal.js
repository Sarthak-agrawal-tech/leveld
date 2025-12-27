import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

    overallProgress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
