"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordsAccessController = void 0;
var RecordsAccessController = /** @class */ (function () {
    function RecordsAccessController() {
    }
    //acessando as páginas de criação, atualização, e deletar registros
    RecordsAccessController.prototype.accesFormNew = function (request, response) {
        return response.send("ok");
    };
    RecordsAccessController.prototype.accesFormUpdate = function (request, response) {
        return response.send("ok");
    };
    return RecordsAccessController;
}());
exports.RecordsAccessController = RecordsAccessController;
