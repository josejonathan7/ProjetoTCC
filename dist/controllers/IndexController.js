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
exports.IndexController = void 0;
var AnimesController_1 = require("./AnimesController");
var GamesController_1 = require("./GamesController");
var ObservationController_1 = require("./ObservationController");
var SiteController_1 = require("./SiteController");
var SongsController_1 = require("./SongsController");
var UserController_1 = require("./UserController");
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.handleGet = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var animeController, gameController, songController, siteController, observationController, userController, randomAnime, randomGame, randomsong, sites, users, observation, noteSuggestion, pageObjective, i, contactUsers, countContact, i, animesSite, gamesSite, countAnime, countGame, i, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        animeController = new AnimesController_1.AnimeController();
                        gameController = new GamesController_1.GameController();
                        songController = new SongsController_1.SongController();
                        siteController = new SiteController_1.SiteController();
                        observationController = new ObservationController_1.ObservationController();
                        userController = new UserController_1.UserController();
                        return [4 /*yield*/, animeController.handleGetAll()];
                    case 1:
                        randomAnime = _a.sent();
                        return [4 /*yield*/, gameController.handleGetAll()];
                    case 2:
                        randomGame = _a.sent();
                        return [4 /*yield*/, songController.handleGetForIndex()];
                    case 3:
                        randomsong = _a.sent();
                        return [4 /*yield*/, siteController.handleGet()];
                    case 4:
                        sites = _a.sent();
                        return [4 /*yield*/, userController.handleGet()];
                    case 5:
                        users = _a.sent();
                        return [4 /*yield*/, observationController.handleGet()
                            //dados de observação da página
                        ];
                    case 6:
                        observation = _a.sent();
                        for (i = 0; i < observation.length; i++) {
                            if (observation[i].name.trim() === "sugestão") {
                                noteSuggestion = observation[i];
                            }
                            if (observation[i].name.trim() === "objetivo-pagina") {
                                pageObjective = observation[i];
                            }
                            if (!pageObjective) {
                                pageObjective = {
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
                        countContact = 0;
                        for (i = 0; i < 3; i++) {
                            if (users[i] != null) {
                                contactUsers[countContact] = users[i];
                                countContact++;
                            }
                        }
                        animesSite = [];
                        gamesSite = [];
                        countAnime = 0;
                        countGame = 0;
                        for (i = 0; i < sites.length; i++) {
                            if (sites[i].category === "anime") {
                                animesSite[countAnime] = sites[i];
                                countAnime++;
                            }
                            else if (sites[i].category === "game") {
                                gamesSite[countGame] = sites[i];
                                countGame++;
                            }
                        }
                        ;
                        status = randomAnime && randomGame && randomsong && sites && users ? response.render("index", { animesArray: randomAnime, gamesArray: randomGame, contactUsers: contactUsers, dataSongs: randomsong, dataPageObjective: pageObjective, dataSuggestion: noteSuggestion, animesSite: animesSite, gamesSite: gamesSite }) : response.status(401).send("Requisition Failed!");
                        return [2 /*return*/, status];
                }
            });
        });
    };
    return IndexController;
}());
exports.IndexController = IndexController;
