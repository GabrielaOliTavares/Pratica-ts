import { Request } from 'express';
import { Db } from "mongodb";

export default interface RequestDB extends Request {
    db: Db;
}