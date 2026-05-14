import { lerArquivoComoDataUrl } from "../shared/arquivos.js";
import { abrirJanela, fecharJanela } from "../shared/modais.js";
import {
  definirMensagemCampo,
  limparMensagemCampo
} from "../shared/validacaoFormulario.js";
import { CHAVE_JOGOS } from "../shared/chavesArmazenamento.js";
import { salvarJogos as persistirJogos } from "../jogos/modules/jogosPersistencia.js";

export function initTrofeus({
  estado,
  refs,
  tooltip,
  exclusao,
  renderizarJogos
}) {
  const {
    listaTrofeus,
    janelaTrofeus,
    janelaAdicionarTrofeu,
    janelaEditarTrofeu,
    formAdicionarTrofeu,
    formEditarTrofeu,
    campoNomeTrofeu,
    campoImagemTrofeu,
    campoDescricaoTrofeu,
    campoNomeEditarTrofeu,
    campoImagemEditarTrofeu,
    campoDescricaoEditarTrofeu,
    mensagemNomeTrofeu,
    mensagemImagemTrofeu,
    mensagemDescricaoTrofeu,
    mensagemNomeEditarTrofeu,
    mensagemDescricaoEditarTrofeu,
    botaoAbrirEditarTrofeu,
    botaoRemoverTrofeuModal
  } = refs;

  const { abrirTooltipAcoes, fecharTooltipAcoes } = tooltip;
  const { abrirConfirmacaoExclusao } = exclusao;

  function salvarJogos() {
    persistirJogos(CHAVE_JOGOS, estado.jogos);
  }

  function renderizarTrofeus() {
    listaTrofeus.innerHTML = "";

    if (estado.indiceJogoSelecionado === null) {
      return;
    }

    const trofeus = estado.jogos[estado.indiceJogoSelecionado].trofeus;

    if (trofeus.length === 0) {
      const estadoVazio = document.createElement("p");
      estadoVazio.className = "EstadoVazio";
      estadoVazio.textContent = "Este jogo ainda não possui troféus cadastrados.";
      listaTrofeus.appendChild(estadoVazio);
      return;
    }

    trofeus.forEach((trofeu, indiceTrofeu) => {
      const cartaoTrofeu = document.createElement("article");
      cartaoTrofeu.className = "CartaoTrofeu";

      const idMarcacao = `trofeu${estado.indiceJogoSelecionado}${indiceTrofeu}`;

      cartaoTrofeu.innerHTML = `
        <button
          class="BotaoMenuCard BotaoMenuTrofeu"
          type="button"
          aria-label="Abrir ações do troféu ${trofeu.nome}"
        >
          <i class="bi bi-three-dots"></i>
        </button>
        <img class="ImagemTrofeu" src="${trofeu.imagem}" alt="Imagem do troféu ${trofeu.nome}" />
        <div class="InfoTrofeu">
          <h3 class="NomeTrofeu">${trofeu.nome}</h3>
          <p class="DescricaoTrofeu">${trofeu.descricao}</p>
        </div>
        <div class="AreaConclusaoTrofeu">
          <label class="RotuloConclusao" for="${idMarcacao}">
            <input id="${idMarcacao}" type="checkbox" ${trofeu.concluido ? "checked" : ""} />
            <span class="CaixaMarcacao">
              <i class="bi bi-check-lg"></i>
            </span>
            <span class="TextoConclusao">Concluído</span>
          </label>
        </div>
      `;

      const campoMarcacao = cartaoTrofeu.querySelector("input");
      const botaoMenuTrofeu = cartaoTrofeu.querySelector(".BotaoMenuTrofeu");
      campoMarcacao.addEventListener("change", () => {
        trofeus[indiceTrofeu].concluido = campoMarcacao.checked;
        salvarJogos();
        renderizarJogos();
      });
      botaoMenuTrofeu.addEventListener("click", (evento) =>
        abrirAcoesTrofeu(indiceTrofeu, evento.currentTarget)
      );

      listaTrofeus.appendChild(cartaoTrofeu);
    });
  }

  function abrirAdicionarTrofeu() {
    if (estado.indiceJogoSelecionado === null) {
      return;
    }

    formAdicionarTrofeu.reset();
    campoNomeTrofeu.setCustomValidity("");
    campoImagemTrofeu.setCustomValidity("");
    campoDescricaoTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeTrofeu);
    limparMensagemCampo(mensagemImagemTrofeu);
    limparMensagemCampo(mensagemDescricaoTrofeu);
    abrirJanela(janelaAdicionarTrofeu);
  }

  function abrirAcoesTrofeu(indiceTrofeu, botaoOrigem) {
    estado.indiceTrofeuAcoes = indiceTrofeu;
    abrirTooltipAcoes(botaoOrigem, [
      {
        texto: "Editar",
        onClick: () => abrirEditarTrofeu(indiceTrofeu)
      },
      {
        texto: "Remover",
        classeExtra: "TooltipAcoesBotaoRemover",
        onClick: () => solicitarConfirmacaoRemocaoTrofeu(indiceTrofeu)
      }
    ]);
  }

  function fecharAcoesTrofeu() {
    estado.indiceTrofeuAcoes = null;
    fecharTooltipAcoes();
  }

  function abrirEditarTrofeu(indiceTrofeu) {
    if (estado.indiceJogoSelecionado === null) {
      return;
    }

    estado.indiceTrofeuSelecionado = indiceTrofeu;
    const trofeu = estado.jogos[estado.indiceJogoSelecionado].trofeus[indiceTrofeu];
    campoNomeEditarTrofeu.value = trofeu.nome;
    campoDescricaoEditarTrofeu.value = trofeu.descricao;
    campoImagemEditarTrofeu.value = "";
    campoNomeEditarTrofeu.setCustomValidity("");
    campoDescricaoEditarTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeEditarTrofeu);
    limparMensagemCampo(mensagemDescricaoEditarTrofeu);
    abrirJanela(janelaEditarTrofeu);
  }

  function abrirEditarTrofeuPorAcoes() {
    if (estado.indiceTrofeuAcoes === null) {
      return;
    }

    const indiceTrofeu = estado.indiceTrofeuAcoes;
    fecharAcoesTrofeu();
    abrirEditarTrofeu(indiceTrofeu);
  }

  function removerTrofeuPorAcoes() {
    if (estado.indiceTrofeuAcoes === null) {
      return;
    }

    const indiceTrofeu = estado.indiceTrofeuAcoes;
    fecharAcoesTrofeu();
    solicitarConfirmacaoRemocaoTrofeu(indiceTrofeu);
  }

  function solicitarConfirmacaoRemocaoTrofeu(indiceTrofeu) {
    if (estado.indiceJogoSelecionado === null) {
      return;
    }

    const trofeu = estado.jogos[estado.indiceJogoSelecionado]?.trofeus[indiceTrofeu];
    if (!trofeu) {
      return;
    }

    abrirConfirmacaoExclusao({
      titulo: "Excluir troféu",
      mensagem: `Deseja excluir o troféu "${trofeu.nome}"? Esta ação não poderá ser desfeita.`,
      onConfirmar: () => removerTrofeu(indiceTrofeu)
    });
  }

  function removerTrofeu(indiceTrofeu) {
    if (estado.indiceJogoSelecionado === null) {
      return;
    }

    estado.jogos[estado.indiceJogoSelecionado].trofeus.splice(indiceTrofeu, 1);
    salvarJogos();
    renderizarTrofeus();
    renderizarJogos();
    estado.indiceTrofeuAcoes = null;
    estado.indiceTrofeuSelecionado = null;
  }

  document
    .getElementById("botaoAbrirAdicionarTrofeu")
    .addEventListener("click", abrirAdicionarTrofeu);
  document
    .getElementById("botaoFecharAdicionarTrofeu")
    .addEventListener("click", () => fecharJanela(janelaAdicionarTrofeu));
  document
    .getElementById("botaoFecharEditarTrofeu")
    .addEventListener("click", () => fecharJanela(janelaEditarTrofeu));
  document
    .getElementById("botaoFecharAcoesTrofeu")
    .addEventListener("click", fecharAcoesTrofeu);

  botaoAbrirEditarTrofeu.addEventListener("click", abrirEditarTrofeuPorAcoes);
  botaoRemoverTrofeuModal.addEventListener("click", removerTrofeuPorAcoes);
  campoNomeTrofeu.addEventListener("input", () => {
    campoNomeTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeTrofeu);
  });
  campoImagemTrofeu.addEventListener("change", () => {
    campoImagemTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemImagemTrofeu);
  });
  campoDescricaoTrofeu.addEventListener("input", () => {
    campoDescricaoTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemDescricaoTrofeu);
  });
  campoNomeEditarTrofeu.addEventListener("input", () => {
    campoNomeEditarTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeEditarTrofeu);
  });
  campoDescricaoEditarTrofeu.addEventListener("input", () => {
    campoDescricaoEditarTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemDescricaoEditarTrofeu);
  });

  formAdicionarTrofeu.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (estado.indiceJogoSelecionado === null) {
      return;
    }

    campoNomeTrofeu.setCustomValidity("");
    campoImagemTrofeu.setCustomValidity("");
    campoDescricaoTrofeu.setCustomValidity("");

    if (!formAdicionarTrofeu.checkValidity()) {
      formAdicionarTrofeu.reportValidity();
      return;
    }

    const nome = campoNomeTrofeu.value.trim();
    const descricao = campoDescricaoTrofeu.value.trim();
    const arquivoImagem = campoImagemTrofeu.files[0];

    if (!nome) {
      definirMensagemCampo(
        mensagemNomeTrofeu,
        "Informe o nome do troféu.",
        true
      );
      campoNomeTrofeu.setCustomValidity("Informe o nome do troféu.");
      campoNomeTrofeu.reportValidity();
      return;
    }

    if (!arquivoImagem) {
      definirMensagemCampo(
        mensagemImagemTrofeu,
        "Selecione uma imagem para o troféu.",
        true
      );
      campoImagemTrofeu.setCustomValidity("Selecione uma imagem para o troféu.");
      campoImagemTrofeu.reportValidity();
      return;
    }

    if (!descricao) {
      definirMensagemCampo(
        mensagemDescricaoTrofeu,
        "Informe a descrição do troféu.",
        true
      );
      campoDescricaoTrofeu.setCustomValidity("Informe a descrição do troféu.");
      campoDescricaoTrofeu.reportValidity();
      return;
    }

    const imagem = await lerArquivoComoDataUrl(arquivoImagem);

    estado.jogos[estado.indiceJogoSelecionado].trofeus.push({
      nome,
      descricao,
      imagem,
      concluido: false
    });

    salvarJogos();
    renderizarJogos();
    renderizarTrofeus();
    formAdicionarTrofeu.reset();
    campoNomeTrofeu.setCustomValidity("");
    campoImagemTrofeu.setCustomValidity("");
    campoDescricaoTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeTrofeu);
    limparMensagemCampo(mensagemImagemTrofeu);
    limparMensagemCampo(mensagemDescricaoTrofeu);
    fecharJanela(janelaAdicionarTrofeu);
  });

  formEditarTrofeu.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (estado.indiceJogoSelecionado === null || estado.indiceTrofeuSelecionado === null) {
      return;
    }

    campoNomeEditarTrofeu.setCustomValidity("");
    campoDescricaoEditarTrofeu.setCustomValidity("");

    if (!formEditarTrofeu.checkValidity()) {
      formEditarTrofeu.reportValidity();
      return;
    }

    const trofeu =
      estado.jogos[estado.indiceJogoSelecionado].trofeus[estado.indiceTrofeuSelecionado];
    const novoNome = campoNomeEditarTrofeu.value.trim();
    const novaDescricao = campoDescricaoEditarTrofeu.value.trim();
    const novaImagem = campoImagemEditarTrofeu.files[0];

    if (!novoNome) {
      definirMensagemCampo(
        mensagemNomeEditarTrofeu,
        "Informe o nome do troféu.",
        true
      );
      campoNomeEditarTrofeu.setCustomValidity("Informe o nome do troféu.");
      campoNomeEditarTrofeu.reportValidity();
      return;
    }

    if (!novaDescricao) {
      definirMensagemCampo(
        mensagemDescricaoEditarTrofeu,
        "Informe a descrição do troféu.",
        true
      );
      campoDescricaoEditarTrofeu.setCustomValidity(
        "Informe a descrição do troféu."
      );
      campoDescricaoEditarTrofeu.reportValidity();
      return;
    }

    trofeu.nome = novoNome;
    trofeu.descricao = novaDescricao;

    if (novaImagem) {
      trofeu.imagem = await lerArquivoComoDataUrl(novaImagem);
    }

    salvarJogos();
    renderizarTrofeus();
    renderizarJogos();
    formEditarTrofeu.reset();
    campoNomeEditarTrofeu.setCustomValidity("");
    campoDescricaoEditarTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeEditarTrofeu);
    limparMensagemCampo(mensagemDescricaoEditarTrofeu);
    estado.indiceTrofeuSelecionado = null;
    fecharJanela(janelaEditarTrofeu);
  });

  return { renderizarTrofeus };
}
