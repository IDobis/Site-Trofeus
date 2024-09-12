addEventListener('DOMContentLoaded', () => {

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