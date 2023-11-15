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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
const db_1 = __importDefault(require("./db"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = 3000;
    const app = (0, express_1.default)();
    // middlewares
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    yield db_1.default.injectDBInApp(app);
    // rotas
    app.use("/paises", routers_1.default.paisesRouter);
    app.use("/users", routers_1.default.usersRouter);
    // subir o servidor
    app.listen(port, () => {
        console.log(`Servidor sendo executado na porta ${port}`);
    });
});
main();
