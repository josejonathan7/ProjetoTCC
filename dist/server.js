"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
require("./database");
require("express-async-error");
var CreateRoutes_1 = require("./routes/CreateRoutes");
var UpdateRouter_1 = require("./routes/UpdateRouter");
var DeleteRoutes_1 = require("./routes/DeleteRoutes");
var SearchRoutes_1 = require("./routes/SearchRoutes");
var GetRoutes_1 = require("./routes/GetRoutes");
var cors_1 = __importDefault(require("cors"));
var server = express_1.default();
server.use(express_1.default.json());
server.use(cors_1.default());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(GetRoutes_1.getRouter);
server.use(CreateRoutes_1.createRouter);
server.use(UpdateRouter_1.updateRouter);
server.use(DeleteRoutes_1.deleteRouter);
server.use(SearchRoutes_1.searchRouter);
server.use(function (err, request, response, next) {
    if (err instanceof Error) {
        return response.status(400).json({ error: err.message });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server error!"
    });
});
dotenv_1.default.config();
server.listen(process.env.PORT || 3010, function () { return console.log("O servidor esta rodando"); });
