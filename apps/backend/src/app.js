import express from "express";
import cors from "cors";
import goalRoutes from "./routes/goal.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LEVELD backend is running");
});

app.use("/goals", goalRoutes);
export default app;
