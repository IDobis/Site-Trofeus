export function carregarPerfil(chavePerfil, perfilPadrao) {
  const perfilSalvo = localStorage.getItem(chavePerfil);

  if (!perfilSalvo) {
    return perfilPadrao;
  }

  try {
    return {
      ...perfilPadrao,
      ...JSON.parse(perfilSalvo)
    };
  } catch {
    return perfilPadrao;
  }
}

export function salvarPerfil(chavePerfil, perfil) {
  localStorage.setItem(chavePerfil, JSON.stringify(perfil));
}
