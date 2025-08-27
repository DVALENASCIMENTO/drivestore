// Catálogo (exemplo). Substitua imagem pelos seus arquivos/links.
const produtos = [
  {
    nome: "Carregador Turbo USB-C 20W",
    descricao: "Compatível iPhone/Android. Proteção contra sobrecarga.",
    preco: 69.90,
    imagem: "https://via.placeholder.com/400x300?text=Carregador"
  },
  {
    nome: "Fone Bluetooth TWS",
    descricao: "Cápsula touch, case com recarga. Até 4h de uso.",
    preco: 129.90,
    imagem: "https://via.placeholder.com/400x300?text=Fone+TWS"
  },
  {
    nome: "Cabo Nylon USB-C 1m",
    descricao: "Reforçado, alta durabilidade, suporte a carga rápida.",
    preco: 29.90,
    imagem: "https://via.placeholder.com/400x300?text=Cabo+USB-C"
  },
  {
    nome: "Mouse Sem Fio",
    descricao: "Ergonômico, 1600 DPI, receptor 2.4GHz.",
    preco: 79.90,
    imagem: "https://via.placeholder.com/400x300?text=Mouse"
  },
  {
    nome: "Suporte Veicular Magnético",
    descricao: "Fixação forte no painel, base metálica inclusa.",
    preco: 39.90,
    imagem: "https://via.placeholder.com/400x300?text=Suporte"
  },
  {
    nome: "Teclado Slim USB",
    descricao: "Layout ABNT2, digitação confortável, plug-and-play.",
    preco: 89.90,
    imagem: "https://via.placeholder.com/400x300?text=Teclado"
  }
];

const formatBRL = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Monta cards
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
