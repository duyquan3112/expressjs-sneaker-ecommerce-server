"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_code_constant_1 = require("../../constants/http-status-code.constant");
const app_error_util_1 = require("../../utils/app-error.util");
const product_helper_1 = require("./helper/product.helper");
class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async getProducts(limit = 18) {
        return await this.productRepository.findWithLimit(limit);
    }
    async getAllProducts() {
        return await this.productRepository.findAll();
    }
    async getProductById(id) {
        if (id.trim() === "") {
            throw new app_error_util_1.AppError(http_status_code_constant_1.HttpStatusCode.BAD_REQUEST, http_status_code_constant_1.ErrorCode.BAD_REQUEST, "Invalid Request");
        }
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new app_error_util_1.AppError(http_status_code_constant_1.HttpStatusCode.NOT_FOUND, http_status_code_constant_1.ErrorCode.NOT_FOUND, "Product not found!");
        }
        return product;
    }
    async getProductsByName(name) {
        if (name.trim() === "") {
            return await this.productRepository.findAll();
        }
        return await this.productRepository.findByName(name.trim());
    }
    async createProduct(data) {
        const attributesTemplate = product_helper_1.ProductHelper.genAttributeTemplateFromVariant(data.variants ?? []);
        data.attributesTemplate = attributesTemplate;
        return await this.productRepository.create(data);
    }
    async updateProduct(id, data) {
        if (id.trim() === "") {
            throw new app_error_util_1.AppError(http_status_code_constant_1.HttpStatusCode.BAD_REQUEST, http_status_code_constant_1.ErrorCode.BAD_REQUEST, "Invalid Request");
        }
        const updatedProduct = await this.productRepository.update(id, data);
        if (!updatedProduct) {
            throw new app_error_util_1.AppError(http_status_code_constant_1.HttpStatusCode.NOT_FOUND, http_status_code_constant_1.ErrorCode.NOT_FOUND, "Product not found!");
        }
        return updatedProduct;
    }
    async deleteProduct(id) {
        return await this.productRepository.delete(id);
    }
}
exports.default = ProductService;
