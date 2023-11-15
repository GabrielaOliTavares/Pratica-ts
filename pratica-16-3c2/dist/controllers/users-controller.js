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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = "COTEMIG2023";
class UsersController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = req.body;
            try {
                if (typeof record.username === "undefined" ||
                    typeof record.password === "undefined" ||
                    typeof record.username !== "string" ||
                    typeof record.password !== "string") {
                    throw new Error("Usuário ou Senha não foi informado ou é inválido");
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
                return;
            }
            try {
                const db = req.db;
                const users = db.collection("users");
                if ((yield users.find({ username: record.username, password: record.password }).count()) === 0) {
                    res.status(404).json({ message: "Usuário ou Senha inválido" });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ username: record.username }, SECRET);
                res.status(200).json({ token });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static auth(req, res, next) {
        const authorization = req.headers.authorization;
        if (typeof authorization !== "string") {
            res.status(401).json({ message: "O token não foi informado" });
            return;
        }
        const authorizationArray = authorization.split(" ");
        if (authorizationArray.length !== 2 && authorizationArray[1] === "") {
            res.status(401).json({ message: "O cabeçalho autorization está inválido" });
            return;
        }
        try {
            jsonwebtoken_1.default.verify(authorizationArray[1], SECRET);
            next();
        }
        catch (error) {
            res.status(401).json({ message: "O token é inválido" });
            return;
        }
    }
}
exports.default = UsersController;
//npm install jsonwebtoken
//npm install @types/jsonwebtoken -D
