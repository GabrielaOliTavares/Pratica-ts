"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paises_controller_js_1 = __importDefault(require("../controllers/paises-controller.js"));
const users_controller_js_1 = __importDefault(require("../controllers/users-controller.js"));
const paisesRouter = express_1.default.Router();
paisesRouter.get("/", users_controller_js_1.default.auth, paises_controller_js_1.default.buscaPaisPorPopulacao);
paisesRouter.post("/", users_controller_js_1.default.auth, paises_controller_js_1.default.inserirPais);
paisesRouter.put("/:id", users_controller_js_1.default.auth, paises_controller_js_1.default.atualizarPais);
paisesRouter.delete("/:id", users_controller_js_1.default.auth, paises_controller_js_1.default.deletarPais);
exports.default = paisesRouter;
