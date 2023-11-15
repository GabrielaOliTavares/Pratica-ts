// importa a classe MongoClient
import { MongoClient } from "mongodb";
import { Request, Response, NextFunction } from 'express';
import RequestDB from "../models/request-db.js";

// Cria a string de conexão
const uri = "mongodb://admin:admin@127.0.0.1:27017/devweb2";

// Retorna uma conexão ativa
const getMongoConn = async (): Promise<MongoClient> => {

    try {
        const client = new MongoClient(uri); // Cria objeto da conexão
        const conn = await client.connect(); // Conecta na instância

        process.on("SIGINT", () => {
            conn.close();
            console.log("Conexão encerrada com sucesso!");
            process.exit(0);
        });

        return conn; // Retorna a conexão
    } catch (error) {
        console.log("Erro na conexão com o banco de dados");
        process.exit(1);
    }

}

const injectDBInApp = async (app: any) => {
    const conn = await getMongoConn();
    app.use((req: Request, res: Response, next: NextFunction) => {
        (req as RequestDB).db = conn.db();
        next();
    });
}

// Exporta a função de conexão
export default { getMongoConn, injectDBInApp };
