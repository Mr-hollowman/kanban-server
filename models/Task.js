import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    boardId: {type:mongoose.Schema.Types.ObjectId, ref:"Boards", required: true},
    title: { type: String, required: true },
    desc: { type: String },
    column: { type: String, required: true },
    subTask: { type: Array }
}, { timestamps: true })

export default mongoose.model("Task", TaskSchema)