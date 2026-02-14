import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Habit", habitSchema);
