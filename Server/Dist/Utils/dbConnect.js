"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => {
    const dataBaseURL = process.env.DATABASE_URL ?? "null";
    mongoose_1.default.connect(dataBaseURL)
        .then((data) => {
        console.log(`MongoDB Connected with server: ${data.connection.host}`);
    })
        .catch((error) => {
        console.log(error, "error is coming");
    });
};
