document.addEventListener("DOMContentLoaded", () => {
  const chaveTema = "tema";
  const chavePerfil = "perfil";
  const chaveJogos = "jogos";

  const imagemPadraoPerfil = criarImagemPadrao(
    "Perfil",
    "#1c1c1c",
    "#00ff88",
    320,
    320
  );
  const imagemPadraoJogo = criarImagemPadrao(
    "Jogo",
    "#1c1c1c",
    "#00ffff",
    640,
    360
  );
  const imagemPadraoTrofeu = criarImagemPadrao(
    "Troféu",
    "#2a2a2a",
    "#00ff88",
    240,
    240
  );

  const listaJogos = document.getElementById("listaJogos");
  const nomePerfil = document.getElementById("nomePerfil");
  const imagemPerfil = document.getElementById("imagemPerfil");
  const botaoTema = document.getElementById("botaoTema");

  const janelaAdicionarJogo = document.getElementById("janelaAdicionarJogo");
  const janelaEditarPerfil = document.getElementById("janelaEditarPerfil");
  const janelaEditarJogo = document.getElementById("janelaEditarJogo");
  const janelaTrofeus = document.getElementById("janelaTrofeus");
  const janelaAdicionarTrofeu = document.getElementById("janelaAdicionarTrofeu");

  const formAdicionarJogo = document.getElementById("formAdicionarJogo");
  const formEditarPerfil = document.getElementById("formEditarPerfil");
  const formEditarJogo = document.getElementById("formEditarJogo");
  const formAdicionarTrofeu = document.getElementById("formAdicionarTrofeu");

  const campoNomeNovoJogo = document.getElementById("campoNomeNovoJogo");
  const campoImagemNovoJogo = document.getElementById("campoImagemNovoJogo");
  const campoNomePerfil = document.getElementById("campoNomePerfil");
  const campoImagemPerfil = document.getElementById("campoImagemPerfil");
  const campoNomeEditarJogo = document.getElementById("campoNomeEditarJogo");
  const campoImagemEditarJogo = document.getElementById("campoImagemEditarJogo");
  const campoNomeTrofeu = document.getElementById("campoNomeTrofeu");
  const campoImagemTrofeu = document.getElementById("campoImagemTrofeu");
  const campoDescricaoTrofeu = document.getElementById("campoDescricaoTrofeu");
  const listaTrofeus = document.getElementById("listaTrofeus");
  const tituloJanelaTrofeus = document.getElementById("tituloJanelaTrofeus");
  const botaoLogin = document.getElementById("botaoLogin");

  let indiceJogoSelecionado = null;
  let perfil = carregarPerfil();
  let jogos = carregarJogos();

  aplicarTemaSalvo();
  renderizarPerfil();
  renderizarJogos();

  document
    .getElementById("botaoAbrirAdicionarJogo")
    .addEventListener("click", () => abrirJanela(janelaAdicionarJogo));

  document
    .getElementById("botaoEditarPerfil")
    .addEventListener("click", abrirEditarPerfil);

  document
    .getElementById("botaoAbrirAdicionarTrofeu")
    .addEventListener("click", abrirAdicionarTrofeu);

  botaoLogin.addEventListener("click", () => {
    window.alert("Fluxo de login em construção.");
  });

  document
    .getElementById("botaoFecharAdicionarJogo")
    .addEventListener("click", () => fecharJanela(janelaAdicionarJogo));
  document
    .getElementById("botaoFecharEditarPerfil")
    .addEventListener("click", () => fecharJanela(janelaEditarPerfil));
  document
    .getElementById("botaoFecharEditarJogo")
    .addEventListener("click", () => fecharJanela(janelaEditarJogo));
  document
    .getElementById("botaoFecharTrofeus")
    .addEventListener("click", () => fecharJanela(janelaTrofeus));
  document
    .getElementById("botaoFecharAdicionarTrofeu")
    .addEventListener("click", () => fecharJanela(janelaAdicionarTrofeu));

  botaoTema.addEventListener("click", alternarModoEscuro);

  formAdicionarJogo.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = campoNomeNovoJogo.value.trim();
    const arquivoImagem = campoImagemNovoJogo.files[0];

    if (!nome || !arquivoImagem) {
      return;
    }

    const imagem = await lerArquivoComoDataUrl(arquivoImagem);

    jogos.push({
      nome,
      imagem,
      trofeus: []
    });

    salvarJogos();
    renderizarJogos();
    formAdicionarJogo.reset();
    fecharJanela(janelaAdicionarJogo);
  });

  formEditarPerfil.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const novoNome = campoNomePerfil.value.trim();
    const novaImagem = campoImagemPerfil.files[0];

    if (novoNome) {
      perfil.nome = novoNome;
    }

    if (novaImagem) {
      perfil.imagem = await lerArquivoComoDataUrl(novaImagem);
    }

    salvarPerfil();
    renderizarPerfil();
    formEditarPerfil.reset();
    fecharJanela(janelaEditarPerfil);
  });

  formEditarJogo.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (indiceJogoSelecionado === null) {
      return;
    }

    const jogo = jogos[indiceJogoSelecionado];
    const novoNome = campoNomeEditarJogo.value.trim();
    const novaImagem = campoImagemEditarJogo.files[0];

    if (novoNome) {
      jogo.nome = novoNome;
    }

    if (novaImagem) {
      jogo.imagem = await lerArquivoComoDataUrl(novaImagem);
    }

    salvarJogos();
    renderizarJogos();
    renderizarTrofeus();
    formEditarJogo.reset();
    fecharJanela(janelaEditarJogo);
  });

  formAdicionarTrofeu.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (indiceJogoSelecionado === null) {
      return;
    }

    const nome = campoNomeTrofeu.value.trim();
    const descricao = campoDescricaoTrofeu.value.trim();
    const arquivoImagem = campoImagemTrofeu.files[0];

    if (!nome || !descricao || !arquivoImagem) {
      return;
    }

    const imagem = await lerArquivoComoDataUrl(arquivoImagem);

    jogos[indiceJogoSelecionado].trofeus.push({
      nome,
      descricao,
      imagem,
      concluido: false
    });

    salvarJogos();
    renderizarJogos();
    renderizarTrofeus();
    formAdicionarTrofeu.reset();
    fecharJanela(janelaAdicionarTrofeu);
  });

  function carregarPerfil() {
    const perfilPadrao = {
      nome: "Dobis",
      imagem: imagemPadraoPerfil
    };

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

  function carregarJogos() {
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

  function salvarPerfil() {
    localStorage.setItem(chavePerfil, JSON.stringify(perfil));
  }

  function salvarJogos() {
    localStorage.setItem(chaveJogos, JSON.stringify(jogos));
  }

  function aplicarTemaSalvo() {
    const temaSalvo = localStorage.getItem(chaveTema);
    const estaNoModoEscuro = temaSalvo === "escuro";

    document.documentElement.classList.toggle("modoEscuro", estaNoModoEscuro);
    botaoTema.textContent = estaNoModoEscuro ? "Modo claro" : "Modo escuro";
  }

  function alternarModoEscuro() {
    const modoEscuroAtivo =
      document.documentElement.classList.toggle("modoEscuro");

    localStorage.setItem(chaveTema, modoEscuroAtivo ? "escuro" : "claro");
    botaoTema.textContent = modoEscuroAtivo ? "Modo claro" : "Modo escuro";
  }

  function renderizarPerfil() {
    nomePerfil.textContent = perfil.nome;
    imagemPerfil.src = perfil.imagem || imagemPadraoPerfil;
  }

  function renderizarJogos() {
    listaJogos.innerHTML = "";

    jogos.forEach((jogo, indiceJogo) => {
      const percentual = calcularPercentualConclusao(jogo.trofeus);
      const cartaoJogo = document.createElement("article");
      cartaoJogo.className = "CartaoJogo";

      cartaoJogo.innerHTML = `
        <div class="AcoesJogo">
          <button class="BotaoEditarJogo" type="button">Editar</button>
          <button class="BotaoRemoverJogo" type="button">Remover</button>
        </div>
        <img class="ImagemJogo" src="${jogo.imagem}" alt="Capa do jogo ${jogo.nome}" />
        <div class="InfoJogo">
          <h2 class="NomeJogo">${jogo.nome}</h2>
          <div class="AreaTrofeusJogo">
            <button class="BotaoTrofeus" type="button">
              <i class="bi bi-trophy-fill"></i>
              Troféus
            </button>
            <div class="BarraProgresso" aria-label="Progresso dos troféus">
              <div class="PreenchimentoProgresso" style="width: ${percentual}%"></div>
              <span class="TextoProgresso">${formatarPercentual(percentual)}</span>
            </div>
          </div>
        </div>
      `;

      const botaoEditarJogo = cartaoJogo.querySelector(".BotaoEditarJogo");
      const botaoRemoverJogo = cartaoJogo.querySelector(".BotaoRemoverJogo");
      const botaoTrofeus = cartaoJogo.querySelector(".BotaoTrofeus");

      botaoEditarJogo.addEventListener("click", () => abrirEditarJogo(indiceJogo));
      botaoRemoverJogo.addEventListener("click", () => removerJogo(indiceJogo));
      botaoTrofeus.addEventListener("click", () => abrirTrofeus(indiceJogo));

      listaJogos.appendChild(cartaoJogo);
    });
  }

  function abrirEditarPerfil() {
    campoNomePerfil.value = perfil.nome;
    campoImagemPerfil.value = "";
    abrirJanela(janelaEditarPerfil);
  }

  function abrirEditarJogo(indiceJogo) {
    indiceJogoSelecionado = indiceJogo;
    campoNomeEditarJogo.value = jogos[indiceJogo].nome;
    campoImagemEditarJogo.value = "";
    abrirJanela(janelaEditarJogo);
  }

  function abrirTrofeus(indiceJogo) {
    indiceJogoSelecionado = indiceJogo;
    tituloJanelaTrofeus.textContent = `Troféus - ${jogos[indiceJogo].nome}`;
    renderizarTrofeus();
    abrirJanela(janelaTrofeus);
  }

  function abrirAdicionarTrofeu() {
    if (indiceJogoSelecionado === null) {
      return;
    }

    formAdicionarTrofeu.reset();
    abrirJanela(janelaAdicionarTrofeu);
  }

  function renderizarTrofeus() {
    listaTrofeus.innerHTML = "";

    if (indiceJogoSelecionado === null) {
      return;
    }

    const trofeus = jogos[indiceJogoSelecionado].trofeus;

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

      const idMarcacao = `trofeu${indiceJogoSelecionado}${indiceTrofeu}`;

      cartaoTrofeu.innerHTML = `
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
          <button class="BotaoRemoverTrofeu" type="button">Remover</button>
        </div>
      `;

      const campoMarcacao = cartaoTrofeu.querySelector("input");
      const botaoRemoverTrofeu = cartaoTrofeu.querySelector(".BotaoRemoverTrofeu");
      campoMarcacao.addEventListener("change", () => {
        trofeus[indiceTrofeu].concluido = campoMarcacao.checked;
        salvarJogos();
        renderizarJogos();
      });
      botaoRemoverTrofeu.addEventListener("click", () =>
        removerTrofeu(indiceTrofeu)
      );

      listaTrofeus.appendChild(cartaoTrofeu);
    });
  }

  function removerJogo(indiceJogo) {
    jogos.splice(indiceJogo, 1);
    salvarJogos();
    renderizarJogos();

    if (indiceJogoSelecionado === indiceJogo) {
      indiceJogoSelecionado = null;
      fecharJanela(janelaTrofeus);
      fecharJanela(janelaEditarJogo);
    } else if (
      indiceJogoSelecionado !== null &&
      indiceJogoSelecionado > indiceJogo
    ) {
      indiceJogoSelecionado -= 1;
    }
  }

  function removerTrofeu(indiceTrofeu) {
    if (indiceJogoSelecionado === null) {
      return;
    }

    jogos[indiceJogoSelecionado].trofeus.splice(indiceTrofeu, 1);
    salvarJogos();
    renderizarTrofeus();
    renderizarJogos();
  }

  function calcularPercentualConclusao(trofeus) {
    if (!trofeus.length) {
      return 0;
    }

    const totalConcluidos = trofeus.filter((trofeu) => trofeu.concluido).length;
    return (totalConcluidos / trofeus.length) * 100;
  }

  function formatarPercentual(percentual) {
    if (Number.isInteger(percentual)) {
      return `${percentual}%`;
    }

    return `${percentual.toFixed(1)}%`;
  }

  function abrirJanela(janela) {
    if (!janela.open) {
      janela.showModal();
    }
  }

  function fecharJanela(janela) {
    if (janela.open) {
      janela.close();
    }
  }

  function lerArquivoComoDataUrl(arquivo) {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();

      leitor.onload = (evento) => resolve(evento.target.result);
      leitor.onerror = () => reject(new Error("Falha ao ler o arquivo."));
      leitor.readAsDataURL(arquivo);
    });
  }

  function criarImagemPadrao(texto, corFundo, corTexto, largura, altura) {
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
});
