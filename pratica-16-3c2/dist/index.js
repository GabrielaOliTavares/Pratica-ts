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
const pais_js_1 = __importDefault(require("./models/pais.js"));
const db_1 = __importDefault(require("./db"));
const paises = [
    new pais_js_1.default("Brasil", 203062512),
    new pais_js_1.default("Estados Unidos", 339987103),
    new pais_js_1.default("Egito", 102334404),
    new pais_js_1.default("Reino Unido", 67886011),
    new pais_js_1.default("Argentina", 45195774)
];
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        conn = yield db_1.default.getMongoConn();
        const db = conn.db(); // devweb2
        const paisesCollection = db.collection("paises");
        // deleta todos os documentos da coleção
        // Como se fosse: delete from paises;
        yield paisesCollection.deleteMany({});
        console.log("Documentos deletados");
        /*// forma verbosa
        for (let pais of paises) {
            // Como se fosse: select count(*) from paises where nome = ?;
            let qtd = await paisesCollection.find({nome: pais.nome}).count();
            if (qtd === 0) {
                await paisesCollection.insertOne(pais);
            }
        }*/
        yield paisesCollection.insertMany(paises);
        console.log("Dados inseridos com sucesso!");
        const paisesFind = yield paisesCollection.find().toArray();
        paisesFind.forEach((value) => {
            console.log(value);
        });
    }
    catch (error) {
        console.log(error);
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
});
main();
