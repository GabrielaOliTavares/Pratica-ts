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
Object.defineProperty(exports, "__esModule", { value: true });
// importa a classe MongoClient
const mongodb_1 = require("mongodb");
// Cria a string de conexão
const uri = "mongodb://admin:admin@127.0.0.1:27017/devweb2";
// Retorna uma conexão ativa
const getMongoConn = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new mongodb_1.MongoClient(uri); // Cria objeto da conexão
        const conn = yield client.connect(); // Conecta na instância
        process.on("SIGINT", () => {
            conn.close();
            console.log("Conexão encerrada com sucesso!");
            process.exit(0);
        });
        return conn; // Retorna a conexão
    }
    catch (error) {
        console.log("Erro na conexão com o banco de dados");
        process.exit(1);
    }
});
const injectDBInApp = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield getMongoConn();
    app.use((req, res, next) => {
        req.db = conn.db();
        next();
    });
});
// Exporta a função de conexão
exports.default = { getMongoConn, injectDBInApp };
