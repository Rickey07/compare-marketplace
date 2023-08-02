import express from "express";
import { registerUser, signInUser, signInWithGoogle } from "../../Controllers/auth/auth";

const authRoutes = express();


authRoutes.post("/register", registerUser);
authRoutes.post("/signIn", signInUser);
authRoutes.post("/signInWithGoogle",signInWithGoogle)



export default authRoutes;
