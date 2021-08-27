"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticate = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticate(request, response) {
    var token = request.body.token;
    try {
        var user = jsonwebtoken_1.verify(token, "AniJogos");
        return response.json({ user: user });
    }
    catch (err) {
        return response.status(401).send("token inválido");
    }
}
exports.ensureAuthenticate = ensureAuthenticate;
