import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectToDatabase from './Utils/dbConnect';
import bodyParser from 'body-parser'
import authRoutes from './Routes/Auth/auth'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000


// App Common Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));


// App Routes
app.use('/api',authRoutes)

// Connect to database
connectToDatabase()

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port,  () => {
  console.log(port + "Process is running...")
})
