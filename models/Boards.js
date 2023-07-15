import mongoose from "mongoose";

const boardsSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    columns: { type: Array }
}, { timestamps: true })

export default mongoose.model("Boards", boardsSchema)