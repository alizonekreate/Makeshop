import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Journal", journalSchema);
