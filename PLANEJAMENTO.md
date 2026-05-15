# Planejamento — Site Trofeus (Platinadores)

**Última atualização deste documento:** 2026-05-14 (módulos JS por domínio em `js/`)  
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
| 2026-05-15 | **Dados por utilizador:** perfil/jogos em `platinadores_perfil_<username>` e `platinadores_jogos_<username>`; visitante `__visitante`; migração das chaves legadas `perfil`/`jogos` (`armazenamentoUsuario.js`). |
| 2026-05-14 | **Módulos por domínio** na página principal: `js/main.js` importa `Perfil.js`, `Jogos.js`, `Trofeus.js`, `Tema.js`, `ContaNav.js` e utilitários em `js/shared/` (sem bundler; GitHub Pages). |
| 2026-05-11 | Com sessão ativa na barra: **ícone de conta** (menu: informações da conta + sair) no canto superior **direito**; sem sessão, **Login** e **Modo escuro** na barra à direita; com sessão, **tema** no modal **Dados da conta**. |
| 2026-05-11 | **Ícones:** apenas **Bootstrap Icons**; removido Font Awesome do `index.html`; botão Google no login usa `bi-google` em vez de SVG multicolor. |
| 2026-05-11 | Correção CSS: `hidden` + `display: grid/flex` em campos de cadastro e painel de sessão; refactor de `login.js` (`definirModoCadastro`, comentários). |

## 3. Estrutura atual do repositório (referência)

```
Site-Trofeus/
├── index.html
├── styles.css
├── README.md
├── PLANEJAMENTO.md
├── docs/
│   └── SISTEMA_CONTAS_LOCAL.md
├── js/
│   ├── authLocal.js
│   ├── main.js                 ← bootstrap (DOMContentLoaded)
│   ├── shared/                 ← helpers partilhados (chaves, modais, ficheiros, tooltip, confirmação exclusão, …)
│   ├── perfil/
│   │   ├── Perfil.js
│   │   └── modules/
│   │       └── perfilPersistencia.js
│   ├── jogos/
│   │   ├── Jogos.js
│   │   └── modules/
│   │       └── jogosPersistencia.js
│   ├── trofeus/
│   │   ├── Trofeus.js
│   │   └── modules/
│   │       └── trofeusCalculos.js
│   ├── tema/
│   │   ├── Tema.js
│   │   └── modules/
│   │       └── temaDom.js
│   └── conta/
│       └── ContaNav.js
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

### 2026-05-15 (dados por utilizador no localStorage)

- **js/shared/armazenamentoUsuario.js:** chaves `platinadores_perfil_<username>` e `platinadores_jogos_<username>`; sem sessão usa `__visitante`; migração única a partir de `perfil`/`jogos` legados; perfil padrão com primeiro nome da conta quando logado.
- **Perfil.js / Jogos.js / Trofeus.js / main.js:** leem e gravam via `estado.chavesArmazenamento`.
- **docs/SISTEMA_CONTAS_LOCAL.md** §3 e **PLANEJAMENTO.md:** tarefa opcional marcada como feita.

### 2026-05-14 (módulos por domínio na app)

- **js/:** `main.js` orquestra `initTema`, `initContaNav`, `initPerfil`, `initJogos`, `initTrofeus`; pastas `shared/`, `perfil/`, `jogos/`, `trofeus/`, `tema/`, `conta/` com `modules/` onde faz sentido (persistência, cálculos, DOM do tema).
- **index.html:** mantém `type="module"` apontando a `js/main.js` (depois de `authLocal.js`).
- **docs/SISTEMA_CONTAS_LOCAL.md**, **README.md**, **PLANEJAMENTO.md** (§3, §5.2–5.3, changelog): referências alinhadas à nova árvore.

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
- [x] Opcional: associar **dados do Platinadores** (perfil/jogos) ao `username` logado (namespaces em `localStorage` por utilizador) — **2026-05-14** (`js/shared/armazenamentoUsuario.js`).
- [ ] Opcional: campos extra no cadastro (ex.: país, empresa) alinhados à referência IBM, se quiseres paridade visual.
- [ ] Revisão de **acessibilidade** (labels, foco no modal, `aria-live` em erros de login).
- [x] Corrigir alternância login/cadastro (CSS `hidden` vs `display: grid/flex`) — **2026-05-11**
- [x] Documentar sistema de contas em **docs/SISTEMA_CONTAS_LOCAL.md** — **2026-05-11**
- [x] Pequena secção no **README** (links para `PLANEJAMENTO.md` e `docs/SISTEMA_CONTAS_LOCAL.md`) — **2026-05-11**

### Médio prazo (ainda dentro das regras)

- [x] Refatorar monólito da app principal em **módulos por domínio** (`js/main.js` + `perfil/`, `jogos/`, `trofeus/`, `tema/`, `conta/`, `shared/`) — **2026-05-14**; ver **§3** e **§5.3**.
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

Objetivo: manter o `index.html` enxuto e o JS da app **dividido por domínio** (jogo, troféu, perfil, conta/nav, tema, partilhados).

- [x] **Inventário / corte por domínio:** perfil, jogos, troféus, tema, conta/nav, confirmação de exclusão e `shared/` — **2026-05-14**.
- [x] **Persistência perfil/jogos:** `perfilPersistencia.js` e `jogosPersistencia.js` (chaves em `shared/chavesArmazenamento.js`).
- [x] **Módulo jogos:** `Jogos.js` — lista, pesquisa, adicionar/editar/remover jogo, abrir janela de troféus.
- [x] **Módulo troféus:** `Trofeus.js` — lista na modal, adicionar/editar/remover, concluído; `trofeusCalculos.js` para percentagem (também usado na lista de jogos).
- [x] **Módulo perfil:** `Perfil.js` — cabeçalho, editar, menu de ações (tooltip).
- [x] **Módulo conta/nav + tema:** `ContaNav.js` e `Tema.js` (barra, menu, modal dados; tema barra + modal).
- [x] **Bootstrap da app:** `js/main.js` chama `initTema`, `initContaNav`, `initPerfil`, `initJogos`, `initTrofeus` no `DOMContentLoaded`.
- [ ] **Módulo armazenamento único (opcional):** fundir leituras em `storage.js` se preferires um único ficheiro para todas as chaves (hoje perfil/jogos estão nos módulos de cada domínio).
- [ ] **CSS (opcional mas ajuda):** partir `styles.css` em `css/base.css`, `css/plataforma.css`, `css/modais.css` (ou por módulo) e um `@import` na folha principal **ou** vários `<link>` na página da app — evita um único ficheiro gigante.
- [ ] **HTML:** extrair modais repetitivos ou secções grandes para **templates** (outro `.html` não é include nativo sem servidor; alternativas: manter num único HTML da app por agora **ou** gerar strings a partir de um `template` em JS no módulo UI — marca o que preferes no changelog).

### 5.3 Sugestão de pastas (design de repositório — podes adaptar)

Isto é **sugestão**, não obrigatório. A ideia é cada pasta contar uma história.

```
Site-Trofeus/
├── index.html                 ← entrada atual (app + barra); `type="module"` → `js/main.js`
├── styles.css
├── js/
│   ├── authLocal.js
│   ├── main.js                ← bootstrap: estado + init por domínio
│   ├── shared/                ← chaves, modais, arquivos, validação, imagens, tooltip, confirmação
│   ├── perfil/                ← Perfil.js + modules/perfilPersistencia.js
│   ├── jogos/                 ← Jogos.js + modules/jogosPersistencia.js
│   ├── trofeus/               ← Trofeus.js + modules/trofeusCalculos.js
│   ├── tema/                  ← Tema.js + modules/temaDom.js
│   └── conta/                 ← ContaNav.js
├── login_pagina/
└── docs/
```

Se no futuro moveres a app para `plataforma.html` (§5.1), mantém os mesmos caminhos relativos `js/…` ou ajusta os `import` e tags `<script>`.

### 5.4 Outras tarefas importantes (análise rápida do projeto)

- [x] **Dados por utilizador:** perfil/jogos em chaves `platinadores_perfil_<username>` e `platinadores_jogos_<username>`; visitante sem sessão usa `__visitante`; migração automática das chaves legadas `perfil`/`jogos` — **2026-05-14**.
- [ ] **Um sítio para constantes:** chaves da app (`tema`, `perfil`, `jogos`) já estão centralizadas em **`js/shared/chavesArmazenamento.js`**; rever se quiseres um único `constants.js` para mais constantes.
- [ ] **Duplicação login:** existe `login_pagina/login.html` e o botão no `index` manda para lá — após mudar a entrada (§5.1), revisar se ainda precisas de dois sítios ou se consolidas numa só tela de auth.
- [ ] **Acessibilidade:** foco preso nos `<dialog>`, `aria-modal`, ordem de tab nos menus (já tens Escape no menu conta — replicar padrão noutros dropdowns se aparecerem).
- [ ] **Performance / UX:** a lista de jogos em `Jogos.js` manipula muito DOM — considerar **delegação de eventos** no contentor da lista (um listener em vez de N nos cards), se notares lentidão com muitos jogos.
- [ ] **Checklist manual pré-deploy:** login, cadastro, sair, tema, adicionar jogo, abrir troféus, editar, apagar, GitHub Pages num URL real.

---

## 6. Como usar este ficheiro

1. Antes de uma sessão de trabalho: lê **§1 Regras** e **§5** (incluindo **§5.1–§5.4** se fores mexer em rotas ou modularizar).  
2. Depois de implementar algo: acrescenta linha em **§4 Changelog** com data e bullets curtos.  
3. Quando uma decisão nova surgir: linha nova em **§2 Decisões** com data.  
4. Marca `[x]` ou `[ ]` em **§5** conforme o estado real.
5. Para perceber **contas e sessão** em profundidade, lê **[docs/SISTEMA_CONTAS_LOCAL.md](docs/SISTEMA_CONTAS_LOCAL.md)**.

*Documento vivo — mantém datas ISO (AAAA-MM-DD) nas entradas novas para consistência.*
