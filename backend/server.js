import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js';


const app = express();
const port = process.env.PORT || 4000
connectDB();

// const allowedOrigins = ['http://localhost:5173']
// const allowedOrigins = ['https://mern-auth-frontend-ecru.vercel.app/']


app.use(cors({credentials: true }));
// app.use(cors({ origin: allowedOrigins, credentials: true }));
// app.use(cors({
//   origin: "https://mern-auth-frontend-ecru.vercel.app",
//   credentials: true,
// }));
// app.options("*", cors({
//   origin: "https://mern-auth-frontend-ecru.vercel.app",
//   credentials: true,
// }));
app.use(express.json());
app.use(cookieParser());



//Api Endpoints - Routes
// app.get('/', (req, res) => {res.send("Hello From Server")})
app.get('/', (req, res) => {
  res.redirect(process.env.FRONTEND_URL);
})
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.listen(port, () => console.log(`Server stated at PORT: ${port}`));