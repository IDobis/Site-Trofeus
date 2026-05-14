export function carregarJogos(chaveJogos, imagemPadraoJogo, imagemPadraoTrofeu) {
  const jogosSalvos = localStorage.getItem(chaveJogos);

  if (!jogosSalvos) {
    return [
      {
        nome: "Nome do jogo",
        imagem: imagemPadraoJogo,
        trofeus: [
          {
            nome: "TAEV",
            descricao: "Uma bela fogueira",
            imagem: imagemPadraoTrofeu,
            concluido: false
          }
        ]
      }
    ];
  }

  try {
    const jogosConvertidos = JSON.parse(jogosSalvos);

    return jogosConvertidos.map((jogo) => ({
      nome: jogo.nome || "Jogo sem nome",
      imagem: jogo.imagem || imagemPadraoJogo,
      trofeus: Array.isArray(jogo.trofeus)
        ? jogo.trofeus.map((trofeu) => ({
            nome: trofeu.nome || "Troféu sem nome",
            descricao: trofeu.descricao || "Sem descrição",
            imagem: trofeu.imagem || imagemPadraoTrofeu,
            concluido: Boolean(trofeu.concluido)
          }))
        : []
    }));
  } catch {
    return [];
  }
}

export function salvarJogos(chaveJogos, jogos) {
  localStorage.setItem(chaveJogos, JSON.stringify(jogos));
}
