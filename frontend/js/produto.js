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

formulario.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();

        const produto = {

            nome: campoNome.value,

            preco: parseFloat(
                campoPreco.value
            ),

            codCategoria: parseInt(
                cmbCategoria.value
            )

        };

        await addProduto(produto);

    }
);