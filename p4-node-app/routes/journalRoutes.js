import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createJournal, getJournals, deleteJournal } from "../controllers/journalController.js";

const router = express.Router();

router.use(protect);
router.post("/", createJournal);
router.get("/", getJournals);
router.delete("/:id", deleteJournal);

export default router;
