"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = __importDefault(require("./product.service"));
const product_repository_1 = __importDefault(require("./product.repository"));
const response_util_1 = require("../../utils/response.util");
const http_status_code_constant_1 = require("../../constants/http-status-code.constant");
const app_logger_util_1 = require("../../utils/app-logger.util");
const repo = product_repository_1.default;
const productService = new product_service_1.default(repo);
const getAllProducts = async (req, res, next) => {
    const products = await productService.getAllProducts();
    return (0, response_util_1.sendSuccessResponse)(res, products);
};
const getProductById = async (req, res, next) => {
    const product = await productService.getProductById(req.params.id);
    return (0, response_util_1.sendSuccessResponse)(res, product);
};
const searchProducts = async (req, res, next) => {
    const name = req.query.name;
    const products = await productService.getProductsByName(name);
    return (0, response_util_1.sendSuccessResponse)(res, products);
};
const createProduct = async (req, res, next) => {
    console.log("Request body: ", req.body);
    const newProduct = await productService.createProduct(req.body);
    app_logger_util_1.AppLogger.info("Create success: ", newProduct);
    return (0, response_util_1.sendSuccessResponse)(res, newProduct, http_status_code_constant_1.HttpStatusCode.CREATED, "Product created successfully");
};
const updateProduct = async (req, res, next) => {
    console.log("Request body: ", req.body);
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    return (0, response_util_1.sendSuccessResponse)(res, updatedProduct, http_status_code_constant_1.HttpStatusCode.OK, "Product updated successfully");
};
const deleteProduct = async (req, res, next) => {
    await productService.deleteProduct(req.params.id);
    res.status(http_status_code_constant_1.HttpStatusCode.NO_CONTENT).send();
};
exports.ProductController = {
    getAllProducts,
    getProductById,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
