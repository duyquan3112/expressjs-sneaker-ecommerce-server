"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productVariantValidateSchema = exports.variantSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.variantSchema = new mongoose_1.Schema({
    sku: { type: String, required: true, unique: true },
    attributes: { type: mongoose_1.Schema.Types.Mixed, required: true },
    price: { type: Number, required: true, min: 0 },
    comparePrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    weight: { type: Number, min: 0 },
    images: [{ type: String }],
    available: { type: Boolean, default: true }
});
//validate
exports.productVariantValidateSchema = zod_1.z.object({
    sku: zod_1.z.string().min(1, { message: "SKU is required" }),
    attributes: zod_1.z.record(zod_1.z.string(), zod_1.z.union([zod_1.z.string(), zod_1.z.number()])),
    price: zod_1.z.number().min(0, { message: "Price must be at least 0" }),
    comparePrice: zod_1.z
        .number()
        .min(0, { message: "Compare price must be >= 0" })
        .optional(),
    stock: zod_1.z.number().min(0, { message: "Stock must be >= 0" }),
    weight: zod_1.z
        .number()
        .positive({ message: "Weight must be positive" })
        .optional(),
    images: zod_1.z.url({ message: "Image must be a valid URL" }).optional(),
    available: zod_1.z.boolean().optional()
});
