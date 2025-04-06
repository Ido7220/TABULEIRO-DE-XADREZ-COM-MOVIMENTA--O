const tabuleiro = document.getElementById("tabuleiro");
let selecionada = null;

// Mapeamento inicial das peças (apenas símbolos do Font Awesome)
const pecasIniciais = [
  ["fa-chess-rook", "fa-chess-knight", "fa-chess-bishop", "fa-chess-king", "fa-chess-queen", "fa-chess-bishop", "fa-chess-knight", "fa-chess-rook"],
  Array(8).fill("fa-chess-pawn"),
  Array(8).fill(""),
  Array(8).fill(""),
  Array(8).fill(""),
  Array(8).fill(""),
  Array(8).fill("fa-chess-pawn"),
  ["fa-chess-rook", "fa-chess-knight", "fa-chess-bishop", "fa-chess-king", "fa-chess-queen", "fa-chess-bishop", "fa-chess-knight", "fa-chess-rook"]
];

const cores = [ // Cores alternadas das casas
  ["square-d", "square"],
  ["square", "square-d"]
];

function criarTabuleiro() {
  tabuleiro.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const linha = document.createElement("div");
    linha.classList.add("linha");

    for (let j = 0; j < 8; j++) {
      const casa = document.createElement("div");
      casa.classList.add(cores[(i + j) % 2][0]);
      casa.dataset.linha = i;
      casa.dataset.coluna = j;

      const peca = pecasIniciais[i][j];
      if (peca) {
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", peca);
        icon.classList.add(i < 2 ? "branco" : "preto");
        casa.appendChild(icon);
      }

      casa.addEventListener("click", () => selecionarOuMover(casa));

      linha.appendChild(casa);
    }

    tabuleiro.appendChild(linha);
  }
}

function selecionarOuMover(casa) {
  if (selecionada) {
    // Tentando mover
    if (!casa.querySelector("i")) {
      casa.appendChild(selecionada);
      limparSelecao();
    } else {
      // Nova seleção (trocando peça)
      limparSelecao();
      selecionarCasa(casa);
    }
  } else if (casa.querySelector("i")) {
    selecionarCasa(casa);
  }
}

function selecionarCasa(casa) {
  selecionada = casa.querySelector("i");
  casa.classList.add("selecionado");
}

function limparSelecao() {
  document.querySelectorAll(".selecionado").forEach(el => el.classList.remove("selecionado"));
  selecionada = null;
}

criarTabuleiro();
