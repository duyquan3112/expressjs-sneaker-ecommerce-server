"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_routes_1 = __importDefault(require("../modules/product/product.routes"));
const appRouter = (0, express_1.Router)();
// Product module
appRouter.use("/product", product_routes_1.default);
exports.default = appRouter;
