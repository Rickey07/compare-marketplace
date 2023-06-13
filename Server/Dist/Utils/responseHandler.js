"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseHandler = (res, success, statusCode, message, data) => {
    const response = {
        success,
        statusCode,
        message,
        data
    };
    return res.status(statusCode).json(response);
};
exports.default = ResponseHandler;
