import { CHAVE_JOGOS, CHAVE_PERFIL } from "./chavesArmazenamento.js";

const PREFIXO_PERFIL = "platinadores_perfil_";
const PREFIXO_JOGOS = "platinadores_jogos_";
export const USUARIO_VISITANTE = "__visitante";

export function obterUsernameArmazenamento() {
  const auth = window.platinadoresAuth;
  const sessao =
    auth && typeof auth.obterSessao === "function" ? auth.obterSessao() : null;
  return sessao?.username || USUARIO_VISITANTE;
}

export function chavePerfilParaUsuario(username) {
  return `${PREFIXO_PERFIL}${username}`;
}

export function chaveJogosParaUsuario(username) {
  return `${PREFIXO_JOGOS}${username}`;
}

function migrarChaveLegadaSeVazia(chaveNova, chaveLegada) {
  if (localStorage.getItem(chaveNova)) {
    return;
  }

  const valorLegado = localStorage.getItem(chaveLegada);
  if (valorLegado) {
    localStorage.setItem(chaveNova, valorLegado);
  }
}

export function migrarDadosLegadosSeNecessario(username) {
  migrarChaveLegadaSeVazia(chavePerfilParaUsuario(username), CHAVE_PERFIL);
  migrarChaveLegadaSeVazia(chaveJogosParaUsuario(username), CHAVE_JOGOS);
}

export function obterChavesArmazenamentoApp() {
  const username = obterUsernameArmazenamento();
  migrarDadosLegadosSeNecessario(username);

  return {
    username,
    perfil: chavePerfilParaUsuario(username),
    jogos: chaveJogosParaUsuario(username)
  };
}

export function criarPerfilPadrao(imagemPadraoPerfil) {
  const auth = window.platinadoresAuth;
  const dados =
    auth && typeof auth.obterDadosContaSessao === "function"
      ? auth.obterDadosContaSessao()
      : null;

  const nome =
    dados && dados.primeiroNome && dados.primeiroNome !== "—"
      ? dados.primeiroNome
      : "Dobis";

  return {
    nome,
    imagem: imagemPadraoPerfil
  };
}
