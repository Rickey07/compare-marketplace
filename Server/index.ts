import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './Utils/dbConnect';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
// Connect to database
connectToDatabase()

app.listen(port,  () => {
  console.log(port + "Process is running...")
})
