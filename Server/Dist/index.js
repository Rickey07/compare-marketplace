"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = __importDefault(require("./Utils/dbConnect"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
(0, dbConnect_1.default)();
app.listen(port, () => {
    console.log(port + "Process is running...");
});
