import express from 'express';
import chalk from 'chalk';

import "./bootstrap/app.js"
import routes from "./routes/routes.js";
import initRelations from "./config/sequelize_relations.js";

import cors from 'cors';

/** Iniciar roteador */
const app = express();

// Permite requisições do frontend Vite (porta 5173 ou 5174)
app.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));

// middleware para garantir headers em erros
app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5174");
  res.header("Access-Control-Allow-Credentials", "true");
  next(err);
});


/** Inicializar rotas  */
app.use("/", routes);

initRelations();

const nodePort = 3000;

/** Escolher as portas baseado se foi inicializado com ou sem nginx */
const webPort = process.env.IS_CONTAINER ? 8080 : nodePort;

app.listen(nodePort, () => {
    console.log(chalk.green(`Servidor: http://localhost:${webPort}`));
    console.log(chalk.yellow(`Apis Swagger: http://localhost:${webPort}/docs`));
});