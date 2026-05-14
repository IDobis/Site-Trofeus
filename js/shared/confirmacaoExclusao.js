import { abrirJanela, fecharJanela } from "./modais.js";

export function criarControleConfirmacaoExclusao({
  janela,
  tituloConfirmacaoExclusao,
  mensagemConfirmacaoExclusao,
  botaoFecharConfirmacaoExclusao,
  botaoCancelarConfirmacaoExclusao,
  botaoConfirmarExclusao
}) {
  let acaoConfirmadaPendente = null;

  function fecharConfirmacaoExclusao() {
    acaoConfirmadaPendente = null;
    fecharJanela(janela);
  }

  function abrirConfirmacaoExclusao({ titulo, mensagem, onConfirmar }) {
    tituloConfirmacaoExclusao.textContent = titulo;
    mensagemConfirmacaoExclusao.textContent = mensagem;
    acaoConfirmadaPendente = onConfirmar;
    abrirJanela(janela);
  }

  function confirmarExclusao() {
    if (typeof acaoConfirmadaPendente !== "function") {
      fecharConfirmacaoExclusao();
      return;
    }

    const acao = acaoConfirmadaPendente;
    fecharJanela(janela);
    acaoConfirmadaPendente = null;
    acao();
  }

  botaoFecharConfirmacaoExclusao.addEventListener(
    "click",
    fecharConfirmacaoExclusao
  );
  botaoCancelarConfirmacaoExclusao.addEventListener(
    "click",
    fecharConfirmacaoExclusao
  );
  botaoConfirmarExclusao.addEventListener("click", confirmarExclusao);

  return { abrirConfirmacaoExclusao, fecharConfirmacaoExclusao };
}
