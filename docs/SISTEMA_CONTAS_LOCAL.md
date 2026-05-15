# Sistema de contas local (Platinadores)

**Documento para aprendizado** — explica, passo a passo, como as contas funcionam neste projeto **sem base de dados** e **sem servidor**: tudo fica no **navegador**, no `localStorage`.

**Última revisão:** 2026-05-15

---

## 1. O que é o `localStorage`?

O `localStorage` é uma **área de armazenamento** que o navegador oferece a cada **origem** (por exemplo `https://teu-site.github.io` ou `file:///.../index.html`). Lá podes guardar **texto** (strings), normalmente em formato **JSON**, que persistem mesmo depois de fechar o separador — até apagares os dados do site ou usares outro navegador.

- **Não é um servidor:** ninguém na internet “vê” esses dados; ficam no teu computador, ligados àquele site e àquele browser.
- **Não é SQL:** não há tabelas nem consultas; são pares **chave → valor** (como um dicionário).
- **Limite de tamanho:** por origem, costuma ser da ordem de **5 MB** (varia por browser) — mais que suficiente para listas pequenas de contas em JSON.

No DevTools do Chrome/Edge: **Application** (ou **Armazenamento**) → **Local Storage** → escolhe a origem → vês as chaves que o código usa.

---

## 2. Ficheiros envolvidos

| Ficheiro | Papel |
|----------|--------|
| `js/authLocal.js` | Lê e escreve contas e sessão no `localStorage`. Expõe `window.platinadoresAuth` com funções que o resto da página chama. |
| `login_pagina/login.html` | Marcação: formulário, campos extra de cadastro, painel “sessão ativa”. |
| `login_pagina/login.js` | Liga botões ao modo **login** vs **cadastro** e envia dados a `platinadoresAuth`. |
| `login_pagina/login.css` | Estilos; inclui correção para o atributo `hidden` com `display: grid` / `flex`. |
| `js/main.js` (+ módulos em `js/`) | Página principal em **módulos ES** (`type="module"`): barra **Login** / **tema** quando não há sessão; com sessão, **ícone de conta** (menu: dados da conta + sair) e **tema** no modal **Dados da conta**; redirecionamento ao sair. Ver `js/conta/ContaNav.js`, `js/tema/Tema.js`. |

**Iconografia:** em todo o site (incluindo HTML gerado em JavaScript, por exemplo listas de jogos e troféus) usam-se apenas ícones **Bootstrap Icons** (`<i class="bi bi-…">`). Não há Font Awesome nem SVG usado como ícone de botão na UI (o botão “Google” no login usa `bi-google`).

Não existe PHP, Node, Supabase nem SQL neste fluxo.

---

## 2.1 Organização do JavaScript da página principal

O `index.html` carrega `js/main.js` como **`type="module"`**. O arranque (`DOMContentLoaded`) importa:

- **`js/shared/`** — chaves de `localStorage` da app (`tema`, legado `perfil`/`jogos`), **`armazenamentoUsuario.js`** (namespace por `username`), modais genéricos, leitura de ficheiros, validação de formulário, placeholders SVG, tooltip de ações e diálogo de confirmação de exclusão.
- **`js/perfil/`** — `Perfil.js` + `modules/perfilPersistencia.js` (ler/gravar perfil).
- **`js/jogos/`** — `Jogos.js` + `modules/jogosPersistencia.js` (ler/gravar jogos; a lista de cartões e formulários de jogo).
- **`js/trofeus/`** — `Trofeus.js` + `modules/trofeusCalculos.js` (percentagem na lista de jogos e na lista de troféus).
- **`js/tema/`** — `Tema.js` + `modules/temaDom.js` (classe `modoEscuro` e preferência guardada).
- **`js/conta/ContaNav.js`** — menu da conta, modal de dados e ligações ao `window.platinadoresAuth`.

Contas e sessão continuam documentadas nas secções seguintes (`authLocal.js`).

---

## 3. Chaves usadas no `localStorage`

### Contas e sessão (`authLocal.js`)

| Chave | Conteúdo |
|--------|-----------|
| `platinadores_contas_local` | **Lista de contas** — um array JSON em texto. Cada conta tem os dados que escolheste guardar (incluindo senha em texto plano neste protótipo). |
| `platinadores_sessao_local` | **Sessão atual** — um objeto JSON mínimo que diz **qual utilizador está “entrado”** neste browser (só o `username` normalizado). |

Se apagares estas chaves nas ferramentas do programador, “desaparecem” as contas ou o estado de login, consoante o que apagares.

### Perfil e jogos (por utilizador)

Cada conta logada tem **dados próprios** de perfil e jogos/troféus, geridos em `js/shared/armazenamentoUsuario.js`:

| Padrão da chave | Exemplo | Conteúdo |
|----------------|---------|----------|
| `platinadores_perfil_<username>` | `platinadores_perfil_joao` | JSON do perfil (nome, imagem) daquele utilizador. |
| `platinadores_jogos_<username>` | `platinadores_jogos_joao` | JSON da lista de jogos e troféus daquele utilizador. |

- **Com sessão:** o `<username>` vem de `platinadoresAuth.obterSessao()` (já em minúsculas).
- **Sem sessão:** usa-se o sufixo `__visitante` (ex.: `platinadores_perfil___visitante`), para não misturar com contas reais no mesmo browser.

**Migração:** se existirem as chaves antigas globais `perfil` e `jogos` e ainda não houver dados na chave do utilizador atual, o conteúdo legado é **copiado** uma vez para o namespace correto (não apaga o legado automaticamente).

**Tema:** continua global na chave `tema` (preferência do browser, não por conta).

Chaves legadas `perfil` / `jogos` estão definidas em `js/shared/chavesArmazenamento.js` só para esta migração.

---

## 4. Formato de uma conta (objeto num array)

Cada elemento do array em `platinadores_contas_local` é um objeto parecido com:

```json
{
  "username": "meuuser",
  "email": "eu@exemplo.com",
  "primeiroNome": "João",
  "sobrenome": "Silva",
  "senha": "texto-da-senha"
}
```

- **`username`:** o que a pessoa usa para **entrar**, guardado em **minúsculas** (normalização) para não existirem dois “Ana” e “ana” diferentes.
- **`email`:** também normalizado (trim + minúsculas) para comparações.
- **`primeiroNome` / `sobrenome`:** texto livre no cadastro.
- **`senha`:** neste projeto de **aprendizado** a senha fica **em claro** no JSON. **Isto não é seguro** para dados reais na internet; serve para entender o fluxo sem montar backend com *hash*.

### Contas antigas (migração)

Antes existia só `{ "identificador", "senha" }`. Ao ler a lista, `lerContas()` converte cada item para o formato novo e, se mudou algo, **volta a gravar** a lista — assim contas antigas não “partem” o código.

---

## 5. Formato da sessão

Quando alguém faz login ou cria conta com sucesso, grava-se algo como:

```json
{ "username": "meuuser" }
```

- **`obterSessao()`** devolve `null` se não houver sessão, ou `{ username: "..." }`.
- **`sair()`** remove a chave `platinadores_sessao_local`. As contas na outra chave **mantêm-se**; só deixa de haver “quem está logado”.

---

## 6. Funções públicas (`window.platinadoresAuth`)

| Função | O que faz |
|--------|------------|
| `registrar({ email, username, primeiroNome, sobrenome, senha })` | Valida dados, verifica duplicados de e-mail/username, acrescenta à lista de contas, cria sessão. Devolve `{ ok: true }` ou `{ ok: false, erro: "mensagem" }`. |
| `entrar(username, senha)` | Procura conta pelo `username`, compara a senha (texto igual), cria sessão. |
| `sair()` | Apaga só a sessão. |
| `obterSessao()` | Diz se há alguém logado. |
| `obterDadosContaSessao()` | Para o modal “Conta” no `index.html`: devolve nome, e-mail, etc., **sem** devolver a senha. |

Toda a lógica de validação (e-mail válido, tamanho do username, etc.) está dentro de `authLocal.js`.

---

## 7. Página de login: dois modos na mesma página

Não são duas páginas diferentes: é **a mesma** `login.html` com dois **modos de interface**:

### Modo **login** (`modoCadastro === false`)

- Título: *Efetue login no Platinadores*
- Subtítulo: *Não tem uma conta?* + botão **Crie sua conta** (só muda o modo; **não** envia o formulário)
- Campos visíveis: **nome de utilizador** + **senha**
- Ao lado da senha há um botão com ícones **Bootstrap Icons** (`bi-eye` / `bi-eye-slash`): alterna entre `type="password"` e `type="text"` para ver ou ocultar o que estás a escrever (sem gravar nada extra).
- O bloco `camposCadastroExtras` (e-mail, primeiro nome, sobrenome) fica com o atributo **`hidden`**, e o CSS força `display: none !important` para não ser desenhado por cima da regra `display: grid`.

### Modo **cadastro** (`modoCadastro === true`)

- Título: *Crie sua conta no Platinadores*
- Subtítulo: *Já tem uma conta?* + botão **Entrar** (volta ao modo login)
- Mostram-se os campos extra + utilizador + senha
- O botão principal do formulário diz **Criar conta** e, no `submit`, chama `registrar(...)`.

### Por que o ecrã “não mudava” antes?

O HTML `hidden` pede ao browser para esconder o elemento. Mas o ficheiro `login.css` definia `.GridCadastroExtras { display: grid; }`. Em cascata de CSS, essa regra **do autor** podia **ganhar** ao `display: none` implícito do `hidden`, com o efeito de os campos de cadastro **sempre visíveis**. A correção foi acrescentar:

```css
.GridCadastroExtras[hidden] { display: none !important; }
```

O mesmo tipo de problema podia afetar o painel **Sessão ativa** (`.PainelSessaoAtiva { display: flex; }`), por isso também existe `.PainelSessaoAtiva[hidden] { display: none !important; }`.

---

## 8. Quando aparece “Sessão ativa”, “Ir ao Platinadores” e “Sair desta conta”

Só quando **`obterSessao()`** devolve um utilizador:

- `login.js` chama `aplicarEstadoSessao()` ao carregar a página.
- Se há sessão: `painelSessao.hidden = false` e `blocoFormularioLogin.hidden = true` → vês só o painel.
- Se não há sessão: o painel fica com `hidden = true` (e o CSS garante que não ocupa ecrã) e o formulário aparece.

Ao clicar em **Sair desta conta**, chama-se `auth.sair()` e volta-se a mostrar o formulário no modo **login** (`modoCadastro` reposto a `false`).

---

## 9. Página principal (`index.html`)

- Se **não** há sessão: vês o botão **Login** (vai para `login_pagina/login.html`) e o botão de **tema** (claro/escuro) na barra à **direita**.
- Se há sessão: o **Login** e o **tema da barra** escondem-se. No canto **superior direito** fica o ícone **`bi-person-circle`** (clique para abrir o menu): **Informações da conta** (modal com dados e **tema** do site) e **Sair** (termina a sessão e envia para `login_pagina/login.html`).

Os dados do perfil e dos jogos do Platinadores **ainda** usam outras chaves de `localStorage` (`perfil`, `jogos`, etc.) — **não** estão, neste momento, separados por utilizador. Isso pode ser um próximo passo de aprendizado (ver `PLANEJAMENTO.md`).

---

## 10. Limitações (importante para aprendizado)

1. **Segurança:** qualquer pessoa com acesso ao teu PC e ao browser pode ler o `localStorage` e ver senhas em claro.
2. **Sincronização:** outro dispositivo ou outro browser **não** tem as mesmas contas.
3. **Recuperação de senha:** não há e-mail automático nem base de dados; “esqueci a senha” no modo local significa criar nova conta ou apagar dados.

---

## 11. Como testar rapidamente

1. Abre `login_pagina/login.html`.
2. Clica **Crie sua conta** → devem aparecer e-mail e nomes; título deve mudar.
3. Clica **Entrar** → campos extra desaparecem; título volta ao login.
4. Cria uma conta válida → és redirecionado ao `index.html` com sessão.
5. Volta ao login → deves ver **Sessão ativa**; **Sair** deve voltar ao formulário de login.

Se algo não bater certo, confirma na consola se `platinadoresAuth` existe (o `authLocal.js` tem de carregar **antes** do `login.js` no HTML).

---

## 12. Onde aprofundar

- [MDN — Window.localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage)
- [MDN — O atributo hidden](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Global_attributes/hidden)

Este texto acompanha o código em `js/authLocal.js` e `login_pagina/login.js`. Se mudares chaves ou formatos, atualiza também este ficheiro.
