const URL = "http://localhost:8001";

const endPointProduto = URL + "/product";
const endPointCategoria = URL + "/category";

const listaProdutos = document.getElementById("listaProdutos");

const formulario = document.getElementById("formProduto");

const campoId = document.getElementById("idProd");
const campoNome = document.getElementById("txtNomeProd");
const campoPreco = document.getElementById("txtPreco");
const cmbCategoria = document.getElementById("cmbCategoria");

async function loadComboCategorias() {

    try {

        const resposta = await fetch(
            endPointCategoria
        );

        if (!resposta.ok) {
            throw new Error("Erro ao carregar categorias");
        }

        const categorias = await resposta.json();

        cmbCategoria.innerHTML = "";

        categorias.forEach(cat => {

            cmbCategoria.innerHTML += `
                <option value="${cat.id}">
                    ${cat.nome}
                </option>
            `;

        });

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar categorias");

    }

}

loadComboCategorias();

async function loadProdutos() {

    try {

        const resposta = await fetch(
            endPointProduto
        );

        if (!resposta.ok) {
            throw new Error("Erro ao carregar produtos");
        }

        const produtos = await resposta.json();

        listaProdutos.innerHTML = "";

        produtos.forEach(prod => {

            listaProdutos.innerHTML += `
                <tr>

                    <td>${prod.id}</td>

                    <td>${prod.nome}</td>

                    <td>R$ ${prod.preco}</td>

                    <td>${prod.cat}</td>

                    <td>

                        <button
                            class="btn btn-info"
                            onclick="preencherFormProduto(
                            '${prod.id}',
                            '${prod.nome}',
                            '${prod.preco}',
                            '${prod.codCategoria}'
                            )">
                            Editar
                        </button>

                        <button
                            class="btn btn-danger"
                            onclick="excluirProduto(${prod.id})">
                            Excluir
                        </button>
                    </td>

                </tr>
            `;

        });

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar produtos");

    }

}

loadComboCategorias();
loadProdutos();

async function addProduto(produto) {

    try {

        const resposta = await fetch(
            endPointProduto,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            }
        );

        if (resposta.ok) {

            alert("Produto cadastrado com sucesso!");

            campoNome.value = "";
            campoPreco.value = "";

            loadProdutos();

        } else {

            alert("Erro ao cadastrar produto");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar produto");

    }

}

async function editarProduto(idProd, produto) {

    try {

        const resposta = await fetch(
            `${endPointProduto}/${idProd}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            }
        );

        if (resposta.ok) {

            alert("Produto atualizado com sucesso!");

            campoId.value = "";
            campoNome.value = "";
            campoPreco.value = "";

            loadProdutos();

        } else {

            alert("Erro ao atualizar produto");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao atualizar produto");

    }

}

formulario.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();

        const idProd = campoId.value;

        const produto = {

            nome: campoNome.value,

            preco: parseFloat(
                campoPreco.value
            ),

            codCategoria: parseInt(
                cmbCategoria.value
            )

        };

        if (idProd) {

            await editarProduto(
                idProd,
                produto
            );

        } else {

            await addProduto(
                produto
            );

        }

    }
);

async function excluirProduto(id) {

    const confirma = confirm(
        "Confirma a exclusão deste produto?"
    );

    if (!confirma) {
        return;
    }

    try {

        const resposta = await fetch(
            `${endPointProduto}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (resposta.ok) {

            alert("Produto excluído com sucesso!");

            loadProdutos();

        } else {

            alert("Erro ao excluir produto");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao excluir produto");

    }

}

function preencherFormProduto(
    idProd,
    nomeProd,
    precoProd,
    categoriaProd
) {

    campoId.value = idProd;

    campoNome.value = nomeProd;

    campoPreco.value = precoProd;

    cmbCategoria.value = categoriaProd;

}