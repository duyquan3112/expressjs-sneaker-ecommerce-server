"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccessResponse = exports.sendResponse = void 0;
const http_status_code_constant_1 = require("../constants/http-status-code.constant");
const sendResponse = (res, status, statusCode, data, message) => {
    const response = {
        status: status,
        data: data,
        message: message
    };
    res.status(statusCode).json(response);
};
exports.sendResponse = sendResponse;
const sendSuccessResponse = (res, data, statusCode = http_status_code_constant_1.HttpStatusCode.OK, message) => {
    (0, exports.sendResponse)(res, true, statusCode, data, message);
};
exports.sendSuccessResponse = sendSuccessResponse;
