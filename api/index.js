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

api.get("/category", (req, res) => {

    conn("categoria")
        .then(dados => {
            res.json(dados);
        })
        .catch(erro => {
            res.status(500).json(erro);
        });

});

api.get("/category/:idCat", (req, res) => {

    const id = req.params.idCat;

    conn("categoria")
        .where("id", id)
        .first()
        .then(dados => {
            res.json(dados);
        })
        .catch(erro => {
            res.status(500).json(erro);
        });

});

api.post("/category", (req, res) => {

    conn("categoria")
        .insert(req.body)
        .then(dados => {

            res.status(201).json({
                resposta: "Categoria cadastrada com sucesso",
                id: dados[0]
            });

        })
        .catch(erro => {
            res.status(500).json(erro);
        });

});

api.put("/category/:idCat", (req, res) => {

    const idCategoria = req.params.idCat;

    conn("categoria")
        .where("id", idCategoria)
        .update(req.body)
        .then(dados => {

            if (!dados) {
                return res.status(404).json({
                    resposta: "Categoria não encontrada"
                });
            }

            res.status(200).json({
                resposta: "Categoria atualizada com sucesso"
            });

        })
        .catch(erro => {
            res.status(500).json(erro);
        });

});

api.delete("/category/:idCat", (req, res) => {

    const idCategoria = req.params.idCat;

    conn("categoria")
        .where("id", idCategoria)
        .delete()
        .then(dados => {

            if (!dados) {
                return res.status(404).json({
                    resposta: "Categoria não encontrada"
                });
            }

            res.status(200).json({
                resposta: "Categoria excluída com sucesso"
            });

        })
        .catch(erro => {
            res.status(500).json(erro);
        });

});

api.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});