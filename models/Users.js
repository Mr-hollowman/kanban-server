import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: { tpye: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    name: { type: String, require: true },
    organisation: { type: String },
    country: { type: String },
    phoneNo: { type: Number, require: true }
})

export default mongoose.model("Users", UserSchema)