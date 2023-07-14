import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String },
    column: { type: String, required: true },
    subTask: { type: Array }
}, { timestamps: true })

export default mongoose.model("Task", TaskSchema)