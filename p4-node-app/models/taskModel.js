import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    done: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
