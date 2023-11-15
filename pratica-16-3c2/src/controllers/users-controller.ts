import { Request, Response } from 'express';
import RequestDB from "../models/request-db";
import jwt from "jsonwebtoken";
import { NextFunction } from 'express';

const SECRET = "COTEMIG2023";

export default class UsersController {

    static async login(req: Request, res: Response) {

        const record = req.body;
        try {
            if (
                typeof record.username === "undefined" ||
                typeof record.password === "undefined" ||
                typeof record.username !== "string" ||
                typeof record.password !== "string"
            ) {
                throw new Error("Usuário ou Senha não foi informado ou é inválido");
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message })
            return;
        }

        try {
            const db = (req as RequestDB).db;
            const users = db.collection("users");

            if (await users.find({username: record.username, password: record.password}).count() === 0) {
                res.status(404).json({message: "Usuário ou Senha inválido"});
                return;
            }

            const token = jwt.sign({username: record.username}, SECRET);
            res.status(200).json({token});
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }

    }

    static auth(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;
        if (typeof authorization !== "string") {
            res.status(401).json({message: "O token não foi informado"});
            return;
        }
        const authorizationArray = authorization.split(" ");
        if (authorizationArray.length !== 2 && authorizationArray[1] === "") {
            res.status(401).json({message: "O cabeçalho autorization está inválido"});
            return;
        }

        try {
            jwt.verify(authorizationArray[1], SECRET);
            next();
        } catch(error) {
            res.status(401).json({message: "O token é inválido"});
            return;
        }

    }

}

//npm install jsonwebtoken
//npm install @types/jsonwebtoken -D