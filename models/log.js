import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    user: {type:mongoose.Types.ObjectId, ref:"Users"},
    type: String,
    action: String,
    time: String
})
export default mongoose.model("logs", logSchema)