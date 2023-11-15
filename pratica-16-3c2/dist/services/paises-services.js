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
const pais_js_1 = __importDefault(require("../models/pais.js"));
class PaisesService {
    constructor(db) {
        this.db = db;
    }
    validarParametroPopulacao(populacao) {
        if (typeof populacao === "undefined") {
            throw new Error("Parâmetro população não foi informado!");
        }
        if (typeof populacao !== "string") {
            throw new Error("Parâmetro população não é válido!");
        }
        let populacaoNumber = parseInt(populacao);
        if (isNaN(populacaoNumber)) { // se for NaN -> Not a Number
            throw new Error("Parâmetro populacao não é valido!");
        }
        return populacaoNumber;
    }
    buscarPaisesPorPopulacao(populacao) {
        const paises = this.db.collection("paises");
        // semelhante: select * from paises where populacao >= ?;
        return paises.find({
            populacao: { $gte: populacao }
        }).toArray();
    }
    validar(record) {
        // nome
        if (typeof record.nome === "undefined") {
            throw new Error("O atributo nome não foi informado");
        }
        if (typeof record.nome !== "string") {
            throw new Error("O atributo nome não é válido");
        }
        if (record.nome === "") {
            throw new Error("O atributo nome não pode ser vazio");
        }
        // populacao
        if (typeof record.populacao === "undefined") {
            throw new Error("O atributo populacao não foi informado");
        }
        if (typeof record.populacao !== "number") {
            throw new Error("O atributo populacao não é válido");
        }
        if (record.populacao < 0) {
            throw new Error("O atributo populacao não pode ser negativo");
        }
        return new pais_js_1.default(record.nome, record.populacao);
    }
    inserir(pais) {
        return __awaiter(this, void 0, void 0, function* () {
            const paises = this.db.collection("paises");
            yield paises.insertOne(pais);
        });
    }
    existe(objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const paises = this.db.collection("paises");
            const qtd = yield paises.find({
                _id: objectId // select count(_id) from pessoas where _id = ?
            }).count();
            return (qtd > 0);
        });
    }
    atualizar(objectId, pais) {
        return __awaiter(this, void 0, void 0, function* () {
            const paises = this.db.collection("paises");
            yield paises.updateOne({
                _id: objectId
            }, {
                $set: pais
            }); // update paises set nome = '?', populacao = ? where _id = ?;
        });
    }
    deletar(objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const paises = this.db.collection("paises");
            yield paises.deleteOne({
                _id: objectId // delete from paises where _id = ?
            });
        });
    }
}
exports.default = PaisesService;
