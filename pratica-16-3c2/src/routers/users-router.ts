import express from "express";
import UsersController from "../controllers/users-controller";

const usersRouter = express.Router();

usersRouter.post("/login", UsersController.login);

export default usersRouter;