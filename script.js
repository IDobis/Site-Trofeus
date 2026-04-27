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
  const janelaAcoesPerfil = document.getElementById("janelaAcoesPerfil");
  const janelaEditarJogo = document.getElementById("janelaEditarJogo");
  const janelaAcoesJogo = document.getElementById("janelaAcoesJogo");
  const janelaEditarTrofeu = document.getElementById("janelaEditarTrofeu");
  const janelaAcoesTrofeu = document.getElementById("janelaAcoesTrofeu");
  const janelaTrofeus = document.getElementById("janelaTrofeus");
  const janelaAdicionarTrofeu = document.getElementById("janelaAdicionarTrofeu");

  const formAdicionarJogo = document.getElementById("formAdicionarJogo");
  const formEditarPerfil = document.getElementById("formEditarPerfil");
  const formEditarJogo = document.getElementById("formEditarJogo");
  const formAdicionarTrofeu = document.getElementById("formAdicionarTrofeu");
  const formEditarTrofeu = document.getElementById("formEditarTrofeu");

  const campoNomeNovoJogo = document.getElementById("campoNomeNovoJogo");
  const campoImagemNovoJogo = document.getElementById("campoImagemNovoJogo");
  const campoNomePerfil = document.getElementById("campoNomePerfil");
  const campoImagemPerfil = document.getElementById("campoImagemPerfil");
  const campoNomeEditarJogo = document.getElementById("campoNomeEditarJogo");
  const campoImagemEditarJogo = document.getElementById("campoImagemEditarJogo");
  const campoNomeTrofeu = document.getElementById("campoNomeTrofeu");
  const campoImagemTrofeu = document.getElementById("campoImagemTrofeu");
  const campoDescricaoTrofeu = document.getElementById("campoDescricaoTrofeu");
  const campoNomeEditarTrofeu = document.getElementById("campoNomeEditarTrofeu");
  const campoImagemEditarTrofeu = document.getElementById("campoImagemEditarTrofeu");
  const campoDescricaoEditarTrofeu = document.getElementById(
    "campoDescricaoEditarTrofeu"
  );
  const listaTrofeus = document.getElementById("listaTrofeus");
  const tituloJanelaTrofeus = document.getElementById("tituloJanelaTrofeus");
  const botaoLogin = document.getElementById("botaoLogin");
  const mensagemNomeNovoJogo = document.getElementById("mensagemNomeNovoJogo");
  const mensagemImagemNovoJogo = document.getElementById("mensagemImagemNovoJogo");
  const mensagemNomePerfil = document.getElementById("mensagemNomePerfil");
  const mensagemNomeEditarJogo = document.getElementById("mensagemNomeEditarJogo");
  const mensagemNomeTrofeu = document.getElementById("mensagemNomeTrofeu");
  const mensagemImagemTrofeu = document.getElementById("mensagemImagemTrofeu");
  const mensagemDescricaoTrofeu = document.getElementById("mensagemDescricaoTrofeu");
  const mensagemNomeEditarTrofeu = document.getElementById("mensagemNomeEditarTrofeu");
  const mensagemDescricaoEditarTrofeu = document.getElementById(
    "mensagemDescricaoEditarTrofeu"
  );
  const botaoMenuPerfil = document.getElementById("botaoMenuPerfil");
  const botaoAbrirEditarPerfilModal = document.getElementById(
    "botaoAbrirEditarPerfilModal"
  );
  const botaoAbrirEditarJogo = document.getElementById("botaoAbrirEditarJogo");
  const botaoRemoverJogoModal = document.getElementById("botaoRemoverJogoModal");
  const botaoAbrirEditarTrofeu = document.getElementById("botaoAbrirEditarTrofeu");
  const botaoRemoverTrofeuModal = document.getElementById("botaoRemoverTrofeuModal");

  let indiceJogoSelecionado = null;
  let indiceJogoAcoes = null;
  let indiceTrofeuAcoes = null;
  let indiceTrofeuSelecionado = null;
  let perfil = carregarPerfil();
  let jogos = carregarJogos();

  aplicarTemaSalvo();
  renderizarPerfil();
  renderizarJogos();

  document
    .getElementById("botaoAbrirAdicionarJogo")
    .addEventListener("click", () => {
      limparMensagemCampo(mensagemNomeNovoJogo);
      limparMensagemCampo(mensagemImagemNovoJogo);
      abrirJanela(janelaAdicionarJogo);
    });

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
    .getElementById("botaoFecharAcoesPerfil")
    .addEventListener("click", fecharAcoesPerfil);
  document
    .getElementById("botaoFecharEditarJogo")
    .addEventListener("click", () => fecharJanela(janelaEditarJogo));
  document
    .getElementById("botaoFecharAcoesJogo")
    .addEventListener("click", fecharAcoesJogo);
  document
    .getElementById("botaoFecharEditarTrofeu")
    .addEventListener("click", () => fecharJanela(janelaEditarTrofeu));
  document
    .getElementById("botaoFecharAcoesTrofeu")
    .addEventListener("click", fecharAcoesTrofeu);
  document
    .getElementById("botaoFecharTrofeus")
    .addEventListener("click", () => fecharJanela(janelaTrofeus));
  document
    .getElementById("botaoFecharAdicionarTrofeu")
    .addEventListener("click", () => fecharJanela(janelaAdicionarTrofeu));

  botaoTema.addEventListener("click", alternarModoEscuro);
  botaoMenuPerfil.addEventListener("click", abrirAcoesPerfil);
  botaoAbrirEditarPerfilModal.addEventListener("click", abrirEditarPerfilPorAcoes);
  botaoAbrirEditarJogo.addEventListener("click", abrirEditarJogoPorAcoes);
  botaoRemoverJogoModal.addEventListener("click", removerJogoPorAcoes);
  botaoAbrirEditarTrofeu.addEventListener("click", abrirEditarTrofeuPorAcoes);
  botaoRemoverTrofeuModal.addEventListener("click", removerTrofeuPorAcoes);
  campoNomeNovoJogo.addEventListener("input", () =>
    validarLimiteCaracteres(campoNomeNovoJogo, mensagemNomeNovoJogo, 25)
  );
  campoImagemNovoJogo.addEventListener("change", () =>
    limparMensagemCampo(mensagemImagemNovoJogo)
  );
  campoNomePerfil.addEventListener("input", () =>
    validarLimiteCaracteres(campoNomePerfil, mensagemNomePerfil, 20)
  );
  campoNomeEditarJogo.addEventListener("input", () =>
    validarLimiteCaracteres(campoNomeEditarJogo, mensagemNomeEditarJogo, 25)
  );
  campoNomeTrofeu.addEventListener("input", () => {
    campoNomeTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeTrofeu);
  });
  campoImagemTrofeu.addEventListener("change", () => {
    campoImagemTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemImagemTrofeu);
  });
  campoDescricaoTrofeu.addEventListener("input", () => {
    campoDescricaoTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemDescricaoTrofeu);
  });
  campoNomeEditarTrofeu.addEventListener("input", () => {
    campoNomeEditarTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeEditarTrofeu);
  });
  campoDescricaoEditarTrofeu.addEventListener("input", () => {
    campoDescricaoEditarTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemDescricaoEditarTrofeu);
  });

  formAdicionarJogo.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = campoNomeNovoJogo.value.trim().slice(0, 25);
    const arquivoImagem = campoImagemNovoJogo.files[0];
    let formularioValido = true;

    if (!nome) {
      definirMensagemCampo(
        mensagemNomeNovoJogo,
        "Informe o nome do jogo.",
        true
      );
      formularioValido = false;
    }

    if (!arquivoImagem) {
      definirMensagemCampo(
        mensagemImagemNovoJogo,
        "Selecione uma imagem para o jogo.",
        true
      );
      formularioValido = false;
    }

    if (!formularioValido) {
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
    limparMensagemCampo(mensagemNomeNovoJogo);
    limparMensagemCampo(mensagemImagemNovoJogo);
    fecharJanela(janelaAdicionarJogo);
  });

  formEditarPerfil.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const novoNome = campoNomePerfil.value.trim().slice(0, 20);
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
    const novoNome = campoNomeEditarJogo.value.trim().slice(0, 25);
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

    campoNomeTrofeu.setCustomValidity("");
    campoImagemTrofeu.setCustomValidity("");
    campoDescricaoTrofeu.setCustomValidity("");

    if (!formAdicionarTrofeu.checkValidity()) {
      formAdicionarTrofeu.reportValidity();
      return;
    }

    const nome = campoNomeTrofeu.value.trim();
    const descricao = campoDescricaoTrofeu.value.trim();
    const arquivoImagem = campoImagemTrofeu.files[0];

    if (!nome) {
      definirMensagemCampo(
        mensagemNomeTrofeu,
        "Informe o nome do troféu.",
        true
      );
      campoNomeTrofeu.setCustomValidity("Informe o nome do troféu.");
      campoNomeTrofeu.reportValidity();
      return;
    }

    if (!arquivoImagem) {
      definirMensagemCampo(
        mensagemImagemTrofeu,
        "Selecione uma imagem para o troféu.",
        true
      );
      campoImagemTrofeu.setCustomValidity("Selecione uma imagem para o troféu.");
      campoImagemTrofeu.reportValidity();
      return;
    }

    if (!descricao) {
      definirMensagemCampo(
        mensagemDescricaoTrofeu,
        "Informe a descrição do troféu.",
        true
      );
      campoDescricaoTrofeu.setCustomValidity("Informe a descrição do troféu.");
      campoDescricaoTrofeu.reportValidity();
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
    campoNomeTrofeu.setCustomValidity("");
    campoImagemTrofeu.setCustomValidity("");
    campoDescricaoTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeTrofeu);
    limparMensagemCampo(mensagemImagemTrofeu);
    limparMensagemCampo(mensagemDescricaoTrofeu);
    fecharJanela(janelaAdicionarTrofeu);
  });

  formEditarTrofeu.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (indiceJogoSelecionado === null || indiceTrofeuSelecionado === null) {
      return;
    }

    campoNomeEditarTrofeu.setCustomValidity("");
    campoDescricaoEditarTrofeu.setCustomValidity("");

    if (!formEditarTrofeu.checkValidity()) {
      formEditarTrofeu.reportValidity();
      return;
    }

    const trofeu = jogos[indiceJogoSelecionado].trofeus[indiceTrofeuSelecionado];
    const novoNome = campoNomeEditarTrofeu.value.trim();
    const novaDescricao = campoDescricaoEditarTrofeu.value.trim();
    const novaImagem = campoImagemEditarTrofeu.files[0];

    if (!novoNome) {
      definirMensagemCampo(
        mensagemNomeEditarTrofeu,
        "Informe o nome do troféu.",
        true
      );
      campoNomeEditarTrofeu.setCustomValidity("Informe o nome do troféu.");
      campoNomeEditarTrofeu.reportValidity();
      return;
    }

    if (!novaDescricao) {
      definirMensagemCampo(
        mensagemDescricaoEditarTrofeu,
        "Informe a descrição do troféu.",
        true
      );
      campoDescricaoEditarTrofeu.setCustomValidity(
        "Informe a descrição do troféu."
      );
      campoDescricaoEditarTrofeu.reportValidity();
      return;
    }

    trofeu.nome = novoNome;
    trofeu.descricao = novaDescricao;

    if (novaImagem) {
      trofeu.imagem = await lerArquivoComoDataUrl(novaImagem);
    }

    salvarJogos();
    renderizarTrofeus();
    renderizarJogos();
    formEditarTrofeu.reset();
    campoNomeEditarTrofeu.setCustomValidity("");
    campoDescricaoEditarTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeEditarTrofeu);
    limparMensagemCampo(mensagemDescricaoEditarTrofeu);
    indiceTrofeuSelecionado = null;
    fecharJanela(janelaEditarTrofeu);
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
      cartaoJogo.tabIndex = 0;
      cartaoJogo.setAttribute("role", "button");
      cartaoJogo.setAttribute("aria-label", `Abrir troféus do jogo ${jogo.nome}`);

      cartaoJogo.innerHTML = `
        <button
          class="BotaoMenuCard"
          type="button"
          aria-label="Abrir ações do jogo ${jogo.nome}"
        >
          <i class="bi bi-three-dots"></i>
        </button>
        <img class="ImagemJogo" src="${jogo.imagem}" alt="Capa do jogo ${jogo.nome}" />
        <div class="InfoJogo">
          <h2 class="NomeJogo">${jogo.nome}</h2>
          <div class="AreaTrofeusJogo">
            <span class="BotaoTrofeus">
              <i class="bi bi-trophy-fill"></i>
              Troféus
            </span>
            <div class="BarraProgresso" aria-label="Progresso dos troféus">
              <div class="PreenchimentoProgresso" style="width: ${percentual}%"></div>
              <span class="TextoProgresso">${formatarPercentual(percentual)}</span>
            </div>
          </div>
        </div>
      `;

      const botaoMenuJogo = cartaoJogo.querySelector(".BotaoMenuCard");
      botaoMenuJogo.addEventListener("click", (evento) => {
        evento.stopPropagation();
        abrirAcoesJogo(indiceJogo);
      });
      cartaoJogo.addEventListener("click", () => abrirTrofeus(indiceJogo));
      cartaoJogo.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          abrirTrofeus(indiceJogo);
        }
      });

      listaJogos.appendChild(cartaoJogo);
    });
  }

  function abrirEditarPerfil() {
    campoNomePerfil.value = perfil.nome;
    campoImagemPerfil.value = "";
    validarLimiteCaracteres(campoNomePerfil, mensagemNomePerfil, 20);
    abrirJanela(janelaEditarPerfil);
  }

  function abrirAcoesPerfil() {
    abrirJanela(janelaAcoesPerfil);
  }

  function fecharAcoesPerfil() {
    fecharJanela(janelaAcoesPerfil);
  }

  function abrirEditarPerfilPorAcoes() {
    fecharAcoesPerfil();
    abrirEditarPerfil();
  }

  function abrirEditarJogo(indiceJogo) {
    indiceJogoSelecionado = indiceJogo;
    campoNomeEditarJogo.value = jogos[indiceJogo].nome;
    campoImagemEditarJogo.value = "";
    validarLimiteCaracteres(campoNomeEditarJogo, mensagemNomeEditarJogo, 25);
    abrirJanela(janelaEditarJogo);
  }

  function abrirAcoesJogo(indiceJogo) {
    indiceJogoAcoes = indiceJogo;
    abrirJanela(janelaAcoesJogo);
  }

  function fecharAcoesJogo() {
    indiceJogoAcoes = null;
    fecharJanela(janelaAcoesJogo);
  }

  function abrirEditarJogoPorAcoes() {
    if (indiceJogoAcoes === null) {
      return;
    }

    const indiceJogo = indiceJogoAcoes;
    fecharAcoesJogo();
    abrirEditarJogo(indiceJogo);
  }

  function removerJogoPorAcoes() {
    if (indiceJogoAcoes === null) {
      return;
    }

    const indiceJogo = indiceJogoAcoes;
    fecharAcoesJogo();
    removerJogo(indiceJogo);
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
    campoNomeTrofeu.setCustomValidity("");
    campoImagemTrofeu.setCustomValidity("");
    campoDescricaoTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeTrofeu);
    limparMensagemCampo(mensagemImagemTrofeu);
    limparMensagemCampo(mensagemDescricaoTrofeu);
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
        <button
          class="BotaoMenuCard BotaoMenuTrofeu"
          type="button"
          aria-label="Abrir ações do troféu ${trofeu.nome}"
        >
          <i class="bi bi-three-dots"></i>
        </button>
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
        </div>
      `;

      const campoMarcacao = cartaoTrofeu.querySelector("input");
      const botaoMenuTrofeu = cartaoTrofeu.querySelector(".BotaoMenuTrofeu");
      campoMarcacao.addEventListener("change", () => {
        trofeus[indiceTrofeu].concluido = campoMarcacao.checked;
        salvarJogos();
        renderizarJogos();
      });
      botaoMenuTrofeu.addEventListener("click", () => abrirAcoesTrofeu(indiceTrofeu));

      listaTrofeus.appendChild(cartaoTrofeu);
    });
  }

  function abrirAcoesTrofeu(indiceTrofeu) {
    indiceTrofeuAcoes = indiceTrofeu;
    abrirJanela(janelaAcoesTrofeu);
  }

  function fecharAcoesTrofeu() {
    indiceTrofeuAcoes = null;
    fecharJanela(janelaAcoesTrofeu);
  }

  function abrirEditarTrofeu(indiceTrofeu) {
    if (indiceJogoSelecionado === null) {
      return;
    }

    indiceTrofeuSelecionado = indiceTrofeu;
    const trofeu = jogos[indiceJogoSelecionado].trofeus[indiceTrofeu];
    campoNomeEditarTrofeu.value = trofeu.nome;
    campoDescricaoEditarTrofeu.value = trofeu.descricao;
    campoImagemEditarTrofeu.value = "";
    campoNomeEditarTrofeu.setCustomValidity("");
    campoDescricaoEditarTrofeu.setCustomValidity("");
    limparMensagemCampo(mensagemNomeEditarTrofeu);
    limparMensagemCampo(mensagemDescricaoEditarTrofeu);
    abrirJanela(janelaEditarTrofeu);
  }

  function abrirEditarTrofeuPorAcoes() {
    if (indiceTrofeuAcoes === null) {
      return;
    }

    const indiceTrofeu = indiceTrofeuAcoes;
    fecharAcoesTrofeu();
    abrirEditarTrofeu(indiceTrofeu);
  }

  function removerTrofeuPorAcoes() {
    if (indiceTrofeuAcoes === null) {
      return;
    }

    const indiceTrofeu = indiceTrofeuAcoes;
    fecharAcoesTrofeu();
    removerTrofeu(indiceTrofeu);
  }

  function removerJogo(indiceJogo) {
    jogos.splice(indiceJogo, 1);
    salvarJogos();
    renderizarJogos();
    indiceJogoAcoes = null;

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
    indiceTrofeuAcoes = null;
    indiceTrofeuSelecionado = null;
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

  function definirMensagemCampo(elementoMensagem, texto, erro = false) {
    elementoMensagem.textContent = texto;
    elementoMensagem.classList.toggle("ErroCampo", erro);
  }

  function limparMensagemCampo(elementoMensagem) {
    definirMensagemCampo(elementoMensagem, "", false);
  }

  function validarLimiteCaracteres(campo, elementoMensagem, limite) {
    if (campo.value.length >= limite) {
      definirMensagemCampo(
        elementoMensagem,
        `Máximo de ${limite} caracteres atingido.`,
        false
      );
      return;
    }

    if (elementoMensagem.classList.contains("ErroCampo")) {
      limparMensagemCampo(elementoMensagem);
    } else {
      definirMensagemCampo(elementoMensagem, "", false);
    }
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
