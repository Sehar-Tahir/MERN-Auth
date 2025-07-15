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

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["POST", "GET"]
}));



//Api Endpoints - Routes
app.get('/', (req, res) => {res.send("Hello From Server")})
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.listen(port, () => console.log(`Server stated at PORT: ${port}`));