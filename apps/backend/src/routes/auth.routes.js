import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: {
      userId: req.user.id,
    },
  });
});


router.post("/register", register);
router.post("/login", login);

export default router;
