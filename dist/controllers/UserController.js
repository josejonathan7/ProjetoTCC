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
exports.UserController = void 0;
var CreateUserService_1 = require("../services/Create/CreateUserService");
var DeleteUserService_1 = require("../services/Delete/DeleteUserService");
var GetUserService_1 = require("../services/Get/GetUserService");
var SearchUserService_1 = require("../services/Search/SearchUserService");
var UpdateUserService_1 = require("../services/Update/UpdateUserService");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.handleCreate = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, email_contact_link, password, avatar, description, creatUserService, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.body["user-name"];
                        email_contact_link = request.body["email-contact-link"];
                        password = request.body["user-password"];
                        avatar = request.body.avatar;
                        description = request.body["user-description"];
                        creatUserService = new CreateUserService_1.CreateUserService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, creatUserService.execute({ name: name, email_contact_link: email_contact_link, password: password, avatar: avatar, description: description })];
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
    UserController.prototype.handleUpdate = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, name, email_contact_link, avatar, description, updateUserService, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        name = request.body["user-name"];
                        email_contact_link = request.body["email-contact-link"];
                        avatar = request.body.avatar;
                        description = request.body["user-description"];
                        updateUserService = new UpdateUserService_1.UpdateUserService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, updateUserService.execute({ id: id, name: name, avatar: avatar, description: description, email_contact_link: email_contact_link })];
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
    UserController.prototype.handleSearch = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var name, searchUserService, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = request.body["user-name"];
                        searchUserService = new SearchUserService_1.SearchUserService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, searchUserService.execute(name)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, response.json({ user: user })];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, response.status(404).send(err_3.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.handleGet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getUserService, user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getUserService = new GetUserService_1.GetUserService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, getUserService.execute()];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("falha");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.handleDelete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteUserService, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        deleteUserService = new DeleteUserService_1.DeleteUserService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, deleteUserService.execute(id)];
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
    return UserController;
}());
exports.UserController = UserController;
