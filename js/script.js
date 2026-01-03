// Catálogo de produtos
const produtos = [
  {
    nome: "Carregador Rápido USB-C",
    descricao: "Carregador rápido α’GOLD CA36-4, com 3 portas USB, 5.1A",
    preco: 29.90,
    imagem: "/image/carregador.jpeg"
  },
  {
    nome: "Fone de Ouvido",
    descricao: "Fone de ouvido estéreo *LEHENG* modelo *LE-024I*, com fio, design intra-auricular, som Hi-Fi e microfone integrado para chamadas, cores diversas.",
    preco: 11.90,
    imagem: "/image/fones.jpg"
  },
  {
    nome: "Cabo IOS USB-C",
    descricao: "Cabo para Iphone Ipad Lightining Inova 2.4A Cbo-6313 cores diversas Emborrachado - 1.2mt",
    preco: 14.90,
    imagem: "/image/cabo_ios.jpg"
  },
  {
    nome: "Cabo USB-C",
    descricao: "Cabo Tipo C para Android USB-A Inova 2.4A CBO-6312 cores diversas Emborrachado – 1.2 mt",
    preco: 14.90,
    imagem: "/image/cabo_tipo_c.jpg"
  },
];

// Função para formatar preços em BRL
const formatBRL = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Container dos produtos
const grid = document.getElementById("produtos");

// Monta um card de produto
function montarCard(prod) {
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

// Renderiza a grade de produtos
function montarGrade() {
  grid.innerHTML = "";
  produtos.forEach(p => grid.appendChild(montarCard(p)));
}

// Monta link para o WhatsApp usando número global
function linkWhatsApp(texto) {
  const numero = window.WHATSAPP_NUMERO || "";
  const msg = encodeURIComponent(texto);
  return `https://wa.me/${numero}?text=${msg}`;
}

// Captura clique nos botões "Comprar no WhatsApp"
document.addEventListener("click", (e) => {
  const a = e.target.closest("a.btn.btn-primary");
  if (!a) return;
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

// Inicializa catálogo
montarGrade();
