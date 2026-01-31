import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    totalXP: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: {
  current: {
    type: Number,
    default: 0,
  },
  lastCompletedAt: {
    type: Date,
    default: null,
  },
},

  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
