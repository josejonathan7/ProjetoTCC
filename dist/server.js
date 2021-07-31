"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
require("./database");
require("reflect-metadata");
require("express-async-error");
var path_1 = __importDefault(require("path"));
var CreateRoutes_1 = require("./routes/CreateRoutes");
var UpdateRouter_1 = require("./routes/UpdateRouter");
var DeleteRoutes_1 = require("./routes/DeleteRoutes");
var SearchRoutes_1 = require("./routes/SearchRoutes");
var GetRoutes_1 = require("./routes/GetRoutes");
var server = express_1.default();
server.use(express_1.default.json());
server.set('view engine', 'ejs');
server.set("views", path_1.default.join(__dirname, "views"));
server.use(express_1.default.static("public"));
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
server.listen(3000, function () { return console.log("O servidor esta rodando"); });
