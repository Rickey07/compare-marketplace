"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignedIn = void 0;
const express_jwt_1 = require("express-jwt");
const isSignedIn = (0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth"
});
exports.isSignedIn = isSignedIn;
