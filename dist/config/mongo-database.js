"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose_1.default.set("strictQuery", false);
const connectDB = async () => {
    const connectionString = config_1.default.mongoUri;
    try {
        await mongoose_1.default.connect(connectionString);
        console.log("MongoDB connected");
    }
    catch (e) {
        console.error("MongoDB connection error:", e);
        process.exit(1);
    }
};
exports.default = connectDB;
