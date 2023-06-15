"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignedIn = void 0;
const express_jwt_1 = require("express-jwt");
const secretString = process.env.JWT_SECRET || "Alternate Secret";
const secret = secretString;
const isSignedIn = (0, express_jwt_1.expressjwt)({
    secret: secret,
    algorithms: ["HS256"],
    requestProperty: "auth"
});
exports.isSignedIn = isSignedIn;
