"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoProductRepository = void 0;
const product_model_1 = __importDefault(require("./models/product.model"));
class MongoProductRepository {
    // CRUD Implementations
    async findWithLimit(limit) {
        return await product_model_1.default.find().limit(limit);
    }
    async findByName(name) {
        return await product_model_1.default.find({ name: { $regex: name, $options: "i" } });
    }
    async create(data) {
        const newProduct = new product_model_1.default(data);
        return await newProduct.save();
    }
    async findById(id) {
        return await product_model_1.default.findById(id);
    }
    async findAll() {
        return await product_model_1.default.find();
    }
    async update(id, data) {
        return await product_model_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return (await product_model_1.default.findByIdAndDelete(id)) ?? false;
    }
}
exports.MongoProductRepository = MongoProductRepository;
exports.default = new MongoProductRepository();
