import mongoose from "mongoose";

const levelSchema = new mongoose.Schema(
  {
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },

    title: { type: String, required: true },
    order: { type: Number, required: true },

    status: {
      type: String,
      enum: ["locked", "active", "completed"],
      default: "locked",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Level", levelSchema);
