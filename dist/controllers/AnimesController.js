"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeController = void 0;
var CreateAnimeService_1 = require("../services/Create/CreateAnimeService");
var UpdateAnimeService_1 = require("../services/Update/UpdateAnimeService");
var SearchAnimeService_1 = require("../services/Search/SearchAnimeService");
var PaginationAnimeService_1 = require("../services/Get/QueryForPagination/PaginationAnimeService");
var DeleteAnimeService_1 = require("../services/Delete/DeleteAnimeService");
var UserController_1 = require("./UserController");
var GetAnimeService_1 = require("../services/Get/GetAnimeService");
var AnimeController = /** @class */ (function () {
    function AnimeController() {
    }
    AnimeController.prototype.handleCreate = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, link, image, creatAnimeService, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.body["anime-name"];
                        link = request.body["anime-link"];
                        image = request.body["anime-image"];
                        creatAnimeService = new CreateAnimeService_1.CreateAnimeService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, creatAnimeService.execute({ name: name, link: link, image: image })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.json("ok")];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, response.status(400).send(err_1.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AnimeController.prototype.handleUpdate = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, name, link, image, updateAnimeService, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        name = request.body["anime-name"];
                        link = request.body["anime-link"];
                        image = request.body["anime-image"];
                        updateAnimeService = new UpdateAnimeService_1.UpdateAnimeService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, updateAnimeService.execute({ id: id, name: name, link: link, image: image })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.json("ok")];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, response.status(400).send(err_2.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AnimeController.prototype.handleSearch = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, searchAnimeService, anime, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.body["anime-name"];
                        searchAnimeService = new SearchAnimeService_1.SearchAnimeService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, searchAnimeService.execute(name)];
                    case 2:
                        anime = _a.sent();
                        return [2 /*return*/, response.json({ anime: anime })];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, response.status(404).send(err_3.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AnimeController.prototype.handlePagination = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var paginationAnimeService, userController, user, recordsPerPage, urlParams, current, start, animePagination, totalRows, numberOfPages, randomUser, contactUsers, status_1, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paginationAnimeService = new PaginationAnimeService_1.PaginationAnimeService();
                        userController = new UserController_1.UserController();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, userController.handleGet()];
                    case 2:
                        user = _a.sent();
                        recordsPerPage = 2;
                        urlParams = request.query.page;
                        current = Number(urlParams ? urlParams : 1);
                        start = (recordsPerPage * current) - recordsPerPage;
                        return [4 /*yield*/, paginationAnimeService.execute(start, recordsPerPage)];
                    case 3:
                        animePagination = _a.sent();
                        totalRows = animePagination[1];
                        numberOfPages = Math.ceil(Number(totalRows) / recordsPerPage);
                        randomUser = Math.floor(Math.random() * (user.length - 0));
                        contactUsers = void 0;
                        if (typeof user === "object") {
                            contactUsers = user[randomUser];
                        }
                        else {
                            contactUsers = user;
                        }
                        status_1 = animePagination[0];
                        return [2 /*return*/, response.json({ contactUsers: contactUsers, dataAnimesLimit: status_1, numberOfPages: numberOfPages, current: current })];
                    case 4:
                        err_4 = _a.sent();
                        return [2 /*return*/, response.status(404).send(err_4.message)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AnimeController.prototype.handleDelete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteAnimeService, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        deleteAnimeService = new DeleteAnimeService_1.DeleteAnimeService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, deleteAnimeService.execute(id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.json("ok")];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, response.status(404).send(err_5.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //essa e a função handle paginatio fazem a mesma coisa no sentido geral que é buscar dados, a diferença é que a págination é para organizar a quantidade de conteudo a ser exibido por página, e essa ela traz todos os dados para que eles sejam selecionados aleatoriamente para saber qual vai ser exibido na página inicial
    AnimeController.prototype.handleGetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getAnimeService, animes, animesCarousel, i, animesfilter, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getAnimeService = new GetAnimeService_1.GetAnimeService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, getAnimeService.execute()];
                    case 2:
                        animes = _a.sent();
                        animesCarousel = [];
                        if (animes) {
                            for (i = 0; i < 5; i++) {
                                animesfilter = Math.floor(Math.random() * (animes.length - 0));
                                animesCarousel[i] = animes[animesfilter];
                            }
                        }
                        return [2 /*return*/, animesCarousel];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Falha");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AnimeController;
}());
exports.AnimeController = AnimeController;
