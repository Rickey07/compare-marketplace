import { expressjwt } from "express-jwt";
import { Secret } from "jsonwebtoken";

const secretString:string = process.env.JWT_SECRET || "Alternate Secret" as string
const secret:Secret = secretString as Secret

const isSignedIn = expressjwt({
    secret:secret,
    algorithms:["HS256"],
    requestProperty:"auth"
})

export {isSignedIn}