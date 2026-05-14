export function criarImagemPadrao(texto, corFundo, corTexto, largura, altura) {
  const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${largura}" height="${altura}" viewBox="0 0 ${largura} ${altura}">
        <rect width="100%" height="100%" fill="${corFundo}" />
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif"
          font-size="${Math.round(largura / 9)}"
          fill="${corTexto}"
        >
          ${texto}
        </text>
      </svg>
    `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function criarImagensPadraoSite() {
  return {
    perfil: criarImagemPadrao("Perfil", "#1c1c1c", "#00ff88", 320, 320),
    jogo: criarImagemPadrao("Jogo", "#1c1c1c", "#00ffff", 640, 360),
    trofeu: criarImagemPadrao("Troféu", "#2a2a2a", "#00ff88", 240, 240)
  };
}
