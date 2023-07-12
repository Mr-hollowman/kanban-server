import express from 'express';
import dotenv from 'dotenv';
import connect from './utils/connect.js';
import userRouter from './routes/UserRouters.js'

dotenv.config();
const app = express();
app.use(express.json());


// app.use('/', (req, res, next) => {
//     res.send({ message: "welcome to kanban" })
// })

app.use('/api/v1/users', userRouter)

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong"
    return res.status(status).json({
        success: false,
        message: message,
        status
    })
})

app.listen(process.env.PORT, () => {
    connect()
    console.log("app is running")
})