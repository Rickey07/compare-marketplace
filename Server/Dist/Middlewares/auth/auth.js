"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleToken = exports.isSignedIn = void 0;
const express_jwt_1 = require("express-jwt");
const google_auth_library_1 = require("google-auth-library");
const responseHandler_1 = __importDefault(require("../../Utils/responseHandler"));
const secretString = process.env.JWT_SECRET || "Alternate Secret";
const secret = secretString;
const client = new google_auth_library_1.OAuth2Client;
const isSignedIn = (0, express_jwt_1.expressjwt)({
    secret: secret,
    algorithms: ["HS256"],
    requestProperty: "auth"
});
exports.isSignedIn = isSignedIn;
const verifyGoogleToken = async (req, res, next) => {
    try {
        const { credential, clientId } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: clientId, // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        req.body = payload;
        next();
    }
    catch (error) {
        return (0, responseHandler_1.default)(res, false, 500, "Some unknown Error Occured!");
    }
};
exports.verifyGoogleToken = verifyGoogleToken;
