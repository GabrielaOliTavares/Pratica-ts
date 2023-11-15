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
const mongodb_1 = require("mongodb");
const db_1 = __importDefault(require("../db"));
const pais_js_1 = __importDefault(require("../models/pais.js"));
class PaisesController {
    static buscaPaisPorPopulacao(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { populacao } = req.query;
            try {
                if (typeof populacao !== "string") {
                    throw new Error("Parâmetro população não foi informado!");
                }
                let populacaoNumber = parseInt(populacao);
                if (isNaN(populacaoNumber)) {
                    throw new Error("Parâmetro populacao não é valido!");
                }
                let conn = null;
                try {
                    conn = yield (0, db_1.default)();
                    const db = conn.db();
                    const paises = db.collection("paises");
                    // semelhante: select * from paises where populacao >= ?;
                    const paisesFiltrados = yield paises.find({
                        populacao: { $gte: populacaoNumber }
                    }).toArray();
                    res.status(200).json(paisesFiltrados);
                }
                catch (err) {
                    res.status(500).json(err.message);
                }
                finally {
                    conn === null || conn === void 0 ? void 0 : conn.close();
                }
            }
            catch (error) {
                const message = error.message;
                res.status(400).json({ message });
            }
        });
    }
    static inserirPais(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = req.body;
            try {
                if (!record.nome) {
                    throw new Error("O atributo nome não foi informado");
                }
                if (!record.populacao) {
                    throw new Error("O atributo populacao não foi informado");
                }
                if (typeof record.nome !== "string") {
                    throw new Error("O atributo nome não é válido");
                }
                if (typeof record.populacao !== "number") {
                    throw new Error("O atributo populacao não é válido");
                }
                const pais = new pais_js_1.default(record.nome, record.populacao);
                let conn = null;
                try {
                    conn = yield (0, db_1.default)();
                    const db = conn.db();
                    const paises = db.collection("paises");
                    yield paises.insertOne(pais);
                    res.status(201).json(pais);
                }
                catch (err) {
                    res.status(500).json({ message: err.message });
                }
                finally {
                    conn === null || conn === void 0 ? void 0 : conn.close();
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    static atualizarPais(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const objectId = new mongodb_1.ObjectId(id);
                let conn = null;
                try {
                    conn = yield (0, db_1.default)();
                    const db = conn.db();
                    const paises = db.collection("paises");
                    const qtd = yield paises.find({
                        _id: objectId // select count(_id) from pessoas where _id = ?
                    }).count();
                    if (qtd > 0) {
                        const record = req.body;
                        let pais = null;
                        try {
                            if (!record.nome) {
                                throw new Error("O atributo nome não foi informado");
                            }
                            if (!record.populacao) {
                                throw new Error("O atributo populacao não foi informado");
                            }
                            if (typeof record.nome !== "string") {
                                throw new Error("O atributo nome não é válido");
                            }
                            if (typeof record.populacao !== "number") {
                                throw new Error("O atributo populacao não é válido");
                            }
                            pais = new pais_js_1.default(record.nome, record.populacao);
                        }
                        catch (error) {
                            res.status(400).json({ message: error.message });
                            return;
                        }
                        yield paises.updateOne({
                            _id: objectId
                        }, {
                            $set: pais
                        }); // update paises set nome = '?', populacao = ? where _id = ?;
                        res.status(200).json(pais);
                    }
                    else {
                        res.status(404).json({ message: "O país não existe." });
                    }
                }
                catch (error) {
                    res.status(500).json({ message: error.message });
                }
                finally {
                    conn === null || conn === void 0 ? void 0 : conn.close();
                }
            }
            catch (error) {
                res.status(400).json({ message: "Id informado inválido" });
            }
        });
    }
    static deletarPais(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const objectId = new mongodb_1.ObjectId(id);
                let conn = null;
                try {
                    conn = yield (0, db_1.default)();
                    const db = conn.db();
                    const paises = db.collection("paises");
                    const qtd = yield paises.find({
                        _id: objectId // select count(_id) from pessoas where _id = ?
                    }).count();
                    if (qtd > 0) {
                        yield paises.deleteOne({
                            _id: objectId // delete from paises where _id = ?
                        });
                        res.status(204).send("");
                    }
                    else {
                        res.status(404).json({ message: "O país não existe." });
                    }
                }
                catch (error) {
                    res.status(500).json({ message: error.message });
                }
                finally {
                    conn === null || conn === void 0 ? void 0 : conn.close();
                }
            }
            catch (error) {
                res.status(400).json({ message: "Id informado inválido" });
            }
        });
    }
}
exports.default = PaisesController;
