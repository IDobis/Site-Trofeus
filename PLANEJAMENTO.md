# Planejamento — Site Trofeus (Platinadores)

**Última atualização deste documento:** 2026-05-11 (backlog arquitetura §5.1–5.4)  
**Objetivo do projeto:** aprendizado de desenvolvimento web front-end com stack mínima e controle total do código.

---

## 1. Regras fixas (não negociáveis)

| Regra | Descrição |
|--------|-----------|
| **Propósito** | Projeto **para aprendizado**; prioridade é entender o que se faz, não velocidade com abstrações pesadas. |
| **Stack** | Apenas **HTML**, **CSS** e **JavaScript nativo** (vanilla). |
| **Sem frameworks avançados** | Não usar React, Vue, Angular, Svelte, Next, etc. |
| **Sem bundler obrigatório** | Ficheiros servidos como estão (adequado a GitHub Pages ou abrir `index.html` localmente). |
| **Bibliotecas** | Evitar dependências; **toda a iconografia da interface** usa **Bootstrap Icons** (CDN). Não usar Font Awesome nem outro set de ícones em paralelo. SVG inline só onde for gráfico gerado por código (ex.: placeholders), não como ícone de UI. |
| **Dados** | Por defeito **local** (`localStorage`) até decisão explícita de backend ou BaaS. |
| **Idioma da UI** | Português (pt-BR). |
| **Convenções** | Manter estilo existente: classes em português tipo `BarraNavegacao`, variáveis CSS no `:root`, tema claro/escuro com `localStorage`. |

---

## 2. Decisões de arquitetura já tomadas

| Data | Decisão |
|------|---------|
| 2026-05-08 | Página de **login** em `login_pagina/`, layout inspirado em referência tipo IBM (formulário + coluna de arte), fundo `login_fotos/Fundo_Trofeus.png`. |
| 2026-05-08 | Painel do formulário e marca **PLATINADORES** alinhados à direita (grelha + variáveis CSS) para combinar com a composição do fundo. |
| 2026-05-08 | Botão **Login** no `index.html` navega para `login_pagina/login.html`. |
| 2026-05-11 | **Conta local** em `js/authLocal.js`: sem Supabase/servidor nesta fase; contas e sessão em `localStorage`. |
| 2026-05-11 | Cadastro com **e-mail**, **nome de utilizador** (login), **primeiro nome**, **sobrenome**, **senha**; entrada só com **utilizador + senha**. |
| 2026-05-11 | Migração automática de contas antigas `{ identificador, senha }` para o novo formato. |
| 2026-05-11 | Com sessão ativa na barra: **ícone de conta** (menu: informações da conta + sair) no canto superior **direito**; sem sessão, **Login** e **Modo escuro** na barra à direita; com sessão, **tema** no modal **Dados da conta**. |
| 2026-05-11 | **Ícones:** apenas **Bootstrap Icons**; removido Font Awesome do `index.html`; botão Google no login usa `bi-google` em vez de SVG multicolor. |
| 2026-05-11 | Correção CSS: `hidden` + `display: grid/flex` em campos de cadastro e painel de sessão; refactor de `login.js` (`definirModoCadastro`, comentários). |

## 3. Estrutura atual do repositório (referência)

```
Site-Trofeus/
├── index.html
├── script.js
├── styles.css
├── README.md
├── PLANEJAMENTO.md          ← este ficheiro
├── docs/
│   └── SISTEMA_CONTAS_LOCAL.md   ← guia detalhado do sistema de contas (localStorage)
├── js/
│   └── authLocal.js         ← contas e sessão locais
└── login_pagina/
    ├── login.html
    ├── login.css
    ├── login.js
    └── login_fotos/
        └── Fundo_Trofeus.png
```

---

## 4. Histórico de mudanças (changelog)

Formato: data — resumo.

### 2026-05-11 (planeamento: entrada + módulos + backlog)

- **PLANEJAMENTO.md:** §5.1 (index vs login + guard), §5.2 (módulos jogo/troféu/perfil/etc.), §5.3 (árvore de pastas sugerida), §5.4 (tarefas extra da revisão do repo).

### 2026-05-11 (menu da conta na barra)

- **index.html / styles.css / script.js:** com sessão, só o ícone `bi-person-circle` na barra; clique abre menu com **Informações da conta** e **Sair** (`menuContaNav`, fecho ao clicar fora ou Escape).

### 2026-05-11 (barra conta à direita + tema no modal)

- **index.html / styles.css / script.js:** com sessão, ícone `bi-person-circle` abre **menu** (informações da conta + sair) no grupo **direito** da barra; sem sessão, **Login** + **Modo escuro** à direita; **tema** também dentro do modal **Dados da conta** (`botaoTemaModalConta`).

### 2026-05-11 (ícones)

- **index.html:** removido link Font Awesome; `fas fa-plus` → `bi-plus-lg` no botão Adicionar jogo.
- **login.html / login.css:** SVG do Google → `<i class="bi bi-google">`; classe `.IconeBotaoLoginExterno`.

### 2026-05-11 (tarde)

- **docs/SISTEMA_CONTAS_LOCAL.md:** guia longo para aprendizado (chaves, JSON, modos UI, bug do `hidden`).
- **login.css:** `.GridCadastroExtras[hidden]` e `.PainelSessaoAtiva[hidden]` com `display: none !important`.
- **login.js:** refactor (`definirModoCadastro`, `sincronizarInterfaceModo`, `aplicarEstadoSessao`); repor modo login ao sair da sessão no painel; comentários em PT; `data-modo` e `aria-*` no botão de alternar.
- **login.html:** `data-modo` no bloco do formulário; `aria-expanded` / `aria-controls` no alternar modo.

### 2026-05-11

- Documento **PLANEJAMENTO.md** criado com regras, decisões, changelog e todos.
- Conta local: `authLocal.js` com modelo completo (e-mail, username, nomes, senha).
- `login.html` / `login.js`: fluxo **Entrar** vs **Criar conta**; campos extra no cadastro; grelha responsiva no bloco de cadastro.
- `index.html` / `script.js`: menu da conta (ícone) + **Sair**; modal **Dados da conta** (`janelaDadosConta`).
- `styles.css`: estilos do modal de conta e `.GrupoContaLogada`.
- `login.css`: `.GridCadastroExtras`, ajuste `.BotaoComoLink`.
- `README.md`: secção de login e conta local atualizada; link no topo para **PLANEJAMENTO.md**.

### 2026-05-08

- Implementação da **tela de login** (HTML/CSS) e ligação ao fundo em `login_fotos/`.
- Ajuste de posicionamento do painel de login / marca (mais à direita).
- Redirecionamento do botão Login para `login_pagina/login.html` (via `script.js`).
- Primeira versão de **autenticação só local** (evoluída em 2026-05-11 para username + e-mail + nomes + modal Conta).

---

## 5. Roadmap e tarefas (todos)

Atualizar este bloco sempre que uma tarefa começar ou terminar. Legenda: `[x]` feito · `[ ]` por fazer. **Backlog detalhado (entrada, módulos, pastas, extras):** §5.1 a §5.4.

### Curto prazo (aprendizado + coerência)

- [x] Regras de stack (HTML/CSS/JS nativo) declaradas por escrito — **2026-05-11**
- [x] Planejamento + changelog + todos neste `.md` — **2026-05-11**
- [ ] Opcional: associar **dados do Platinadores** (perfil/jogos) ao `username` logado (namespaces em `localStorage` por utilizador).
- [ ] Opcional: campos extra no cadastro (ex.: país, empresa) alinhados à referência IBM, se quiseres paridade visual.
- [ ] Revisão de **acessibilidade** (labels, foco no modal, `aria-live` em erros de login).
- [x] Corrigir alternância login/cadastro (CSS `hidden` vs `display: grid/flex`) — **2026-05-11**
- [x] Documentar sistema de contas em **docs/SISTEMA_CONTAS_LOCAL.md** — **2026-05-11**
- [x] Pequena secção no **README** (links para `PLANEJAMENTO.md` e `docs/SISTEMA_CONTAS_LOCAL.md`) — **2026-05-11**

### Médio prazo (ainda dentro das regras)

- [ ] Refatorar `script.js` em **módulos** — hoje ~1000+ linhas num único ficheiro; ver **§5.2** para um plano em pastas (sem bundler: vários `<script defer>` ou um `type="module"` + `import`, ambos válidos em GitHub Pages).
- [ ] Testar em **GitHub Pages** (caminhos relativos, `authLocal`, imagens).
- [ ] Melhorar mensagens de validação no login (sem `alert` onde couber `MensagemFormulario`).

### Explícito fora de escopo (até nova decisão)

- [ ] ~~Framework SPA~~ — não alinhado às regras atuais.
- [ ] ~~Supabase / Firebase~~ — arquivado como “possível futuro”; hoje o projeto é **local-first** por escolha.

---

### 5.1 Entrada do site (`index` vs login) — tarefas para fazeres

Objetivo: deixar de ter o **perfil/jogos/troféus** como primeira impressão para quem ainda não entrou, e alinhar com o que esperas (entrada = login ou gate de sessão).

- [ ] **Decidir o mapa de URLs** (ex.: `index.html` = login **ou** `index.html` = redirect mínimo que manda para `login_pagina/login.html` / app).
- [ ] **Página “app” separada:** mover o conteúdo atual do `index.html` (perfil, lista de jogos, modais) para algo como `plataforma.html` ou `app/perfil.html` — nome à tua escolha; atualizar todos os `href` e `location.href` (`login.js`, botão Login na barra, redirect pós-login, etc.).
- [ ] **Guard de sessão:** na página da app, ao carregar, se não houver `platinadores_sessao_local` (ou API equivalente em `authLocal.js`), redirecionar para a entrada/login; no login, se já houver sessão, redirecionar direto para a app (evita passos extra).
- [ ] **GitHub Pages:** o servidor estático usa `index.html` na raiz do site — confirma que o ficheiro que fica na raiz é o que queres como “porta de entrada” e que os caminhos relativos (`js/`, `login_pagina/`) continuam corretos.
- [ ] **Documentar** no `README.md` e em `docs/SISTEMA_CONTAS_LOCAL.md` o fluxo final (abrir site → login → app).

### 5.2 Modularização (jogo, troféu, perfil, UI) — tarefas para fazeres

Objetivo: parar de manter tudo no `index.html` + `script.js` + `styles.css` monolíticos; dividir por **domínio** (jogo, troféu, perfil, conta/nav, armazenamento).

- [ ] **Inventário:** listar no papel (ou comentário no PR) blocos em `script.js` — perfil, lista jogos, CRUD troféus, modais genéricos, pesquisa, tema, barra conta — para não misturar dependências ao cortar.
- [ ] **Módulo armazenamento:** um ficheiro só com chaves `localStorage`, `carregarPerfil`/`guardarPerfil`, `carregarJogos`/`guardarJogos` (e mais tarde prefixo por `username` se fizeres a tarefa de namespaces).
- [ ] **Módulo jogo(s):** renderização da lista, adicionar/editar jogo, ações do card, pesquisa se estiver acoplada à lista.
- [ ] **Módulo troféu(s):** janela de lista de troféus, adicionar/editar troféu, placeholders de imagem se forem daqui.
- [ ] **Módulo perfil:** cabeçalho, editar perfil, menu de três pontos do perfil.
- [ ] **Módulo conta/nav/tema:** barra logado/visitante, menu da conta, modal dados, tema (barra + modal).
- [ ] **Bootstrap da app:** um `js/app/main.js` (ou nome claro) que só chama `init()` de cada módulo no `DOMContentLoaded`, em ordem definida.
- [ ] **CSS (opcional mas ajuda):** partir `styles.css` em `css/base.css`, `css/plataforma.css`, `css/modais.css` (ou por módulo) e um `@import` na folha principal **ou** vários `<link>` na página da app — evita um único ficheiro gigante.
- [ ] **HTML:** extrair modais repetitivos ou secções grandes para **templates** (outro `.html` não é include nativo sem servidor; alternativas: manter num único HTML da app por agora **ou** gerar strings a partir de um `template` em JS no módulo UI — marca o que preferes no changelog).

### 5.3 Sugestão de pastas (design de repositório — podes adaptar)

Isto é **sugestão**, não obrigatório. A ideia é cada pasta contar uma história.

```
Site-Trofeus/
├── index.html                 ← entrada (login ou redirect)
├── plataforma.html            ← exemplo: app atual (nome livre)
├── css/
│   ├── base.css
│   └── plataforma.css
├── js/
│   ├── authLocal.js
│   ├── storage.js             ← chaves + load/save
│   ├── app/
│   │   ├── main.js            ← bootstrap
│   │   ├── conta-nav-tema.js
│   │   ├── perfil.js
│   │   ├── jogos.js
│   │   └── trofeus.js
│   └── util/                  ← opcional: helpers partilhados
├── login_pagina/              ← ou fundir login na raiz no passo da §5.1
└── docs/
```

Se usares **`type="module"`**, os ficheiros em `js/app/` podem usar `import`/`export` sem bundler (cuidado: caminhos relativos e só servir por HTTP em alguns browsers para `file://`).

### 5.4 Outras tarefas importantes (análise rápida do projeto)

- [ ] **Dados por utilizador:** hoje perfil/jogos em `localStorage` não estão isolados por conta — a tarefa “Opcional” em §5 Curto prazo; sobe prioridade se quiseres multi-utilizador real no mesmo browser.
- [ ] **Um sítio para constantes:** chaves (`perfil`, `jogos`, `tema`, etc.) num único objeto ou ficheiro `js/constants.js` para evitar typos ao modularizar.
- [ ] **Duplicação login:** existe `login_pagina/login.html` e o botão no `index` manda para lá — após mudar a entrada (§5.1), revisar se ainda precisas de dois sítios ou se consolidas numa só tela de auth.
- [ ] **Acessibilidade:** foco preso nos `<dialog>`, `aria-modal`, ordem de tab nos menus (já tens Escape no menu conta — replicar padrão noutros dropdowns se aparecerem).
- [ ] **Performance / UX:** `script.js` manipula muito DOM — após modularizar, considerar **delegação de eventos** na lista de jogos (um listener no contentor em vez de N nos cards), se notares lentidão com muitos jogos.
- [ ] **Checklist manual pré-deploy:** login, cadastro, sair, tema, adicionar jogo, abrir troféus, editar, apagar, GitHub Pages num URL real.

---

## 6. Como usar este ficheiro

1. Antes de uma sessão de trabalho: lê **§1 Regras** e **§5** (incluindo **§5.1–§5.4** se fores mexer em rotas ou modularizar).  
2. Depois de implementar algo: acrescenta linha em **§4 Changelog** com data e bullets curtos.  
3. Quando uma decisão nova surgir: linha nova em **§2 Decisões** com data.  
4. Marca `[x]` ou `[ ]` em **§5** conforme o estado real.
5. Para perceber **contas e sessão** em profundidade, lê **[docs/SISTEMA_CONTAS_LOCAL.md](docs/SISTEMA_CONTAS_LOCAL.md)**.

*Documento vivo — mantém datas ISO (AAAA-MM-DD) nas entradas novas para consistência.*
