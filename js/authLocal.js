/**
 * Contas e sessão só no navegador (localStorage).
 * Conta: nome de usuário (login), e-mail, nome, sobrenome e senha.
 * Migra contas antigas no formato { identificador, senha }.
 *
 * Documentação para aprendizado: docs/SISTEMA_CONTAS_LOCAL.md
 */
(function () {
  const CHAVE_CONTAS = "platinadores_contas_local";
  const CHAVE_SESSAO = "platinadores_sessao_local";

  function normalizarUsername(texto) {
    return String(texto || "").trim().toLowerCase();
  }

  function normalizarEmail(texto) {
    return String(texto || "").trim().toLowerCase();
  }

  function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
  }

  function usernameValido(username) {
    const u = String(username || "").trim();
    if (u.length < 3 || u.length > 32) return false;
    return /^[a-zA-Z0-9._-]+$/.test(u);
  }

  function migrarContaLegada(conta) {
    if (conta.username != null && conta.email != null) {
      return {
        username: normalizarUsername(conta.username),
        email: normalizarEmail(conta.email),
        primeiroNome: String(conta.primeiroNome || "").trim(),
        sobrenome: String(conta.sobrenome || "").trim(),
        senha: conta.senha,
      };
    }
    if (conta.identificador != null) {
      const id = String(conta.identificador).trim();
      const email = id.includes("@") ? normalizarEmail(id) : "";
      return {
        username: normalizarUsername(id),
        email,
        primeiroNome: "",
        sobrenome: "",
        senha: conta.senha,
      };
    }
    return conta;
  }

  function lerContas() {
    try {
      const bruto = localStorage.getItem(CHAVE_CONTAS);
      if (!bruto) return [];
      const lista = JSON.parse(bruto);
      if (!Array.isArray(lista)) return [];
      const migradas = lista.map(migrarContaLegada);
      const serialAntigo = JSON.stringify(lista);
      const serialNovo = JSON.stringify(migradas);
      if (serialAntigo !== serialNovo) {
        localStorage.setItem(CHAVE_CONTAS, serialNovo);
      }
      return migradas;
    } catch {
      return [];
    }
  }

  function gravarContas(lista) {
    localStorage.setItem(CHAVE_CONTAS, JSON.stringify(lista));
  }

  function obterSessao() {
    try {
      const bruto = localStorage.getItem(CHAVE_SESSAO);
      if (!bruto) return null;
      const sessao = JSON.parse(bruto);
      if (sessao && sessao.username) {
        return { username: normalizarUsername(sessao.username) };
      }
      if (sessao && sessao.identificador) {
        return { username: normalizarUsername(sessao.identificador) };
      }
      return null;
    } catch {
      return null;
    }
  }

  function definirSessao(username) {
    localStorage.setItem(
      CHAVE_SESSAO,
      JSON.stringify({ username: normalizarUsername(username) })
    );
  }

  function sair() {
    localStorage.removeItem(CHAVE_SESSAO);
  }

  function encontrarContaPorUsername(username) {
    const u = normalizarUsername(username);
    return lerContas().find((c) => c.username === u) || null;
  }

  function obterDadosContaSessao() {
    const sessao = obterSessao();
    if (!sessao) return null;
    const conta = encontrarContaPorUsername(sessao.username);
    if (!conta) return null;
    return {
      username: conta.username,
      email: conta.email || "—",
      primeiroNome: conta.primeiroNome || "—",
      sobrenome: conta.sobrenome || "—",
    };
  }

  function registrar({ email, username, primeiroNome, sobrenome, senha }) {
    const mail = normalizarEmail(email);
    const user = normalizarUsername(username);
    const pn = String(primeiroNome || "").trim();
    const sn = String(sobrenome || "").trim();

    if (!emailValido(mail)) {
      return { ok: false, erro: "Informe um e-mail válido." };
    }
    if (!usernameValido(username)) {
      return {
        ok: false,
        erro: "Nome de usuário: 3 a 32 caracteres (letras, números, . _ -).",
      };
    }
    if (!pn) {
      return { ok: false, erro: "Preencha o primeiro nome." };
    }
    if (!sn) {
      return { ok: false, erro: "Preencha o sobrenome." };
    }
    if (!senha || String(senha).length < 4) {
      return { ok: false, erro: "Use uma senha com pelo menos 4 caracteres." };
    }

    const contas = lerContas();
    if (contas.some((c) => c.username === user)) {
      return { ok: false, erro: "Este nome de usuário já está em uso." };
    }
    if (contas.some((c) => normalizarEmail(c.email) === mail)) {
      return { ok: false, erro: "Já existe uma conta com este e-mail." };
    }

    contas.push({
      username: user,
      email: mail,
      primeiroNome: pn,
      sobrenome: sn,
      senha: String(senha),
    });
    gravarContas(contas);
    definirSessao(user);
    return { ok: true };
  }

  function entrar(username, senha) {
    const user = normalizarUsername(username);
    if (!user) {
      return { ok: false, erro: "Preencha o nome de usuário." };
    }
    const conta = encontrarContaPorUsername(user);
    if (!conta || conta.senha !== String(senha)) {
      return { ok: false, erro: "Nome de usuário ou senha incorretos." };
    }
    definirSessao(user);
    return { ok: true };
  }

  window.platinadoresAuth = {
    registrar,
    entrar,
    sair,
    obterSessao,
    obterDadosContaSessao,
  };
})();
