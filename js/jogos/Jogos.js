import { CHAVE_JOGOS } from "../shared/chavesArmazenamento.js";
import { lerArquivoComoDataUrl } from "../shared/arquivos.js";
import { abrirJanela, fecharJanela } from "../shared/modais.js";
import {
  definirMensagemCampo,
  limparMensagemCampo,
  validarLimiteCaracteres
} from "../shared/validacaoFormulario.js";
import { salvarJogos as persistirJogos } from "./modules/jogosPersistencia.js";
import { calcularPercentualConclusao, formatarPercentual } from "../trofeus/modules/trofeusCalculos.js";

export function initJogos({
  estado,
  refs,
  tooltip,
  exclusao,
  renderizarTrofeus
}) {
  const {
    listaJogos,
    campoPesquisaJogos,
    janelaAdicionarJogo,
    janelaEditarJogo,
    janelaTrofeus,
    formAdicionarJogo,
    formEditarJogo,
    campoNomeNovoJogo,
    campoImagemNovoJogo,
    campoNomeEditarJogo,
    campoImagemEditarJogo,
    mensagemNomeNovoJogo,
    mensagemImagemNovoJogo,
    mensagemNomeEditarJogo,
    tituloJanelaTrofeus,
    botaoAbrirEditarJogo,
    botaoRemoverJogoModal
  } = refs;

  const { abrirTooltipAcoes, fecharTooltipAcoes } = tooltip;
  const { abrirConfirmacaoExclusao } = exclusao;

  function salvarJogos() {
    persistirJogos(CHAVE_JOGOS, estado.jogos);
  }

  function renderizarJogos() {
    listaJogos.innerHTML = "";

    const filtro = campoPesquisaJogos.value.trim().toLowerCase();
    let algumVisivel = false;

    estado.jogos.forEach((jogo, indiceJogo) => {
      if (filtro && !jogo.nome.toLowerCase().includes(filtro)) {
        return;
      }

      algumVisivel = true;
      const percentual = calcularPercentualConclusao(jogo.trofeus);
      const cartaoJogo = document.createElement("article");
      cartaoJogo.className = "CartaoJogo";
      cartaoJogo.tabIndex = 0;
      cartaoJogo.setAttribute("role", "button");
      cartaoJogo.setAttribute("aria-label", `Abrir troféus do jogo ${jogo.nome}`);

      cartaoJogo.innerHTML = `
        <button
          class="BotaoMenuCard"
          type="button"
          aria-label="Abrir ações do jogo ${jogo.nome}"
        >
          <i class="bi bi-three-dots"></i>
        </button>
        <img class="ImagemJogo" src="${jogo.imagem}" alt="Capa do jogo ${jogo.nome}" />
        <div class="InfoJogo">
          <h2 class="NomeJogo">${jogo.nome}</h2>
          <div class="AreaTrofeusJogo">
            <span class="BotaoTrofeus">
              <i class="bi bi-trophy-fill"></i>
              Troféus
            </span>
            <div class="BarraProgresso" aria-label="Progresso dos troféus">
              <div class="PreenchimentoProgresso" style="width: ${percentual}%"></div>
              <span class="TextoProgresso">${formatarPercentual(percentual)}</span>
            </div>
          </div>
        </div>
      `;

      const botaoMenuJogo = cartaoJogo.querySelector(".BotaoMenuCard");
      botaoMenuJogo.addEventListener("click", (evento) => {
        evento.stopPropagation();
        abrirAcoesJogo(indiceJogo, evento.currentTarget);
      });
      cartaoJogo.addEventListener("click", () => abrirTrofeus(indiceJogo));
      cartaoJogo.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          abrirTrofeus(indiceJogo);
        }
      });

      listaJogos.appendChild(cartaoJogo);
    });

    if (!algumVisivel && filtro) {
      const estadoVazio = document.createElement("p");
      estadoVazio.className = "EstadoVazio";
      estadoVazio.textContent = "Nenhum jogo encontrado.";
      listaJogos.appendChild(estadoVazio);
    }
  }

  function abrirEditarJogo(indiceJogo) {
    estado.indiceJogoSelecionado = indiceJogo;
    campoNomeEditarJogo.value = estado.jogos[indiceJogo].nome;
    campoImagemEditarJogo.value = "";
    validarLimiteCaracteres(campoNomeEditarJogo, mensagemNomeEditarJogo, 25);
    abrirJanela(janelaEditarJogo);
  }

  function abrirAcoesJogo(indiceJogo, botaoOrigem) {
    estado.indiceJogoAcoes = indiceJogo;
    abrirTooltipAcoes(botaoOrigem, [
      {
        texto: "Editar",
        onClick: () => abrirEditarJogo(indiceJogo)
      },
      {
        texto: "Remover",
        classeExtra: "TooltipAcoesBotaoRemover",
        onClick: () => solicitarConfirmacaoRemocaoJogo(indiceJogo)
      }
    ]);
  }

  function fecharAcoesJogo() {
    estado.indiceJogoAcoes = null;
    fecharTooltipAcoes();
  }

  function abrirEditarJogoPorAcoes() {
    if (estado.indiceJogoAcoes === null) {
      return;
    }

    const indiceJogo = estado.indiceJogoAcoes;
    fecharAcoesJogo();
    abrirEditarJogo(indiceJogo);
  }

  function removerJogoPorAcoes() {
    if (estado.indiceJogoAcoes === null) {
      return;
    }

    const indiceJogo = estado.indiceJogoAcoes;
    fecharAcoesJogo();
    solicitarConfirmacaoRemocaoJogo(indiceJogo);
  }

  function abrirTrofeus(indiceJogo) {
    estado.indiceJogoSelecionado = indiceJogo;
    tituloJanelaTrofeus.textContent = `Troféus - ${estado.jogos[indiceJogo].nome}`;
    renderizarTrofeus();
    abrirJanela(janelaTrofeus);
  }

  function solicitarConfirmacaoRemocaoJogo(indiceJogo) {
    const jogo = estado.jogos[indiceJogo];
    if (!jogo) {
      return;
    }

    abrirConfirmacaoExclusao({
      titulo: "Excluir jogo",
      mensagem: `Deseja excluir o jogo "${jogo.nome}"? Esta ação não poderá ser desfeita.`,
      onConfirmar: () => removerJogo(indiceJogo)
    });
  }

  function removerJogo(indiceJogo) {
    estado.jogos.splice(indiceJogo, 1);
    salvarJogos();
    renderizarJogos();
    estado.indiceJogoAcoes = null;

    if (estado.indiceJogoSelecionado === indiceJogo) {
      estado.indiceJogoSelecionado = null;
      fecharJanela(janelaTrofeus);
      fecharJanela(janelaEditarJogo);
    } else if (
      estado.indiceJogoSelecionado !== null &&
      estado.indiceJogoSelecionado > indiceJogo
    ) {
      estado.indiceJogoSelecionado -= 1;
    }
  }

  document
    .getElementById("botaoAbrirAdicionarJogo")
    .addEventListener("click", () => {
      limparMensagemCampo(mensagemNomeNovoJogo);
      limparMensagemCampo(mensagemImagemNovoJogo);
      abrirJanela(janelaAdicionarJogo);
    });

  document
    .getElementById("botaoFecharAdicionarJogo")
    .addEventListener("click", () => fecharJanela(janelaAdicionarJogo));
  document
    .getElementById("botaoFecharEditarJogo")
    .addEventListener("click", () => fecharJanela(janelaEditarJogo));
  document
    .getElementById("botaoFecharAcoesJogo")
    .addEventListener("click", fecharAcoesJogo);
  document
    .getElementById("botaoFecharTrofeus")
    .addEventListener("click", () => fecharJanela(janelaTrofeus));

  campoPesquisaJogos.addEventListener("input", renderizarJogos);
  botaoAbrirEditarJogo.addEventListener("click", abrirEditarJogoPorAcoes);
  botaoRemoverJogoModal.addEventListener("click", removerJogoPorAcoes);
  campoNomeNovoJogo.addEventListener("input", () =>
    validarLimiteCaracteres(campoNomeNovoJogo, mensagemNomeNovoJogo, 25)
  );
  campoImagemNovoJogo.addEventListener("change", () =>
    limparMensagemCampo(mensagemImagemNovoJogo)
  );
  campoNomeEditarJogo.addEventListener("input", () =>
    validarLimiteCaracteres(campoNomeEditarJogo, mensagemNomeEditarJogo, 25)
  );

  formAdicionarJogo.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = campoNomeNovoJogo.value.trim().slice(0, 25);
    const arquivoImagem = campoImagemNovoJogo.files[0];
    let formularioValido = true;

    if (!nome) {
      definirMensagemCampo(
        mensagemNomeNovoJogo,
        "Informe o nome do jogo.",
        true
      );
      formularioValido = false;
    }

    if (!arquivoImagem) {
      definirMensagemCampo(
        mensagemImagemNovoJogo,
        "Selecione uma imagem para o jogo.",
        true
      );
      formularioValido = false;
    }

    if (!formularioValido) {
      return;
    }

    const imagem = await lerArquivoComoDataUrl(arquivoImagem);

    estado.jogos.push({
      nome,
      imagem,
      trofeus: []
    });

    salvarJogos();
    renderizarJogos();
    formAdicionarJogo.reset();
    limparMensagemCampo(mensagemNomeNovoJogo);
    limparMensagemCampo(mensagemImagemNovoJogo);
    fecharJanela(janelaAdicionarJogo);
  });

  formEditarJogo.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (estado.indiceJogoSelecionado === null) {
      return;
    }

    const jogo = estado.jogos[estado.indiceJogoSelecionado];
    const novoNome = campoNomeEditarJogo.value.trim().slice(0, 25);
    const novaImagem = campoImagemEditarJogo.files[0];

    if (novoNome) {
      jogo.nome = novoNome;
    }

    if (novaImagem) {
      jogo.imagem = await lerArquivoComoDataUrl(novaImagem);
    }

    salvarJogos();
    renderizarJogos();
    renderizarTrofeus();
    formEditarJogo.reset();
    fecharJanela(janelaEditarJogo);
  });

  return { renderizarJogos };
}
