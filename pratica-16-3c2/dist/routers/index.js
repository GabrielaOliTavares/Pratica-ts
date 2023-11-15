"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paises_router_js_1 = __importDefault(require("./paises-router.js"));
const users_router_js_1 = __importDefault(require("./users-router.js"));
const routers = {
    paisesRouter: paises_router_js_1.default,
    usersRouter: users_router_js_1.default
};
exports.default = routers;
