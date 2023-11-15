import { Db, ObjectId } from "mongodb";
import Pais from "../models/pais.js";

export default class PaisesService {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    validarParametroPopulacao(populacao: any): number {
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

    buscarPaisesPorPopulacao(populacao: number): Promise<Document[]> {
        const paises = this.db.collection("paises");
        // semelhante: select * from paises where populacao >= ?;
        return paises.find({
            populacao: { $gte: populacao }
        }).toArray();
    }

    validar(record: any): Pais {
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
        return new Pais(record.nome, record.populacao);
    }

    async inserir(pais: Pais) {
        const paises = this.db.collection("paises");
        await paises.insertOne(pais);
    }

    async existe(objectId: ObjectId): Promise<boolean> {
        const paises = this.db.collection("paises");
        const qtd = await paises.find({
            _id: objectId // select count(_id) from pessoas where _id = ?
        }).count();
        return (qtd > 0);
    }

    async atualizar(objectId: ObjectId, pais: Pais) {
        const paises = this.db.collection("paises");
        await paises.updateOne({
            _id: objectId
        }, {
            $set: pais
        }); // update paises set nome = '?', populacao = ? where _id = ?;
    }

    async deletar(objectId: ObjectId) {
        const paises = this.db.collection("paises");
        await paises.deleteOne({
            _id: objectId // delete from paises where _id = ?
        });
    }

}