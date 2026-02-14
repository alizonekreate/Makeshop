import express from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./db.js";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import motivationRoutes from "./routes/motivationRoutes.js";

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/motivation", motivationRoutes);

app.get("/", (req, res) => res.send("Anchora API is running!"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Server error" });
});

export default app;
