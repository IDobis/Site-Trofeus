addEventListener('DOMContentLoaded', () => {

  // Puxa o game-container do HTML
  const gamecontainer = document.querySelector('.games-container');

  // Puxa o botão do HTML
  const butao = document.getElementById("addbutton");

  // Adiciona uma função ao clicar no botão
  butao.addEventListener("click", fnAddjg);

  // Função do botão
  function fnAddjg(){
    const nomejogo = prompt("Escolha o nome do Jogo.");
    if (nomejogo) {

      // Adiciona uma div e puxa ela para o container
      const gameItem = document.createElement("div");
      gameItem.className = "game-item";
      gamecontainer.appendChild(gameItem);

      // Cria o nome do jogo que você deseja adicionar e arruma ele para sua posição ideal
      const nomejogoelemento = document.createElement('h2');
      nomejogoelemento.className = "game-name";
      nomejogoelemento.textContent = nomejogo;
      gameItem.appendChild(nomejogoelemento);

    }
  }

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

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark'){
      document.body.classList.add('dark-mode');
      button.textContent = 'Modo Claro'; 

    } else {
      document.body.classList.remove('dark-mode')
      button.textContent = 'Modo Escuro'
    }
    button.addEventListener('click', toggleDarkMode);
});