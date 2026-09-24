const express = require("express");
const knex = require("knex");
const cors = require("cors");

const PORT = 8001;

const api = express();

api.use(cors());
api.use(express.json());

const conn = knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "loja_26_1"
    }
});

api.get("/", (req, res) => {
    res.json({
        mensagem: "API funcionando!"
    });
});

api.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});