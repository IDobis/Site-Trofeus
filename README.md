# Site Trofeus

Decisões técnicas, regras de stack e tarefas: **[PLANEJAMENTO.md](PLANEJAMENTO.md)**.  
Contas só no navegador (`localStorage`), sem base de dados: **[docs/SISTEMA_CONTAS_LOCAL.md](docs/SISTEMA_CONTAS_LOCAL.md)**.

Meu site de troféus de Jogos, a criação do site foi feita para ver minhas platinas e também dentro dele pode-se ver o jeito mais fácil de conquistar cada troféu, visto que na própria steam não temos uma boa descrição de cada troféu.

Para a criação dele utilizei:
HTML (HyperText Markup Language), Dentro do HTML estruturei o código e defini cada elemento;
CSS (Cascading Style Sheets) Dentro do CSS usei um Método de layout chamado Flexbox para moldar o site com a estilização de cada elemento, com colaração, animações e transições, o flexbox me ajudou bastante na questão de design responsivo, com isso ficou exelente o redimensionamento do site;
JavaScript (ES modules em `js/main.js`: pastas `perfil/`, `jogos/`, `trofeus/`, `tema/`, `conta/` e utilitários em `shared/`), para os botões, modais e armazenamento local (tema, perfil, jogos e troféus).

Para sua utilização abra o arquivo `index.html`: verá o perfil, as platinas e a porcentagem de cada jogo. Na barra superior, o link **PLATINADORES** leva ao início; sem sessão, **Login** e o botão de **tema** (claro/escuro) ficam à direita. Com sessão, o tema pode ser alterado no modal **Conta** → **Dados da conta**. Mais abaixo há os troféus e, no rodapé, **Voltar ao topo**.

## Login e conta (tudo local)

O botão **Login** abre `login_pagina/login.html`. As contas ficam só no **navegador** (`localStorage`), sem servidor. Para **criar conta** são pedidos: e-mail, nome de utilizador (é com ele que se entra), primeiro nome, sobrenome e senha (mínimo 4 caracteres). Para **entrar** usa-se só nome de utilizador e senha. Depois de logado, no `index.html` o **Login** e o tema da barra somem e, **à direita**, aparece só o **ícone de conta** (Bootstrap `person-circle`): ao clicar abre um menu com **Informações da conta** (modal com dados e **tema** do site, sem mostrar a senha) e **Sair** (volta ao login). Noutro PC ou browser não há a mesma conta.
