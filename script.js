addEventListener('DOMContentLoaded', () => {
  // Função para mostrar a página
  function mostrarPagina(paginaId) {
    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(pagina => {
      pagina.classList.remove('ativa');
    });
    document.getElementById(paginaId).classList.add('ativa');
  }

  const gamecontainer = document.querySelector('.games-container');
  const butao = document.getElementById("addbutton");

  butao.addEventListener("click", (event) => {
    event.preventDefault(); // Impede o envio do formulário
    AdicionarJogo();
  });

  function AdicionarJogo() {
    const nomejogo = document.getElementById('nomeaddjogodentro').value; // Obtém o valor do input
    const imagem = document.getElementById('fileaddjogo').files[0]; // Obtém o arquivo da img selecionado

    if (nomejogo && imagem) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const jogos = JSON.parse(localStorage.getItem('jogos')) || [];
        jogos.push({ nome: nomejogo, imagem: e.target.result });
        localStorage.setItem('jogos', JSON.stringify(jogos));

        mostrarJogo(nomejogo, e.target.result);
        
        // Limpa a entrada de arquivo
        document.getElementById('fileaddjogo').value = '';
        document.getElementById('nomeaddjogodentro').value = ''; // Limpa também o campo de nome
      };
      reader.readAsDataURL(imagem); // Lê o arquivo
    }
  }

  function mostrarJogo(nomejogo, imagemUrl) {
    const gameItem = document.createElement("div");
    gameItem.className = "game-item";
    gamecontainer.appendChild(gameItem);

    const imgElemento = document.createElement('img');
    imgElemento.className = "game-img";
    imgElemento.src = imagemUrl; // Usar a URL do objeto para a imagem
    imgElemento.alt = nomejogo;
    gameItem.appendChild(imgElemento);

    const nomejogoelemento = document.createElement('h2');
    nomejogoelemento.className = "game-name";
    nomejogoelemento.textContent = nomejogo;
    gameItem.appendChild(nomejogoelemento);
  }

  // Carregar jogos do localStorage ao iniciar
  window.onload = function() {
    const jogos = JSON.parse(localStorage.getItem('jogos')) || [];
    jogos.forEach(jogo => {
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

  // Adiciona eventos para os botões das páginas
  document.getElementById('buttonPagina1').addEventListener('click', () => {
    mostrarPagina('pagina1');
  });

  document.getElementById('buttonPagina2').addEventListener('click', () => {
    mostrarPagina('pagina2');
  });

  // Botão modo claro
  const button = document.querySelector('.toggle-button');

  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      button.textContent = 'Modo Claro';
      localStorage.setItem('theme', 'dark');
    } else {
      button.textContent = 'Modo Escuro';
      localStorage.setItem('theme', 'light');
    }
  }

  // Salvar modo de Tela
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    button.textContent = 'Modo Claro'; 
  } else {
    document.body.classList.remove('dark-mode');
    button.textContent = 'Modo Escuro';
  }

  button.addEventListener('click', toggleDarkMode);

  document.getElementById('openModal').addEventListener('click', () => {
    const modal = document.getElementById('myModal');
    modal.showModal();

    requestAnimationFrame(() => {
      modal.style.opacity = '1'; // Set opacity to fully visible
      modal.style.transform = 'scale(1)'; // Scale to original size
    });
  });

  document.getElementById('closeModal').addEventListener('click', () => {
    const modal = document.getElementById('myModal');
    modal.style.opacity = '0'; // Fade out
    modal.style.transform = 'scale(0.8)'; // Scale down

    setTimeout(() => {
      modal.close();
    }, 300);
  });

  // MODAL EDIÇÃO
  const botãoEditar = document.querySelector("#botão-editar")
  const BotãoEditarFechar = document.querySelector("#Fechar")
  const janelaEditar = document.querySelector("#Janela-Editar")

  botãoEditar.onclick = function () {
    janelaEditar.showModal()
  }
  BotãoEditarFechar.onclick = function () {
    janelaEditar.closeModal()
  }
  
  // Botão modal salvar
  const salvarperfil = document.querySelector("#botão-salvar-editar-perfil");
  const formEditar = document.querySelector("#Janela-Editar form");

  // Evento para salvar o nome e a imagem
  formEditar.addEventListener("submit", function(event) {
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

      reader.onload = function(e) {
        imagemPerfil.src = e.target.result; // Carrega a nova imagem na tag <img>
        localStorage.setItem("imagemPerfil", e.target.result); // Salva a imagem no localStorage
      };

      reader.readAsDataURL(novaFoto.files[0]); // Lê o arquivo
    }

    // Close the modal after saving the changes
    janelaEditar.close();
  });

  // Adicionar evento de clique ao botão "Editar Jogo"
  document.querySelectorAll("#BotaoEditarJogo").forEach(button => {
    button.addEventListener("click", () => {
      // Abre o modal de edição de jogo
      ModalEditarJogo.showModal()
    })
  })
    
    // Modal Editar Jogo
  const botãoEditarJogo = document.querySelector("#BotaoEditarJogo");
  const BotãoEditarJogoFechar = document.querySelector("#Fechar-Jogo");
  const janelaEditarJogo = document.querySelector("#Janela-Editar-Jogo");

  // Abrir o modal de edição de jogo
  botãoEditarJogo.onclick = function () {
    janelaEditarJogo.showModal();
  }

  // Fechar o modal de edição de jogo
  BotãoEditarJogoFechar.onclick = function () {
    janelaEditarJogo.close();
  }

  // MODAL TROFÉUS

  const BotãoAbrirTroféus = document.querySelector("#BotãoModalTroféus")
  const ModalTrofeus = document.querySelector("#ModalTroféus")
  const BotãoFecharModalTroféus = document.querySelector("#Fechar-Troféus")


  BotãoAbrirTroféus.onclick = function () {
    ModalTrofeus.show()
  }

  BotãoFecharModalTroféus.onclick = function () {
    console.log("Close button clicked");
    ModalTrofeus.close()
  }

  //Check-Box
  const checkbox = document.querySelector('#BotaoCheck > .checkbox-wrapper-4 > .cbx > .inp-cbx');

  checkbox.addEventListener('change', function() {
    if (this.checked) {
      console.log('Checkbox is checked');
      // Add code here to handle the checkbox being checked
    } else {
      console.log('Checkbox is unchecked');
      // Add code here to handle the checkbox being unchecked
    }
  });

  ModalTrofeus.addEventListener('click', (e) => {
    if (e.target !== BotãoFecharModalTroféus) {
      e.stopPropagation(); //esse +
      e.preventDefault(); // esse funcionou
    }
  });

  // Dentro do Modal

  const BotãoAdicionarTroféus = document.querySelector("#AdicionarTroféus")
  const ModalAdicionarTroféus = document.querySelector("#ModalAdicionarTroféus")
  const BotãoFecharModalAdicionarTroféus = document.querySelector("#Fechar-AdicionarTroféus")

  BotãoAdicionarTroféus.onclick = function () {
    ModalAdicionarTroféus.show()
  }

  BotãoFecharModalAdicionarTroféus.onclick = function () {
    ModalAdicionarTroféus.close()
  }


});