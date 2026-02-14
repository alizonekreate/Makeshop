import mongoose from "mongoose";

const motivationSchema = new mongoose.Schema({
    journalId: { type: mongoose.Schema.Types.ObjectId, ref: "Journal", required: true },
    text: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Motivation", motivationSchema);
