import { lerArquivoComoDataUrl } from "../shared/arquivos.js";
import { abrirJanela, fecharJanela } from "../shared/modais.js";
import {
  validarLimiteCaracteres
} from "../shared/validacaoFormulario.js";
import { salvarPerfil } from "./modules/perfilPersistencia.js";
import { CHAVE_PERFIL } from "../shared/chavesArmazenamento.js";

export function initPerfil({
  estado,
  imagemPadraoPerfil,
  refs,
  tooltip
}) {
  const {
    nomePerfil,
    imagemPerfil,
    janelaEditarPerfil,
    formEditarPerfil,
    campoNomePerfil,
    campoImagemPerfil,
    mensagemNomePerfil,
    botaoMenuPerfil,
    botaoAbrirEditarPerfilModal
  } = refs;

  const { abrirTooltipAcoes, fecharTooltipAcoes } = tooltip;

  function salvarPerfilLocal() {
    salvarPerfil(CHAVE_PERFIL, estado.perfil);
  }

  function renderizarPerfil() {
    nomePerfil.textContent = estado.perfil.nome;
    imagemPerfil.src = estado.perfil.imagem || imagemPadraoPerfil;
  }

  function abrirEditarPerfil() {
    campoNomePerfil.value = estado.perfil.nome;
    campoImagemPerfil.value = "";
    validarLimiteCaracteres(campoNomePerfil, mensagemNomePerfil, 20);
    abrirJanela(janelaEditarPerfil);
  }

  function abrirAcoesPerfil(botaoOrigem = botaoMenuPerfil) {
    abrirTooltipAcoes(botaoOrigem, [
      {
        texto: "Editar",
        onClick: abrirEditarPerfil
      }
    ]);
  }

  function fecharAcoesPerfil() {
    fecharTooltipAcoes();
  }

  function abrirEditarPerfilPorAcoes() {
    fecharAcoesPerfil();
    abrirEditarPerfil();
  }

  document
    .getElementById("botaoFecharEditarPerfil")
    .addEventListener("click", () => fecharJanela(janelaEditarPerfil));
  document
    .getElementById("botaoFecharAcoesPerfil")
    .addEventListener("click", fecharAcoesPerfil);
  botaoMenuPerfil.addEventListener("click", (evento) => {
    evento.stopPropagation();
    abrirAcoesPerfil(evento.currentTarget);
  });
  botaoAbrirEditarPerfilModal.addEventListener("click", abrirEditarPerfilPorAcoes);
  campoNomePerfil.addEventListener("input", () =>
    validarLimiteCaracteres(campoNomePerfil, mensagemNomePerfil, 20)
  );

  formEditarPerfil.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const novoNome = campoNomePerfil.value.trim().slice(0, 20);
    const novaImagem = campoImagemPerfil.files[0];

    if (novoNome) {
      estado.perfil.nome = novoNome;
    }

    if (novaImagem) {
      estado.perfil.imagem = await lerArquivoComoDataUrl(novaImagem);
    }

    salvarPerfilLocal();
    renderizarPerfil();
    formEditarPerfil.reset();
    fecharJanela(janelaEditarPerfil);
  });

  return { renderizarPerfil };
}
