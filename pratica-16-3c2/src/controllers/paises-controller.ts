import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Pais from "../models/pais.js";
import PaisesService from "../services/paises-services.js";
import RequestDB from "../models/request-db";

export default class PaisesController {

    static async buscaPaisPorPopulacao(req: Request, res: Response) {
        try {
            const db = (req as RequestDB).db;
            const paisesService = new PaisesService(db);
            let populacaoNumber: number;

            try {
                const { populacao } = req.query;
                populacaoNumber = paisesService.validarParametroPopulacao(populacao);
            } catch (error) {
                const message = (error as Error).message;
                res.status(400).json({ message });
                return;
            }

            res.status(200).json(await paisesService.buscarPaisesPorPopulacao(populacaoNumber));

        } catch (err) {
            res.status(500).json((err as Error).message);
        }
    }

    static async inserirPais(req: Request, res: Response) {

        try {

            const db = (req as RequestDB).db;
            const paisesService = new PaisesService(db);

            let pais: Pais;
            try {
                const record = req.body;
                pais = paisesService.validar(record);
            } catch (error) {
                res.status(400).json({ message: (error as Error).message });
                return;
            }

            await paisesService.inserir(pais);
            res.status(201).json(pais);
        } catch (err) {
            res.status(500).json({ message: (err as Error).message });
        }

    }

    static async atualizarPais(req: Request, res: Response) {
        const id = req.params.id;

        let objectId: ObjectId;
        try {
            objectId = new ObjectId(id);
        } catch (error) {
            res.status(400).json({ message: "Id informado inválido" });
            return;
        }

        try {
            const db = (req as RequestDB).db;
            const paisesService = new PaisesService(db);

            if (await paisesService.existe(objectId)) {
                let pais: Pais;
                try {
                    const record = req.body;
                    pais = paisesService.validar(record);
                } catch (error) {
                    res.status(400).json({ message: (error as Error).message });
                    return;
                }

                await paisesService.atualizar(objectId, pais);
                res.status(200).json(pais);

            } else {
                res.status(404).json({ message: "O país não existe." });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    static async deletarPais(req: Request, res: Response) {
        const id = req.params.id;
        let objectId: ObjectId;
        try {
            objectId = new ObjectId(id);
        } catch (error) {
            res.status(400).json({ message: "Id informado inválido" });
            return;
        }

        try {
            const db = (req as RequestDB).db;
            const paisesService = new PaisesService(db);
            if (await paisesService.existe(objectId)) {
                await paisesService.deletar(objectId);
                res.status(204).send("");
            } else {
                res.status(404).json({ message: "O país não existe." });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

}