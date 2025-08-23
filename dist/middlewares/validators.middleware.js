"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const app_error_util_1 = require("../utils/app-error.util");
const http_status_code_constant_1 = require("../constants/http-status-code.constant");
const ProductValidator = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        throw new app_error_util_1.AppError(http_status_code_constant_1.HttpStatusCode.BAD_REQUEST, http_status_code_constant_1.ErrorCode.BAD_REQUEST, "", result.error.issues.map((iss) => iss.message));
    }
    next();
};
exports.Validator = {
    ProductValidator
};
