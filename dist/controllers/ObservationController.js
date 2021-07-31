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
exports.ObservationController = void 0;
var CreateObservationService_1 = require("../services/Create/CreateObservationService");
var DeleteObservationService_1 = require("../services/Delete/DeleteObservationService");
var GetObservationService_1 = require("../services/Get/GetObservationService");
var SearchObservationService_1 = require("../services/Search/SearchObservationService");
var UpdateObservationService_1 = require("../services/Update/UpdateObservationService");
var ObservationController = /** @class */ (function () {
    function ObservationController() {
    }
    ObservationController.prototype.handleCreate = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, information, createObservationService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.body["observation-name"];
                        information = request.body.information;
                        createObservationService = new CreateObservationService_1.CreateObservationService();
                        return [4 /*yield*/, createObservationService.execute({ name: name, information: information })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.render("Register")];
                }
            });
        });
    };
    ObservationController.prototype.handleUpdate = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, name, information, updateObservationService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        name = request.body["observation-name"];
                        information = request.body.information;
                        updateObservationService = new UpdateObservationService_1.UpdateObservationService();
                        return [4 /*yield*/, updateObservationService.execute({ id: id, name: name, information: information })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.render("UpdateRegisters")];
                }
            });
        });
    };
    ObservationController.prototype.handleSearch = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, searchObservationService, observation, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.body["observation-name"];
                        searchObservationService = new SearchObservationService_1.SearchObservationService();
                        return [4 /*yield*/, searchObservationService.execute(name)];
                    case 1:
                        observation = _a.sent();
                        status = observation ? response.render("updateDelete/UpdateDeleteShowObservation", { dataResult: observation }) : response.status(401).send("Name Search Not Found!");
                        return [2 /*return*/, status];
                }
            });
        });
    };
    ObservationController.prototype.handleGet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getObservationService, observation, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getObservationService = new GetObservationService_1.GetObservationService();
                        return [4 /*yield*/, getObservationService.execute()];
                    case 1:
                        observation = _a.sent();
                        status = observation ? observation : "";
                        return [2 /*return*/, status];
                }
            });
        });
    };
    ObservationController.prototype.handleDelete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteObservationService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        deleteObservationService = new DeleteObservationService_1.DeleteObservationService();
                        return [4 /*yield*/, deleteObservationService.execute(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.render("UpdateRegisters")];
                }
            });
        });
    };
    return ObservationController;
}());
exports.ObservationController = ObservationController;
