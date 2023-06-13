"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler_1 = __importDefault(require("../../Utils/responseHandler"));
const registerUser = async (req, res) => {
    try {
        return (0, responseHandler_1.default)(res, true, 200, "Good working");
    }
    catch (error) {
        return (0, responseHandler_1.default)(res, false, 400, error.message);
    }
};
