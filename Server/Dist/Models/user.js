"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    objectIdField: { type: String },
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
