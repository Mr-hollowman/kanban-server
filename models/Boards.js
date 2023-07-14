import mongoose from "mongoose";

const boardsSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    columns: { type: Array },
    tasks: { type: Array }
})

export default mongoose.model("Boards", boardsSchema)