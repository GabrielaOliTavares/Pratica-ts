"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paises_js_1 = __importDefault(require("../controllers/paises.js"));
const paisesRouter = express_1.default.Router();
paisesRouter.get("/", paises_js_1.default.buscaPaisPorPopulacao);
paisesRouter.post("/", paises_js_1.default.inserirPais);
paisesRouter.put("/:id", paises_js_1.default.atualizarPais);
paisesRouter.delete("/:id", paises_js_1.default.deletarPais);
exports.default = paisesRouter;
