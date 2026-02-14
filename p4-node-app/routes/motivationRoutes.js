import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMotivationByJournal, createMotivation } from "../controllers/motivationController.js";

const router = express.Router();

router.use(protect);

router.get("/:journalId", getMotivationByJournal);

router.post("/", createMotivation);

export default router;
