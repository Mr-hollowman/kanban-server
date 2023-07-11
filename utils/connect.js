import mongoose from "mongoose";

const connect = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("db connected")
    }).catch((err) => {
        console.log("error", err.message)
    })
}

export default connect