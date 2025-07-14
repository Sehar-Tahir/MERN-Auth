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

app.use(cors({
  origin: "https://mern-auth-frontend-ecru.vercel.app",
  credentials: true,
  methods: ["POST", "GET"]
}));

app.use(express.json());
app.use(cookieParser());


//Api Endpoints - Routes
app.get('/', (req, res) => {res.send("Hello From Server")})
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.listen(port, () => console.log(`Server stated at PORT: ${port}`));