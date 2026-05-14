export function criarGerenciadorTooltipAcoes() {
  let contextoTooltipAcoes = null;
  const tooltipAcoes = document.createElement("div");
  tooltipAcoes.className = "TooltipAcoes";
  tooltipAcoes.hidden = true;
  tooltipAcoes.setAttribute("role", "menu");
  tooltipAcoes.addEventListener("click", (evento) => evento.stopPropagation());
  document.body.appendChild(tooltipAcoes);

  function fecharTooltipAcoes() {
    tooltipAcoes.hidden = true;
    tooltipAcoes.innerHTML = "";
    contextoTooltipAcoes = null;
  }

  function tratarCliqueForaTooltipAcoes(evento) {
    if (tooltipAcoes.hidden) {
      return;
    }

    const alvoClique = evento.target;
    if (tooltipAcoes.contains(alvoClique)) {
      return;
    }

    if (contextoTooltipAcoes && contextoTooltipAcoes.contains(alvoClique)) {
      return;
    }

    fecharTooltipAcoes();
  }

  document.addEventListener("pointerdown", tratarCliqueForaTooltipAcoes, true);
  window.addEventListener("resize", fecharTooltipAcoes);
  window.addEventListener("scroll", fecharTooltipAcoes, true);
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      fecharTooltipAcoes();
    }
  });

  function abrirTooltipAcoes(botao, acoes) {
    if (!botao) {
      return;
    }

    const containerTooltip = botao.closest("dialog") || document.body;
    if (tooltipAcoes.parentElement !== containerTooltip) {
      containerTooltip.appendChild(tooltipAcoes);
    }

    if (!tooltipAcoes.hidden && contextoTooltipAcoes === botao) {
      fecharTooltipAcoes();
      return;
    }

    tooltipAcoes.innerHTML = "";
    acoes.forEach((acao) => {
      const botaoAcao = document.createElement("button");
      botaoAcao.type = "button";
      botaoAcao.className = "TooltipAcoesBotao";
      if (acao.classeExtra) {
        botaoAcao.classList.add(acao.classeExtra);
      }
      botaoAcao.textContent = acao.texto;
      botaoAcao.addEventListener("click", () => {
        fecharTooltipAcoes();
        acao.onClick();
      });
      tooltipAcoes.appendChild(botaoAcao);
    });

    const limiteLateral = 12;
    const deslocamento = 8;
    const retanguloBotao = botao.getBoundingClientRect();
    tooltipAcoes.hidden = false;
    const retanguloTooltip = tooltipAcoes.getBoundingClientRect();
    const esquerda = Math.min(
      retanguloBotao.right + deslocamento,
      window.innerWidth - retanguloTooltip.width - limiteLateral
    );
    const topo = Math.min(
      Math.max(retanguloBotao.top, limiteLateral),
      window.innerHeight - retanguloTooltip.height - limiteLateral
    );

    tooltipAcoes.style.left = `${Math.max(limiteLateral, esquerda)}px`;
    tooltipAcoes.style.top = `${Math.max(limiteLateral, topo)}px`;
    contextoTooltipAcoes = botao;
  }

  return { abrirTooltipAcoes, fecharTooltipAcoes };
}
