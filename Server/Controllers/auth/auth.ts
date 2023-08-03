import express, { Request, Response } from "express";
import { User } from "../../Models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ResponseHandler from "../../Utils/responseHandler";

const registerUser = async (req: Request, res: Response) => {
  const saltRounds = 10;
  try {
    // Check if User Exists
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists !== null)
      return ResponseHandler(res, false, 400, "User Already Exists");

    // If Not Then Encrypt the password
    const encryptedPass = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = encryptedPass;

    // Store Password In DB
    req.body.email = req.body.email.toLowerCase();
    const newUser = await new User(req.body).save();
    if (newUser !== null)
      return ResponseHandler(
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

const signInUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // If user Doesn't Exists
    if (user === null)
      return ResponseHandler(
        res,
        false,
        400,
        "Account Not Found with email Id"
      );
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // If Password matches generate JWT and send back as response
    const secret: any = process.env.JWT_SECRET;
    if (comparePassword) {
      const token = jwt.sign({ _id: user?._id }, secret, {
        algorithm: "HS256",
        expiresIn: "2d",
      });
      const data = {
        token,
        email: user.email,
        name: user.name,
      };
      return ResponseHandler(res, true, 200, "Login Success", data);
    }
    // If Password Doesn't Match
    return ResponseHandler(res, false, 401, "Incorrect Credentials");
  } catch (error: any) {
    return ResponseHandler(res, false, 500, error.message);
  }
};



const signInWithGoogle = async (req:Request,res:Response) => {
  try {
    const {name,email,picture} = req.body
    const user = await User.findOne({ email:email });
    if(user!==null) {
      const secret:any = process.env.JWT_SECRET
      const  token = jwt.sign({ _id: user?._id }, secret, {
        algorithm: "HS256",
        expiresIn: "2d",
      });
      const data = {
        token,
        email: user.email,
        name: user.name,
        image_url:picture
      };
      return ResponseHandler(res, true, 200, "Login Success", data);
    }
    const userData = {
      name,
      email,
      image_url:picture
    }

    const newUser = await new User(userData).save()
    if(newUser!==null) {
      const secret:any = process.env.JWT_SECRET
      const  token = jwt.sign({ _id: newUser?._id }, secret, {
        algorithm: "HS256",
        expiresIn: "2d",
      });
      const data = {
        token,
        email: newUser.email,
        name: newUser.name,
        image_url:picture
      };
      return ResponseHandler(res, true, 200, "Login Success", data);
    }

  } catch (error) {
    console.log(error)
  }
}
 
export { registerUser, signInUser,signInWithGoogle };
