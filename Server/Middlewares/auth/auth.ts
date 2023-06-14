import { expressjwt } from "express-jwt";

const isSignedIn = expressjwt({
    secret:process.env.JWT_SECRET as string,
    algorithms:["HS256"],
    requestProperty:"auth"
})

export {isSignedIn}