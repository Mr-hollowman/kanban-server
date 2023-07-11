import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());


app.use('/',(req, res, next)=>{
    res.send({message:"welcome to kanban"})
})

app.listen(process.env.PORT,()=>{
    console.log("app is running")
})