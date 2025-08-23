"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidateSchema = exports.createProductValidateSchema = exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
const product_interface_1 = require("../interfaces/product.interface");
const zod_1 = __importDefault(require("zod"));
const product_variant_model_1 = require("./product-variant.model");
// https://mongoosejs.com/docs/typescript.html
exports.productSchema = new mongoose_1.Schema({
    name: { type: String, required: true }, // example: Air Jordan 1
    slug: { type: String, required: true, unique: true }, // example: air-jordan-1
    brand: { type: String, required: true },
    basePrice: { type: Number, required: true, min: 0 },
    shortDescription: { type: String },
    fullDescription: { type: String },
    images: [{ type: String, required: true }],
    categories: [{ type: String, required: true }],
    variants: [product_variant_model_1.variantSchema], // Array nested schema
    attributesTemplate: {
        type: mongoose_1.Schema.Types.Mixed, // Dynamic object { [key: string]: (string | number)[] }
        default: {}
    },
    tags: [{ type: String }],
    status: {
        type: String,
        enum: Object.values(product_interface_1.StatusTypes), // Enum từ StatusTypes để validate
        required: true,
        default: product_interface_1.StatusTypes.DRAFT
    }
}, { timestamps: true });
//pre-save hooks
exports.productSchema.pre("save", function (next) {
    this.variants.forEach((v) => {
        v.available = v.stock > 0;
    });
    next();
});
// validate schema
exports.createProductValidateSchema = zod_1.default.object({
    name: zod_1.default.string().nonempty({ message: "Name is required" }),
    brand: zod_1.default.string().nonempty({ message: "Brand is required" }),
    slug: zod_1.default.string().nonempty({ message: "Slug is required" }),
    images: zod_1.default.string().array().nonempty({ message: "Images is required" }),
    categories: zod_1.default
        .string()
        .array()
        .nonempty({ message: "categories is required" }),
    basePrice: zod_1.default.number().positive({ message: "Base Price must be >= 0" }),
    variants: zod_1.default
        .array(product_variant_model_1.productVariantValidateSchema)
        .nonempty({ message: "At least one variant is required" })
});
exports.updateProductValidateSchema = exports.createProductValidateSchema.partial();
exports.default = (0, mongoose_1.model)("Product", exports.productSchema, "Products");
