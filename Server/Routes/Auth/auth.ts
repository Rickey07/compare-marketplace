import express, { Express } from "express";
import { registerUser, signInUser } from "../../Controllers/auth/auth"; 

const authRoutes = express();

authRoutes.post('/register',registerUser)
authRoutes.post('/signIn',signInUser)




export default authRoutes