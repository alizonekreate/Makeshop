import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createHabit, getHabits, deleteHabit } from "../controllers/habitController.js";

const router = express.Router();

router.use(protect);
router.post("/", createHabit);
router.get("/", getHabits);
router.delete("/:id", deleteHabit);

export default router;
