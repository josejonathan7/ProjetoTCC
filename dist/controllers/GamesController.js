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
exports.GameController = void 0;
var CreateGameService_1 = require("../services/Create/CreateGameService");
var UpdateGameService_1 = require("../services/Update/UpdateGameService");
var SearchGameService_1 = require("../services/Search/SearchGameService");
var DeleteGameService_1 = require("../services/Delete/DeleteGameService");
var UserController_1 = require("./UserController");
var ObservationController_1 = require("./ObservationController");
var PaginationGameService_1 = require("../services/Get/QueryForPagination/PaginationGameService");
var GetGameService_1 = require("../services/Get/GetGameService");
var GameController = /** @class */ (function () {
    function GameController() {
    }
    GameController.prototype.handlePagination = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var paginationGameService, userController, observationController, observation, user, recordsPerPage, urlParams, current, start, gamePagination, totalRows, numberOfPages, noteSuggestion, pageObservation, i, contactUsers, i, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paginationGameService = new PaginationGameService_1.PaginationGameService();
                        userController = new UserController_1.UserController();
                        observationController = new ObservationController_1.ObservationController();
                        return [4 /*yield*/, observationController.handleGet()];
                    case 1:
                        observation = _a.sent();
                        return [4 /*yield*/, userController.handleGet()
                            //código para trabalhar com a páginação da página
                            //quantidade de registro por página
                        ];
                    case 2:
                        user = _a.sent();
                        recordsPerPage = 2;
                        urlParams = request.query.page;
                        current = Number(urlParams ? urlParams : 1);
                        start = (recordsPerPage * current) - recordsPerPage;
                        return [4 /*yield*/, paginationGameService.execute(start, recordsPerPage)
                            //quantidade de registros
                        ];
                    case 3:
                        gamePagination = _a.sent();
                        totalRows = gamePagination[1];
                        numberOfPages = Math.ceil(Number(totalRows) / recordsPerPage);
                        for (i = 0; i < observation.length; i++) {
                            if (observation[i].name.trim() === "sugestão") {
                                noteSuggestion = observation[i];
                            }
                            if (observation[i].name.trim() === "preferencia-anime") {
                                pageObservation = observation[i];
                            }
                            if (!pageObservation) {
                                pageObservation = {
                                    name: "",
                                    information: ""
                                };
                            }
                            if (!noteSuggestion) {
                                noteSuggestion = {
                                    name: "",
                                    information: ""
                                };
                            }
                        }
                        contactUsers = [];
                        for (i = 0; i < 3; i++) {
                            if (user[i] != null) {
                                contactUsers[i] = user[i];
                            }
                        }
                        status = gamePagination ? gamePagination[0] : response.status(401).send("Load Pagination Failed!");
                        return [2 /*return*/, response.render("jogos", { contactUsers: contactUsers, dataSuggestion: noteSuggestion, dataObservation: pageObservation, dataGamesLimit: status, numberOfPages: numberOfPages, current: current })];
                }
            });
        });
    };
    GameController.prototype.handleCreate = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, link, image, creatGameService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.body["game-name"];
                        link = request.body["game-link"];
                        image = request.body["game-image"];
                        creatGameService = new CreateGameService_1.CreateGameService();
                        return [4 /*yield*/, creatGameService.execute({ name: name, link: link, image: image })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.render("Register")];
                }
            });
        });
    };
    GameController.prototype.handleUpdate = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, name, link, image, updateGameService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        name = request.body["game-name"];
                        link = request.body["game-link"];
                        image = request.body["game-image"];
                        updateGameService = new UpdateGameService_1.UpdateGameService();
                        return [4 /*yield*/, updateGameService.execute({ id: id, name: name, link: link, image: image })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.render("UpdateRegisters")];
                }
            });
        });
    };
    GameController.prototype.handleSearch = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, searchGameService, game, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.body["game-name"];
                        searchGameService = new SearchGameService_1.SearchGameService();
                        return [4 /*yield*/, searchGameService.execute(name)];
                    case 1:
                        game = _a.sent();
                        status = game ? response.render("updateDelete/UpdateDeleteShowGame", { dataResult: game }) : response.status(401).send("Name Search Not Found!");
                        return [2 /*return*/, status];
                }
            });
        });
    };
    GameController.prototype.handleDelete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteGameService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        deleteGameService = new DeleteGameService_1.DeleteGameService();
                        return [4 /*yield*/, deleteGameService.execute(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.render("UpdateRegisters")];
                }
            });
        });
    };
    //essa e a função handle paginatio fazem a mesma coisa no sentido geral que é buscar dados, a diferença é que a págination é para organizar a quantidade de conteudo a ser exibido por página, e essa ela traz todos os dados para que eles sejam selecionados aleatoriamente para saber qual vai ser exibido na página inicial
    GameController.prototype.handleGetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getGameService, games, gamesCarousel, i, gamesfilter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getGameService = new GetGameService_1.GetGameService();
                        return [4 /*yield*/, getGameService.execute()];
                    case 1:
                        games = _a.sent();
                        gamesCarousel = [];
                        if (games) {
                            for (i = 0; i < 5; i++) {
                                gamesfilter = Math.floor(Math.random() * (games.length - 0));
                                gamesCarousel[i] = games[gamesfilter];
                            }
                        }
                        return [2 /*return*/, gamesCarousel];
                }
            });
        });
    };
    return GameController;
}());
exports.GameController = GameController;
