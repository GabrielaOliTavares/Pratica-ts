import express, { Request, Response } from "express";
import PaisController from "../controllers/paises-controller.js";
import UsersController from "../controllers/users-controller.js";

const paisesRouter = express.Router();

paisesRouter.get("/", UsersController.auth, PaisController.buscaPaisPorPopulacao);
paisesRouter.post("/", UsersController.auth, PaisController.inserirPais);
paisesRouter.put("/:id", UsersController.auth, PaisController.atualizarPais);
paisesRouter.delete("/:id", UsersController.auth, PaisController.deletarPais);

export default paisesRouter;