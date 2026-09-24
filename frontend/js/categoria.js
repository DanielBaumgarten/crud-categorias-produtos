const URL = "http://localhost:8001";

const endPointCategoria = URL + "/category";

const listaCategorias = document.getElementById("listaCategorias");

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