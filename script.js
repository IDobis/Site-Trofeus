addEventListener('DOMContentLoaded', () => {
  const gamecontainer = document.querySelector('.games-container');
  const butao = document.getElementById("addbutton");

  butao.addEventListener("click", (event) => {
    event.preventDefault(); // Impede o envio do formulário
    fnAddjg();
  });

  function fnAddjg() {
    const nomejogo = document.getElementById('nomeaddjogodentro').value; // Obtém o valor do input
    const file = document.getElementById('fileaddjogo').files[0]; // Obtém o arquivo selecionado

    if (nomejogo && file) {
      const gameItem = document.createElement("div");
      gameItem.className = "game-item";
      gamecontainer.appendChild(gameItem);

      const imgElemento = document.createElement('img');
      imgElemento.className = "game-img";
      imgElemento.src = URL.createObjectURL(file); // Usar a URL do objeto para a imagem
      imgElemento.alt = nomejogo;
      gameItem.appendChild(imgElemento);

      const nomejogoelemento = document.createElement('h2');
      nomejogoelemento.className = "game-name";
      nomejogoelemento.textContent = nomejogo;
      gameItem.appendChild(nomejogoelemento);

      // Limpa a entrada de arquivo
      document.getElementById('fileaddjogo').value = '';
      document.getElementById('nomeaddjogodentro').value = ''; // Limpa também o campo de nome
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
});
