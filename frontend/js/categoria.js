const URL = "http://localhost:8001";

const endPointCategoria = URL + "/category";

const listaCategorias = document.getElementById("listaCategorias");
const formulario = document.getElementById("formCategoria");
const campoId = document.getElementById("idCat");
const campoNome = document.getElementById("txtNome");

async function loadCategorias() {

    try {

        const resposta = await fetch(endPointCategoria);

        if (!resposta.ok) {

            alert("Erro ao carregar categorias");

            return;
        }

        const categorias = await resposta.json();

        listaCategorias.innerHTML = "";

        categorias.forEach(cat => {

            listaCategorias.innerHTML += `
                <tr>

                    <td>${cat.id}</td>

                    <td>${cat.nome}</td>

                    <td>

                        <button
                            class="btn btn-info">
                            Editar
                        </button>

                        <button
                            class="btn btn-danger">
                            Excluir
                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (erro) {

        console.error(erro);

    }

}

loadCategorias();

async function addCategoria(categoria) {

    try {

        const resposta = await fetch(
            endPointCategoria,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(categoria)
            }
        );

        if (resposta.ok) {

            alert("Categoria cadastrada com sucesso!");

            campoNome.value = "";

            loadCategorias();

        } else {

            alert("Erro ao cadastrar categoria");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar categoria");

    }

}

formulario.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();

        const categoria = {
            nome: campoNome.value
        };

        await addCategoria(categoria);

    }
);