export function obterModoEscuroSalvo(chaveTema) {
  const temaSalvo = localStorage.getItem(chaveTema);
  return Boolean(temaSalvo && temaSalvo.toLowerCase() === "escuro");
}

export function aplicarClasseModoEscuroNoDocumento(estaNoModoEscuro) {
  document.documentElement.classList.toggle("modoEscuro", estaNoModoEscuro);
}

export function alternarClasseModoEscuroNoDocumento() {
  return document.documentElement.classList.toggle("modoEscuro");
}

export function persistirPreferenciaTema(chaveTema, modoEscuroAtivo) {
  localStorage.setItem(chaveTema, modoEscuroAtivo ? "escuro" : "claro");
}
