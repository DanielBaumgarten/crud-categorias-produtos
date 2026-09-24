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
                            class="btn btn-info"
                            onclick="preencherForm('${cat.id}', '${cat.nome}')">
                            Editar
                        </button>

                        <button
                            class="btn btn-danger"
                            onclick="excluirCategoria(${cat.id})">
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

async function editarCategoria(idCat, categoria) {

    try {

        const resposta = await fetch(
            `${endPointCategoria}/${idCat}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(categoria)
            }
        );

        if (resposta.ok) {

            alert("Categoria atualizada com sucesso!");

            campoId.value = "";
            campoNome.value = "";

            loadCategorias();

        } else {

            alert("Erro ao atualizar categoria");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao atualizar categoria");

    }

}

formulario.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();

        const idCat = campoId.value;

        const categoria = {
            nome: campoNome.value
        };

        if (idCat) {

            await editarCategoria(idCat, categoria);

        } else {

            await addCategoria(categoria);

        }

    }
);

async function excluirCategoria(id) {

    const confirma = confirm(
        "Confirma a exclusão desta categoria?"
    );

    if (!confirma) {
        return;
    }

    try {

        const resposta = await fetch(
            `${endPointCategoria}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (resposta.ok) {

            alert("Categoria excluída com sucesso!");

            loadCategorias();

        } else {

            alert("Erro ao excluir categoria");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao excluir categoria");

    }

}

function preencherForm(idCat, nomeCat) {

    campoId.value = idCat;

    campoNome.value = nomeCat;

}