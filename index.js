import express from 'express';
import dotenv from 'dotenv';
import connect from './utils/connect.js';
import userRouter from './routes/UserRouters.js'
import boardRouter from './routes/BoardRoutes.js'
import cookieParser from 'cookie-parser';
import { logEvent } from './utils/logEvents.js';
import { verifyToken } from './utils/verifyToken.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent with the request
    optionsSuccessStatus: 204, // Set the preflight request response status code to 204
  };
  
  app.use(cors(corsOptions));

// const allowedOrigins = ['http://localhost:3000'];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     // credentials: true,
//   })
//   );
  
// app.get('/', (req, res, next) => {
//   res.cookie("keyOf",`${new Date().getTime()}`)
//     res.send({ message: "cookie set" })
// })

// app.get('/see-Cookie', (req, res, next) => {
//   res.send({cookie:req.cookies.keyOf})
// })

app.use('/api/v1/users', userRouter)
app.use('/api/v1/boards', boardRouter)
app.use('/api/v1/logEvent', verifyToken, logEvent)

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