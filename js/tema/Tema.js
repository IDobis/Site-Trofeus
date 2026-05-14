import { CHAVE_TEMA } from "../shared/chavesArmazenamento.js";
import {
  aplicarClasseModoEscuroNoDocumento,
  alternarClasseModoEscuroNoDocumento,
  obterModoEscuroSalvo,
  persistirPreferenciaTema
} from "./modules/temaDom.js";

export function initTema({ botaoTemaBarra, botaoTemaModalConta }) {
  function atualizarTextoBotoesTema(modoEscuroAtivo) {
    const html = modoEscuroAtivo
      ? "Modo Claro <i class='bi bi-sun-fill' aria-hidden='true'></i>"
      : "Modo Escuro <i class='bi bi-moon-fill' aria-hidden='true'></i>";
    if (botaoTemaBarra) botaoTemaBarra.innerHTML = html;
    if (botaoTemaModalConta) botaoTemaModalConta.innerHTML = html;
  }

  function aplicarTemaSalvo() {
    const estaNoModoEscuro = obterModoEscuroSalvo(CHAVE_TEMA);
    aplicarClasseModoEscuroNoDocumento(estaNoModoEscuro);
    atualizarTextoBotoesTema(estaNoModoEscuro);
  }

  function alternarModoEscuro() {
    const modoEscuroAtivo = alternarClasseModoEscuroNoDocumento();
    persistirPreferenciaTema(CHAVE_TEMA, modoEscuroAtivo);
    atualizarTextoBotoesTema(modoEscuroAtivo);
  }

  return { aplicarTemaSalvo, alternarModoEscuro };
}
