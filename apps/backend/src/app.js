import express from "express";
import cors from "cors";
import goalRoutes from "./routes/goal.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";


const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("LEVELD backend is running");
});

app.use("/goals", goalRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);



export default app;


