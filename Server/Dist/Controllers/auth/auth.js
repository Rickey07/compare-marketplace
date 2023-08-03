"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithGoogle = exports.signInUser = exports.registerUser = void 0;
const user_1 = require("../../Models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseHandler_1 = __importDefault(require("../../Utils/responseHandler"));
const registerUser = async (req, res) => {
    const saltRounds = 10;
    try {
        // Check if User Exists
        const userExists = await user_1.User.findOne({ email: req.body.email });
        if (userExists !== null)
            return (0, responseHandler_1.default)(res, false, 400, "User Already Exists");
        // If Not Then Encrypt the password
        const encryptedPass = await bcrypt_1.default.hash(req.body.password, saltRounds);
        req.body.password = encryptedPass;
        // Store Password In DB
        req.body.email = req.body.email.toLowerCase();
        const newUser = await new user_1.User(req.body).save();
        if (newUser !== null)
            return (0, responseHandler_1.default)(res, true, 200, "Account Created Successfully!", newUser);
    }
    catch (error) {
        return (0, responseHandler_1.default)(res, false, 400, error.message);
    }
};
exports.registerUser = registerUser;
const signInUser = async (req, res) => {
    try {
        const user = await user_1.User.findOne({ email: req.body.email });
        // If user Doesn't Exists
        if (user === null)
            return (0, responseHandler_1.default)(res, false, 400, "Account Not Found with email Id");
        const comparePassword = await bcrypt_1.default.compare(req.body.password, user.password);
        // If Password matches generate JWT and send back as response
        const secret = process.env.JWT_SECRET;
        if (comparePassword) {
            const token = jsonwebtoken_1.default.sign({ _id: user?._id }, secret, {
                algorithm: "HS256",
                expiresIn: "2d",
            });
            const data = {
                token,
                email: user.email,
                name: user.name,
            };
            return (0, responseHandler_1.default)(res, true, 200, "Login Success", data);
        }
        // If Password Doesn't Match
        return (0, responseHandler_1.default)(res, false, 401, "Incorrect Credentials");
    }
    catch (error) {
        return (0, responseHandler_1.default)(res, false, 500, error.message);
    }
};
exports.signInUser = signInUser;
const signInWithGoogle = async (req, res) => {
    try {
        const { name, email, picture } = req.body;
        const user = await user_1.User.findOne({ email: email });
        if (user !== null) {
            const secret = process.env.JWT_SECRET;
            const token = jsonwebtoken_1.default.sign({ _id: user?._id }, secret, {
                algorithm: "HS256",
                expiresIn: "2d",
            });
            const data = {
                token,
                email: user.email,
                name: user.name,
                image_url: picture
            };
            return (0, responseHandler_1.default)(res, true, 200, "Login Success", data);
        }
        const userData = {
            name,
            email,
            image_url: picture
        };
        const newUser = await new user_1.User(userData).save();
        if (newUser !== null) {
            const secret = process.env.JWT_SECRET;
            const token = jsonwebtoken_1.default.sign({ _id: newUser?._id }, secret, {
                algorithm: "HS256",
                expiresIn: "2d",
            });
            const data = {
                token,
                email: newUser.email,
                name: newUser.name,
                image_url: picture
            };
            return (0, responseHandler_1.default)(res, true, 200, "Login Success", data);
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.signInWithGoogle = signInWithGoogle;
