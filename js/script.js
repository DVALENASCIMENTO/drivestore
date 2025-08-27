const produtos = [
    {
        nome: "carregador",
        descricao: "android",
        preco: 69.90,
        imagem: "https",
    },
    {
        nome: "carregador",
        descricao: "android",
        preco: 69.90,
        imagem: "https",
    }
];

const formatBRL = (n) =>
    n.toLocalString("pt-BR", {style: "currency", currency: "BRL" });

const grid = document.getElementById("produtos");

function montarCard(prod){
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
    <div class="image">
      <img src="${prod.imagem}" alt="${prod.nome}" loading="lazy" />
    </div>
    <h3>${prod.nome}</h3>
    <p>${prod.descricao}</p>
    <div class="price">${formatBRL(prod.preco)}</div>
    <div class="actions">
      <a class="btn" href="${prod.imagem}" target="_blank" rel="noopener">Ver imagem</a>
      <a class="btn btn-primary" href="#" data-produto="${prod.nome}" data-preco="${prod.preco}">
        Comprar no WhatsApp
      </a>
    </div>
  `;
  return card;
}

function montarGrade(){
    grid.innerHTML = "";
    produtos.forEach(p => grid.appendChild(montarCard(p)));
}

function linkWhatsApp(texto){
    const numero = window.WHATSAPP_NUMERO || "";
    const msg = encodeURIComponent(texto);
    return `https://wa.me/${numero}?text=${msg}`;
}

// Delegação de clique para botões “Comprar no WhatsApp”
document.addEventListener("click", (e) => {
  const a = e.target.closest("a.btn.btn-primary");
  if(!a) return;
  e.preventDefault();
  const nome = a.dataset.produto;
  const preco = Number(a.dataset.preco);
  const mensagem = `Olá! Tenho interesse no produto:
- ${nome}
- Preço: ${formatBRL(preco)}
Pode confirmar disponibilidade no Uber?`;
  const href = linkWhatsApp(mensagem);
  window.open(href, "_blank", "noopener");
});

montarGrade();

