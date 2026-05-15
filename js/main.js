import {
  criarPerfilPadrao,
  obterChavesArmazenamentoApp
} from "./shared/armazenamentoUsuario.js";
import { criarImagensPadraoSite } from "./shared/imagensPadrao.js";
import { criarGerenciadorTooltipAcoes } from "./shared/tooltipAcoes.js";
import { criarControleConfirmacaoExclusao } from "./shared/confirmacaoExclusao.js";
import { carregarPerfil } from "./perfil/modules/perfilPersistencia.js";
import { carregarJogos } from "./jogos/modules/jogosPersistencia.js";
import { initTema } from "./tema/Tema.js";
import { initContaNav } from "./conta/ContaNav.js";
import { initPerfil } from "./perfil/Perfil.js";
import { initJogos } from "./jogos/Jogos.js";
import { initTrofeus } from "./trofeus/Trofeus.js";

document.addEventListener("DOMContentLoaded", () => {
  const imagensPadrao = criarImagensPadraoSite();
  const imagemPadraoPerfil = imagensPadrao.perfil;
  const imagemPadraoJogo = imagensPadrao.jogo;
  const imagemPadraoTrofeu = imagensPadrao.trofeu;

  const chavesArmazenamento = obterChavesArmazenamentoApp();
  const perfilPadrao = criarPerfilPadrao(imagemPadraoPerfil);

  const estado = {
    chavesArmazenamento,
    perfil: carregarPerfil(chavesArmazenamento.perfil, perfilPadrao),
    jogos: carregarJogos(
      chavesArmazenamento.jogos,
      imagemPadraoJogo,
      imagemPadraoTrofeu
    ),
    indiceJogoSelecionado: null,
    indiceJogoAcoes: null,
    indiceTrofeuAcoes: null,
    indiceTrofeuSelecionado: null
  };

  const botaoTemaBarra = document.getElementById("botaoTemaBarra");
  const botaoTemaModalConta = document.getElementById("botaoTemaModalConta");
  const { aplicarTemaSalvo, alternarModoEscuro } = initTema({
    botaoTemaBarra,
    botaoTemaModalConta
  });

  const tooltip = criarGerenciadorTooltipAcoes();

  const exclusao = criarControleConfirmacaoExclusao({
    janela: document.getElementById("janelaConfirmacaoExclusao"),
    tituloConfirmacaoExclusao: document.getElementById("tituloConfirmacaoExclusao"),
    mensagemConfirmacaoExclusao: document.getElementById(
      "mensagemConfirmacaoExclusao"
    ),
    botaoFecharConfirmacaoExclusao: document.getElementById(
      "botaoFecharConfirmacaoExclusao"
    ),
    botaoCancelarConfirmacaoExclusao: document.getElementById(
      "botaoCancelarConfirmacaoExclusao"
    ),
    botaoConfirmarExclusao: document.getElementById("botaoConfirmarExclusao")
  });

  const { atualizarBarraConta } = initContaNav({
    refs: {
      botaoLogin: document.getElementById("botaoLogin"),
      grupoContaUsuarioDireita: document.getElementById("grupoContaUsuarioDireita"),
      botaoAbrirMenuContaNav: document.getElementById("botaoAbrirMenuContaNav"),
      menuContaNav: document.getElementById("menuContaNav"),
      botaoDadosConta: document.getElementById("botaoDadosConta"),
      botaoSairConta: document.getElementById("botaoSairConta"),
      janelaDadosConta: document.getElementById("janelaDadosConta"),
      botaoFecharDadosConta: document.getElementById("botaoFecharDadosConta"),
      botaoFecharDadosContaRodape: document.getElementById(
        "botaoFecharDadosContaRodape"
      ),
      dadoContaUsuario: document.getElementById("dadoContaUsuario"),
      dadoContaEmail: document.getElementById("dadoContaEmail"),
      dadoContaPrimeiroNome: document.getElementById("dadoContaPrimeiroNome"),
      dadoContaSobrenome: document.getElementById("dadoContaSobrenome"),
      botaoTemaBarra
    }
  });

  const { renderizarPerfil } = initPerfil({
    estado,
    imagemPadraoPerfil,
    refs: {
      nomePerfil: document.getElementById("nomePerfil"),
      imagemPerfil: document.getElementById("imagemPerfil"),
      janelaEditarPerfil: document.getElementById("janelaEditarPerfil"),
      formEditarPerfil: document.getElementById("formEditarPerfil"),
      campoNomePerfil: document.getElementById("campoNomePerfil"),
      campoImagemPerfil: document.getElementById("campoImagemPerfil"),
      mensagemNomePerfil: document.getElementById("mensagemNomePerfil"),
      botaoMenuPerfil: document.getElementById("botaoMenuPerfil"),
      botaoAbrirEditarPerfilModal: document.getElementById(
        "botaoAbrirEditarPerfilModal"
      )
    },
    tooltip
  });

  const api = { trofeus: null };

  api.jogos = initJogos({
    estado,
    refs: {
      listaJogos: document.getElementById("listaJogos"),
      campoPesquisaJogos: document.getElementById("campoPesquisaJogos"),
      janelaAdicionarJogo: document.getElementById("janelaAdicionarJogo"),
      janelaEditarJogo: document.getElementById("janelaEditarJogo"),
      janelaTrofeus: document.getElementById("janelaTrofeus"),
      formAdicionarJogo: document.getElementById("formAdicionarJogo"),
      formEditarJogo: document.getElementById("formEditarJogo"),
      campoNomeNovoJogo: document.getElementById("campoNomeNovoJogo"),
      campoImagemNovoJogo: document.getElementById("campoImagemNovoJogo"),
      campoNomeEditarJogo: document.getElementById("campoNomeEditarJogo"),
      campoImagemEditarJogo: document.getElementById("campoImagemEditarJogo"),
      mensagemNomeNovoJogo: document.getElementById("mensagemNomeNovoJogo"),
      mensagemImagemNovoJogo: document.getElementById("mensagemImagemNovoJogo"),
      mensagemNomeEditarJogo: document.getElementById("mensagemNomeEditarJogo"),
      tituloJanelaTrofeus: document.getElementById("tituloJanelaTrofeus"),
      botaoAbrirEditarJogo: document.getElementById("botaoAbrirEditarJogo"),
      botaoRemoverJogoModal: document.getElementById("botaoRemoverJogoModal")
    },
    tooltip,
    exclusao,
    renderizarTrofeus: () => api.trofeus.renderizarTrofeus()
  });

  api.trofeus = initTrofeus({
    estado,
    refs: {
      listaTrofeus: document.getElementById("listaTrofeus"),
      janelaTrofeus: document.getElementById("janelaTrofeus"),
      janelaAdicionarTrofeu: document.getElementById("janelaAdicionarTrofeu"),
      janelaEditarTrofeu: document.getElementById("janelaEditarTrofeu"),
      formAdicionarTrofeu: document.getElementById("formAdicionarTrofeu"),
      formEditarTrofeu: document.getElementById("formEditarTrofeu"),
      campoNomeTrofeu: document.getElementById("campoNomeTrofeu"),
      campoImagemTrofeu: document.getElementById("campoImagemTrofeu"),
      campoDescricaoTrofeu: document.getElementById("campoDescricaoTrofeu"),
      campoNomeEditarTrofeu: document.getElementById("campoNomeEditarTrofeu"),
      campoImagemEditarTrofeu: document.getElementById("campoImagemEditarTrofeu"),
      campoDescricaoEditarTrofeu: document.getElementById(
        "campoDescricaoEditarTrofeu"
      ),
      mensagemNomeTrofeu: document.getElementById("mensagemNomeTrofeu"),
      mensagemImagemTrofeu: document.getElementById("mensagemImagemTrofeu"),
      mensagemDescricaoTrofeu: document.getElementById("mensagemDescricaoTrofeu"),
      mensagemNomeEditarTrofeu: document.getElementById("mensagemNomeEditarTrofeu"),
      mensagemDescricaoEditarTrofeu: document.getElementById(
        "mensagemDescricaoEditarTrofeu"
      ),
      botaoAbrirEditarTrofeu: document.getElementById("botaoAbrirEditarTrofeu"),
      botaoRemoverTrofeuModal: document.getElementById("botaoRemoverTrofeuModal")
    },
    tooltip,
    exclusao,
    renderizarJogos: () => api.jogos.renderizarJogos()
  });

  aplicarTemaSalvo();
  renderizarPerfil();
  api.jogos.renderizarJogos();
  atualizarBarraConta();

  if (botaoTemaBarra) {
    botaoTemaBarra.addEventListener("click", alternarModoEscuro);
  }
  if (botaoTemaModalConta) {
    botaoTemaModalConta.addEventListener("click", alternarModoEscuro);
  }
});
