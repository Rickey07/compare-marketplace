"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../Controllers/auth/auth");
const authRoutes = (0, express_1.default)();
authRoutes.post("/register", auth_1.registerUser);
authRoutes.post("/signIn", auth_1.signInUser);
exports.default = authRoutes;
