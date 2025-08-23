"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const mongo_database_1 = __importDefault(require("./config/mongo-database"));
const Routes_1 = __importDefault(require("./routes/Routes"));
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
//init app
const app = (0, express_1.default)();
app.use(express_1.default.json());
// connect DB
(0, mongo_database_1.default)();
//routes
app.use("/api", Routes_1.default);
//middlewares
app.use(error_handler_middleware_1.errorHandler);
// define PORT
const PORT = config_1.default.port;
app.listen(PORT, () => {
    console.log(`Env: ${config_1.default.nodeEnv}`);
    console.log(`Server is running on port ${PORT}`);
});
