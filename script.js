let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let carrinhoPreco = JSON.parse(localStorage.getItem("carrinhoPreco")) || [];
let carrinhoQuantidade = JSON.parse(localStorage.getItem("carrinhoQuantidade")) || [];

function adicionarCarrinho(produto, price) {
    carrinho.push(produto);
    carrinhoPreco.push(price);
    carrinhoQuantidade.push(1);
    console.log("adicionado");
    atualizarCarrinho();
}

function setPopup(produto) {

    let carrinhoPage = document.querySelector(".carrinho-page");

    if (carrinhoPage.hidden) {
        adicionarCarrinho(produto.item, produto.price);
    }

    carrinhoPage.hidden = !carrinhoPage.hidden;

}

function setCarrinhoPage() {

    let carrinhoPage = document.querySelector(".carrinho-page");
    carrinhoPage.hidden = !carrinhoPage.hidden;

}   

function clicked() {
    document.querySelectorAll(".content-row[hidden]").forEach(function (linha) {
        linha.hidden = false;
    });
    document.querySelector(".read-more").hidden = true;
}

function atualizarRelogio() {
    const agora = new Date();
    const data = agora.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
    const hora = agora.toLocaleTimeString("pt-BR");
    document.getElementById("relogio").textContent = data + " - " + hora;
}

atualizarRelogio();
setInterval(atualizarRelogio, 1000);

function atualizarLinkCarrinho() {
    document.getElementById("link-carrinho").textContent = "Carrinho (" + carrinho.length + ")"
}

function removerItem(id) {
    carrinho.splice(id, 1);
    carrinhoPreco.splice(id, 1);
    carrinhoQuantidade.splice(id, 1);
    console.log("removido")
    atualizarCarrinho();
}

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function atualizarCarrinho() {
    let carrinhoElement = document.getElementById("carrinhoList");
    carrinhoElement.replaceChildren("");
    carrinho.forEach((item, index) => {

        let iLista = document.createElement("li")
        let quantidadeItem = document.createElement("input")
        let nomeItem = document.createElement("p")
        let textPreco = document.createElement("p")
        let remove = document.createElement("button")

        remove.addEventListener('click', function(event) {
            removerItem(index);
        });

        quantidadeItem.addEventListener('change', function(event) {
            carrinhoQuantidade[index] = Math.max(1, Number(quantidadeItem.value));
            atualizarCarrinho();
        });

        quantidadeItem.type = "number";
        quantidadeItem.min = 1;
        quantidadeItem.value = carrinhoQuantidade[index]
        remove.textContent = "🗑️"
        nomeItem.textContent = item;
        textPreco.textContent = formatarPreco(carrinhoQuantidade[index] * carrinhoPreco[index]);


        iLista.appendChild(quantidadeItem)
        iLista.appendChild(nomeItem);
        iLista.appendChild(textPreco);
        iLista.appendChild(remove)
        carrinhoElement.appendChild(iLista);
    })
    let total = 0;
    for (let i = 0; i < carrinhoPreco.length; i++) {
        total += carrinhoPreco[i] * carrinhoQuantidade[i];
    }
    document.getElementById("carrinhoTotal").textContent = "Total: " + formatarPreco(total);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    localStorage.setItem("carrinhoPreco", JSON.stringify(carrinhoPreco));
    localStorage.setItem("carrinhoQuantidade", JSON.stringify(carrinhoQuantidade));

    atualizarLinkCarrinho();
    //console.log(carrinhoPreco)
}

atualizarCarrinho();

function comprar() {

    let pagamento = document.querySelector("input[name='pagamento']:checked");

    if (carrinho.length == 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    if (!pagamento) {
        alert("Selecione um método de pagamento.");
        return;
    }

    carrinho = [];
    carrinhoPreco = [];
    carrinhoQuantidade = [];
    atualizarCarrinho();

    document.getElementById("pagamento-escolhido").textContent = "Pagamento: " + pagamento.value;
    pagamento.checked = false;

    setCarrinhoPage();
    document.querySelector(".carrinho-popup").hidden = false;

}

function fecharPopup() {
    document.querySelector(".carrinho-popup").hidden = true;
}

function alternarTema() {
    document.documentElement.classList.toggle("escuro");
}

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    alternarTema();
}
