"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = exports.errorHandler = void 0;
const app_error_util_1 = require("../utils/app-error.util");
const http_status_code_constant_1 = require("../constants/http-status-code.constant");
const errorHandler = (error, req, res, next) => {
    if (error instanceof app_error_util_1.AppError) {
        const body = {
            status: false,
            error: {
                message: error.message,
                detail: error.details,
                code: error.errorCode
            }
        };
        return res.status(error.statusCode).json(body);
    }
    const body = {
        status: false,
        error: {
            message: error.message,
            code: http_status_code_constant_1.ErrorCode.INTERNAL_SERVER_ERROR
        }
    };
    return res.status(http_status_code_constant_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json(body);
};
exports.errorHandler = errorHandler;
const catchAsync = (func) => {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch(next);
    };
};
exports.catchAsync = catchAsync;
