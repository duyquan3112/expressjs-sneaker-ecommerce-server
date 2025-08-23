"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHelper = void 0;
const genAttributeTemplateFromVariant = (variants) => {
    const attributesTemplate = {};
    if (variants) {
        variants.forEach((variant) => {
            Object.entries(variant.attributes).map(([key, value]) => {
                if (!attributesTemplate[key]) {
                    attributesTemplate[key];
                }
                if (!attributesTemplate[key].includes(value)) {
                    attributesTemplate[key].push(value);
                }
            });
        });
    }
    return attributesTemplate;
};
/**
 * Generate SKU with auto-increment suffix.
 * Example: NIKE-AIRMAX1-RED-42, NIKE-AIRMAX1-RED-42
 *
 * @param brand - Brand name (e.g., "Nike")
 * @param slug - Product slug (e.g., "air-max-1")
 * @param attributes - Variant attributes (must include color and size)
 * @returns Unique SKU string
 */
const generateSKU = async (brand, slug, attributes) => {
    const brandCode = brand.toUpperCase();
    const slugCode = slug.split(/-/g).map((char) => char[0].toUpperCase());
    const colorCode = attributes.color.replace(/\s+/g, "").toUpperCase();
    const sizeCode = String(attributes.size).toUpperCase();
    const baseSKU = `${brandCode}-${slugCode}-${colorCode}-${sizeCode}`;
    return baseSKU;
};
exports.ProductHelper = {
    genAttributeTemplateFromVariant,
    generateSKU
};
