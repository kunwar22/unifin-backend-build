"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const appDataSource_1 = require("./appDataSource");
const errorHandler_1 = require("./middleware/errorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = Number(process.env.PORT) || 8000;
const app = (0, express_1.default)();
appDataSource_1.AppDataSource.initialize()
    .then(() => {
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        credentials: true,
        origin: ['http://localhost:3000']
    }));
    (0, routes_1.routes)(app);
    app.use(errorHandler_1.errorHandler);
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
})
    .catch((err) => {
    console.log("Error Connecting Database", err);
});
//# sourceMappingURL=index.js.map