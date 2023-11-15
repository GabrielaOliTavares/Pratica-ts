import Pais from "./models/pais.js";
import { MongoClient } from "mongodb";
import database from "./db";

const paises: Pais[] = [
    new Pais("Brasil", 203062512),
    new Pais("Estados Unidos", 339987103),
    new Pais("Egito", 102334404),
    new Pais("Reino Unido", 67886011),
    new Pais("Argentina", 45195774)
];

const main = async () => {
    let conn: MongoClient | null = null;
    try {
        conn = await database.getMongoConn();
        const db = conn.db(); // devweb2
        const paisesCollection = db.collection("paises");

        // deleta todos os documentos da coleção
        // Como se fosse: delete from paises;
        await paisesCollection.deleteMany({});
        console.log("Documentos deletados");

        /*// forma verbosa
        for (let pais of paises) {
            // Como se fosse: select count(*) from paises where nome = ?;
            let qtd = await paisesCollection.find({nome: pais.nome}).count();
            if (qtd === 0) {
                await paisesCollection.insertOne(pais);
            }
        }*/

        await paisesCollection.insertMany(paises);
        console.log("Dados inseridos com sucesso!");

        const paisesFind = await paisesCollection.find().toArray();
        paisesFind.forEach((value) => {
            console.log(value)
        });

    } catch (error) {
        console.log(error);
    } finally {
        conn?.close();
    }
}

main();