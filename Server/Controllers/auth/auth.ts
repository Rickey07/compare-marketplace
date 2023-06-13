import express, { Request, Response } from "express";
import { User } from "../../Models/user";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import ResponseHandler from "../../Utils/responseHandler";

const registerUser = async (req: Request, res: Response) => {
  const saltRounds = 10;
  try {
    // Check if User Exists
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists !== null) return ResponseHandler(res, false, 400, "User Already Exists");

    // If Not Then Encrypt the password 
    const encryptedPass = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = encryptedPass;

    // Store Password In DB
    const newUser = await new User(req.body).save();
    if (newUser !== null) return ResponseHandler(
        res,
        true,
        200,
        "Account Created Successfully!",
        newUser
      );
  } catch (error: any) {
    return ResponseHandler(res, false, 400, error.message);
  }
};

const signInUser = async (req:Request,res:Response) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(user===null) return ResponseHandler(res,false,400,"Account Not Found with email Id")
        const comparePassword = await bcrypt.compare(req.body.password,user.password)

        // If Password matches generate JWT and send back as response
        if(comparePassword) {
            const token = jwt.sign({foo:"bar"},"Hello@23#",{algorithm:"HS256"})
            const data = {
                token,
                user
            }
            return ResponseHandler(res,true,200,"Login Success",data)
        }
    } catch (error:any) {
        return ResponseHandler(res,false,500,error.message)
    }
}

export { registerUser , signInUser};
