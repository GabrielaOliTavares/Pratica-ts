import express from "express";
import cors from "cors";
import routers from "./routers";
import database from "./db";

const main = async () => {

    const port = 3000;
    const app = express();

    // middlewares
    app.use(cors());
    app.use(express.json());
    await database.injectDBInApp(app);

    // rotas
    app.use("/paises", routers.paisesRouter);
    app.use("/users", routers.usersRouter);

    // subir o servidor
    app.listen(port, () => {
        console.log(`Servidor sendo executado na porta ${port}`);
    });

}

main();