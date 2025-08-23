"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const config_1 = __importDefault(require("../config/config"));
function log(level, message, ...args) {
    if (config_1.default.nodeEnv === "development") {
        const timestamp = new Date().toISOString();
        switch (level) {
            case "info":
                console.log(`[INFO] ${timestamp} - ${message}`, ...args);
                break;
            case "warn":
                console.warn(`[WARN] ${timestamp} - ${message}`, ...args);
                break;
            case "error":
                console.error(`[ERROR] ${timestamp} - ${message}`, ...args);
                break;
            case "debug":
                console.debug(`[DEBUG] ${timestamp} - ${message}`, ...args);
                break;
        }
    }
}
exports.AppLogger = {
    info: (msg, ...args) => log("info", msg, ...args),
    warn: (msg, ...args) => log("warn", msg, ...args),
    error: (msg, ...args) => log("error", msg, ...args),
    debug: (msg, ...args) => log("debug", msg, ...args)
};
