import express from "express";
import { registerUser, signInUser, signInWithGoogle } from "../../Controllers/auth/auth";
import { verifyGoogleToken } from "../../Middlewares/auth/auth";

const authRoutes = express();


authRoutes.post("/register", registerUser);
authRoutes.post("/signIn", signInUser);
authRoutes.post("/signInWithGoogle",verifyGoogleToken,signInWithGoogle)



export default authRoutes;
