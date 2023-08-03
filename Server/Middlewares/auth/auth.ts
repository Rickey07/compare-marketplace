import { expressjwt } from "express-jwt";
import { Secret } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { Response,Request, NextFunction } from "express";
import ResponseHandler from "../../Utils/responseHandler";


const secretString:string = process.env.JWT_SECRET || "Alternate Secret" as string
const secret:Secret = secretString as Secret
const client = new OAuth2Client

const isSignedIn = expressjwt({
    secret:secret,
    algorithms:["HS256"],
    requestProperty:"auth"
})

const verifyGoogleToken = async (req:Request,res:Response,next:NextFunction ) => {
    try {
        const {credential,clientId} = req.body
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: clientId,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload()
        req.body = payload
        next()
    } catch (error) {
        return ResponseHandler(res,false,500,"Some unknown Error Occured!")
    }
}

export {isSignedIn,verifyGoogleToken}