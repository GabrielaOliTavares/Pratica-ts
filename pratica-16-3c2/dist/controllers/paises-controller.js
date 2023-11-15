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
const paises_services_js_1 = __importDefault(require("../services/paises-services.js"));
class PaisesController {
    static buscaPaisPorPopulacao(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = req.db;
                const paisesService = new paises_services_js_1.default(db);
                let populacaoNumber;
                try {
                    const { populacao } = req.query;
                    populacaoNumber = paisesService.validarParametroPopulacao(populacao);
                }
                catch (error) {
                    const message = error.message;
                    res.status(400).json({ message });
                    return;
                }
                res.status(200).json(yield paisesService.buscarPaisesPorPopulacao(populacaoNumber));
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        });
    }
    static inserirPais(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = req.db;
                const paisesService = new paises_services_js_1.default(db);
                let pais;
                try {
                    const record = req.body;
                    pais = paisesService.validar(record);
                }
                catch (error) {
                    res.status(400).json({ message: error.message });
                    return;
                }
                yield paisesService.inserir(pais);
                res.status(201).json(pais);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    static atualizarPais(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let objectId;
            try {
                objectId = new mongodb_1.ObjectId(id);
            }
            catch (error) {
                res.status(400).json({ message: "Id informado inválido" });
                return;
            }
            try {
                const db = req.db;
                const paisesService = new paises_services_js_1.default(db);
                if (yield paisesService.existe(objectId)) {
                    let pais;
                    try {
                        const record = req.body;
                        pais = paisesService.validar(record);
                    }
                    catch (error) {
                        res.status(400).json({ message: error.message });
                        return;
                    }
                    yield paisesService.atualizar(objectId, pais);
                    res.status(200).json(pais);
                }
                else {
                    res.status(404).json({ message: "O país não existe." });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    static deletarPais(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let objectId;
            try {
                objectId = new mongodb_1.ObjectId(id);
            }
            catch (error) {
                res.status(400).json({ message: "Id informado inválido" });
                return;
            }
            try {
                const db = req.db;
                const paisesService = new paises_services_js_1.default(db);
                if (yield paisesService.existe(objectId)) {
                    yield paisesService.deletar(objectId);
                    res.status(204).send("");
                }
                else {
                    res.status(404).json({ message: "O país não existe." });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = PaisesController;
