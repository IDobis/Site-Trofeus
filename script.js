addEventListener("DOMContentLoaded", () => {
  // Função para mostrar a página
  function mostrarPagina(paginaId) {
    const paginas = document.querySelectorAll(".pagina");
    paginas.forEach((pagina) => {
      pagina.classList.remove("ativa");
    });
    document.getElementById(paginaId).classList.add("ativa");
  }
  // =========================================================================================================================== //

  // Função Adicionar Jogo
  const gamecontainer = document.querySelector(".games-container");
  const butao = document.getElementById("addbutton");

  butao.addEventListener("click", (event) => {
    event.preventDefault(); // Impede o envio do formulário
    AdicionarJogo();
  });

  function AdicionarJogo() {
    const nomejogo = document.getElementById("nomeaddjogodentro").value; // Obtém o valor do input
    const imagem = document.getElementById("fileaddjogo").files[0]; // Obtém o arquivo da img selecionado

    if (nomejogo && imagem) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const jogos = JSON.parse(localStorage.getItem("jogos")) || [];
        jogos.push({ nome: nomejogo, imagem: e.target.result });
        localStorage.setItem("jogos", JSON.stringify(jogos));

        mostrarJogo(nomejogo, e.target.result);

        // Limpa a entrada de arquivo
        document.getElementById("fileaddjogo").value = "";
        document.getElementById("nomeaddjogodentro").value = ""; // Limpa também o campo de nome
      };
      reader.readAsDataURL(imagem); // Lê o arquivo
    }
  }

  function mostrarJogo(nomejogo, imagemUrl) {
    const gameItem = document.createElement("div");
    gameItem.className = "game-item";
    gamecontainer.appendChild(gameItem);

    const imgElemento = document.createElement("img");
    imgElemento.className = "game-img";
    imgElemento.src = imagemUrl; // Usar a URL do objeto para a imagem
    imgElemento.alt = nomejogo;
    gameItem.appendChild(imgElemento);

    const nomejogoelemento = document.createElement("h2");
    nomejogoelemento.className = "game-name";
    nomejogoelemento.textContent = nomejogo;
    gameItem.appendChild(nomejogoelemento);
  }

  // Carregar jogos do localStorage ao iniciar
  window.onload = function () {
    const jogos = JSON.parse(localStorage.getItem("jogos")) || [];
    jogos.forEach((jogo) => {
      mostrarJogo(jogo.nome, jogo.imagem);
    });

    // Carregar dados do localStorage para o perfil
    const nomePerfil = document.querySelector("#profileName");
    const nomeSalvo = localStorage.getItem("nomePerfil");
    const imagemPerfil = document.querySelector("#profileImage");
    const imagemSalva = localStorage.getItem("imagemPerfil");

    if (nomeSalvo) {
      nomePerfil.textContent = nomeSalvo;
    }

    if (imagemSalva) {
      imagemPerfil.src = imagemSalva;
    }
  };
  //Modal AdicionarJogo

  document.getElementById("openModal").addEventListener("click", () => {
    const modal = document.getElementById("myModal");
    modal.showModal();

    requestAnimationFrame(() => {
      modal.style.opacity = "1"; // Set opacity to fully visible
      modal.style.transform = "scale(1)"; // Scale to original size
    });
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    const modal = document.getElementById("myModal");
    modal.style.opacity = "0"; // Fade out
    modal.style.transform = "scale(0.8)"; // Scale down

    setTimeout(() => {
      modal.close();
    }, 300);
  });
  // =========================================================================================================================== //

  // Barra de progressão
  const checkbox = document.querySelector("#terms-checkbox-37");
  const progressBar = document.querySelector(".progress");
  const progressText = document.querySelector(".progress-text");

  function updateBarradeProgresso() {
    // Check if the checkbox is checked
    if (checkbox.checked) {
      progressBar.style.width = "100%";
      progressText.textContent = "100%";
    } else {
      progressBar.style.width = "0%";
      progressText.textContent = "0%";
    }
  }

  // Add event listener to the checkbox
  checkbox.addEventListener("change", updateBarradeProgresso);
  // =========================================================================================================================== //

  // Botão modo claro
  const button = document.querySelector(".toggle-button");

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      button.textContent = "Modo Claro";
      localStorage.setItem("theme", "dark");
    } else {
      button.textContent = "Modo Escuro";
      localStorage.setItem("theme", "light");
    }
  }

  // Salvar modo de Tela
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    button.textContent = "Modo Claro";
  } else {
    document.body.classList.remove("dark-mode");
    button.textContent = "Modo Escuro";
  }

  button.addEventListener("click", toggleDarkMode);
  // =========================================================================================================================== //

  // Modal Editar Perfil
  const botãoEditar = document.querySelector("#botão-editar");
  const BotãoEditarFechar = document.querySelector("#Fechar");
  const janelaEditar = document.querySelector("#Janela-Editar");

  botãoEditar.onclick = function () {
    janelaEditar.showModal();
  };
  BotãoEditarFechar.onclick = function () {
    janelaEditar.closeModal();
  };

  // Botão modal salvar
  const salvarperfil = document.querySelector("#botão-salvar-editar-perfil");
  const formEditar = document.querySelector("#Janela-Editar form");

  // Evento para salvar o nome e a imagem
  formEditar.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const nomePerfil = document.querySelector("#profileName");
    const novoNome = document.querySelector("#nome-editar-campo").value;
    const imagemPerfil = document.querySelector("#profileImage");
    const novaFoto = document.querySelector("#imagem-editar-campo");

    // Salvar nome
    if (novoNome) {
      nomePerfil.textContent = novoNome;
      localStorage.setItem("nomePerfil", novoNome);
    }

    // Salvar imagem
    if (novaFoto.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imagemPerfil.src = e.target.result; // Carrega a nova imagem na tag <img>
        localStorage.setItem("imagemPerfil", e.target.result); // Salva a imagem no localStorage
      };

      reader.readAsDataURL(novaFoto.files[0]); // Lê o arquivo
    }

    // Fechar Modal
    janelaEditar.close();
  });
  // =========================================================================================================================== //

  // Seleciona o diálogo e os botões
  const janelaEditarJogo = document.getElementById("Janela-Editar-Jogo");
  const botaoFechar = document.getElementById("Fechar-Jogo");
  const botaoSalvar = document.getElementById("botão-salvar-editar-jogo");

  // Evento para abrir a janela de edição
  document
    .getElementById("BotaoEditarJogo")
    .addEventListener("click", function () {
      janelaEditarJogo.showModal(); // Abre o diálogo

      // Preenche os campos com os valores atuais
      const nomeJogoSalvo = localStorage.getItem("nomeJogo");
      const imagemJogoSalvo = localStorage.getItem("imagemJogo");

      if (nomeJogoSalvo) {
        document.getElementById("nome-editar-jogo-campo").value = nomeJogoSalvo;
      }
      if (imagemJogoSalvo) {
        // Se a imagem já estiver salva, você pode mostrar a imagem atual
        const imagemPerfilJogo = document.getElementById("imagemJogo");
        imagemPerfilJogo.src = imagemJogoSalvo; // Atualiza a imagem na página
      }
    });

  // Evento para fechar a janela de edição
  botaoFechar.addEventListener("click", function () {
    janelaEditarJogo.close(); // Fecha o diálogo
  });

  // Evento para salvar as alterações
  botaoSalvar.addEventListener("click", function (event) {
    event.preventDefault(); // Prevenir o envio do formulário

    const novoNomeJogo = document.getElementById(
      "nome-editar-jogo-campo"
    ).value;
    const novaFotoJogo = document.getElementById("imagem-editar-jogo-campo");

    // Salvar nome do jogo
    if (novoNomeJogo) {
      localStorage.setItem("nomeJogo", novoNomeJogo);
      console.log("Nome do jogo salvo:", novoNomeJogo);

      // Atualiza o nome do jogo na interface
      document.getElementById("nomeJogo").textContent = novoNomeJogo;
    }

    // Salvar imagem do jogo
    if (novaFotoJogo.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        localStorage.setItem("imagemJogo", e.target.result);
        console.log("Imagem do jogo salva:", e.target.result);

        // Atualiza a imagem na página
        const imagemPerfilJogo = document.getElementById("imagemJogo");
        imagemPerfilJogo.src = e.target.result; // Atualiza a imagem na página
      };
      reader.readAsDataURL(novaFotoJogo.files[0]); // Lê o arquivo da imagem
    }

    // Fechar o diálogo após salvar
    janelaEditarJogo.close();
  });

  // Carregar dados do localStorage ao abrir a página
  window.addEventListener("load", function () {
    const nomeJogoSalvo = localStorage.getItem("nomeJogo");
    const imagemJogoSalvo = localStorage.getItem("imagemJogo");

    if (nomeJogoSalvo) {
      document.getElementById("nomeJogo").textContent = nomeJogoSalvo; // Atualiza o nome na página
    }

    if (imagemJogoSalvo) {
      const imagemPerfilJogo = document.getElementById("imagemJogo");
      imagemPerfilJogo.src = imagemJogoSalvo; // Atualiza a imagem na página
    }
  });

  // =========================================================================================================================== //

  // MODAL TROFÉUS

  const BotãoAbrirTroféus = document.querySelector("#BotãoModalTroféus");
  const ModalTrofeus = document.querySelector("#ModalTroféus");
  const BotãoFecharModalTroféus = document.querySelector("#Fechar-Troféus");

  BotãoAbrirTroféus.onclick = function () {
    ModalTrofeus.show();
  };

  BotãoFecharModalTroféus.onclick = function () {
    console.log("Close button clicked");
    ModalTrofeus.close();
  };

  // Dentro do Modal

  const BotãoAdicionarTroféus = document.querySelector("#AdicionarTroféus");
  const ModalAdicionarTroféus = document.querySelector(
    "#ModalAdicionarTroféus"
  );
  const BotãoFecharModalAdicionarTroféus = document.querySelector(
    "#Fechar-AdicionarTroféus"
  );

  BotãoAdicionarTroféus.onclick = function (event) {
    event.preventDefault();
    ModalAdicionarTroféus.show();
  };

  BotãoFecharModalAdicionarTroféus.onclick = function () {
    ModalAdicionarTroféus.close();
  };

  //TESTE NOVAMENTE
  document
    .getElementById("SalvarAdicao")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Evita o envio do formulário

      // Coletar dados do formulário
      const nomeTrofeu = document.getElementById("NomeAdicionar").value;
      const descricaoTrofeu =
        document.getElementById("DescricaoAdicionar").value;
      const imagemTrofeu = document.getElementById("ImagemAdicionar").files[0];

      // Criar um novo elemento de troféu
      const novoTrofeu = document.createElement("div");
      novoTrofeu.id = "divTrofeus";

      const img = document.createElement("img");
      img.src = URL.createObjectURL(imagemTrofeu);
      img.alt = "";
      img.id = "ImagemTrofeu";

      const textoTrofeu = document.createElement("div");
      textoTrofeu.id = "TextoTrofeu";

      const h2 = document.createElement("h2");
      h2.id = "NomeTrofeu";
      h2.textContent = nomeTrofeu;

      const p = document.createElement("p");
      p.id = "DescricaoTrofeu";
      p.textContent = descricaoTrofeu;

      textoTrofeu.appendChild(h2);
      textoTrofeu.appendChild(p);

      const botaoCheck = document.createElement("div");
      botaoCheck.id = "BotaoCheck";

      const checkboxWrapper = document.createElement("div");
      checkboxWrapper.className = "checkbox-wrapper-37";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "checkbox";
      checkbox.id = "terms-checkbox-" + Math.random(); // Gera um ID único

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.className = "terms-label";

      // Adicionando o SVG e texto ao label
      const svg = `<svg class="checkbox-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_476_5-37" fill="white">
                        <rect width="200" height="200" />
                    </mask>
                    <rect width="200" height="200" class="checkbox-box" stroke-width="40" mask="url(#path-1-inside-1_476_5-37)" />
                    <path class="checkbox-tick" d="M52 111.018L76.9867 136L149 64" stroke-width="15" />
                </svg>`;
      label.innerHTML =
        svg + '<span id="CorTextoCheck" class="label-text">Concluído</span>';

      checkboxWrapper.appendChild(checkbox);
      checkboxWrapper.appendChild(label);
      botaoCheck.appendChild(checkboxWrapper);

      // Adicionando todos os elementos ao novo troféu
      novoTrofeu.appendChild(img);
      novoTrofeu.appendChild(textoTrofeu);
      novoTrofeu.appendChild(botaoCheck);

      // Adicionando o novo troféu ao container
      document.getElementById("trofeus-container").appendChild(novoTrofeu);

      // Fechar o modal
      document.getElementById("ModalAdicionarTroféus").close();
    });
  // =========================================================================================================================== //
});
