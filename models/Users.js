import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    // userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // name: { type: String, required: true },
    organisation: { type: String },
    country: { type: String },
    // phoneNo: { type: Number, required: true }
}, { timestamps: true })

export default mongoose.model("Users", UserSchema)