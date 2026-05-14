import { abrirJanela, fecharJanela } from "../shared/modais.js";

export function initContaNav({ refs }) {
  const {
    botaoLogin,
    grupoContaUsuarioDireita,
    botaoAbrirMenuContaNav,
    menuContaNav,
    botaoDadosConta,
    botaoSairConta,
    janelaDadosConta,
    botaoFecharDadosConta,
    botaoFecharDadosContaRodape,
    dadoContaUsuario,
    dadoContaEmail,
    dadoContaPrimeiroNome,
    dadoContaSobrenome,
    botaoTemaBarra
  } = refs;

  function atualizarBarraConta() {
    const auth = window.platinadoresAuth;
    const sessao =
      auth && typeof auth.obterSessao === "function" ? auth.obterSessao() : null;
    const logado = Boolean(sessao);
    if (botaoLogin) botaoLogin.hidden = logado;
    if (botaoTemaBarra) botaoTemaBarra.hidden = logado;
    if (grupoContaUsuarioDireita) grupoContaUsuarioDireita.hidden = !logado;
    if (!logado) fecharMenuContaNav();
  }

  function preencherModalDadosConta() {
    const auth = window.platinadoresAuth;
    const dados =
      auth && typeof auth.obterDadosContaSessao === "function"
        ? auth.obterDadosContaSessao()
        : null;
    if (!dados || !dadoContaUsuario) return;
    dadoContaUsuario.textContent = dados.username;
    dadoContaEmail.textContent = dados.email;
    dadoContaPrimeiroNome.textContent = dados.primeiroNome;
    dadoContaSobrenome.textContent = dados.sobrenome;
  }

  function fecharMenuContaNav() {
    if (!menuContaNav || !botaoAbrirMenuContaNav) return;
    menuContaNav.hidden = true;
    botaoAbrirMenuContaNav.setAttribute("aria-expanded", "false");
  }

  function abrirMenuContaNav() {
    if (!menuContaNav || !botaoAbrirMenuContaNav) return;
    menuContaNav.hidden = false;
    botaoAbrirMenuContaNav.setAttribute("aria-expanded", "true");
  }

  function alternarMenuContaNav() {
    if (!menuContaNav || !botaoAbrirMenuContaNav) return;
    if (menuContaNav.hidden) abrirMenuContaNav();
    else fecharMenuContaNav();
  }

  if (botaoLogin) {
    botaoLogin.addEventListener("click", () => {
      window.location.href = "login_pagina/login.html";
    });
  }

  if (botaoAbrirMenuContaNav) {
    botaoAbrirMenuContaNav.addEventListener("click", (evento) => {
      evento.stopPropagation();
      alternarMenuContaNav();
    });
  }

  document.addEventListener("click", () => {
    if (menuContaNav && !menuContaNav.hidden) fecharMenuContaNav();
  });

  document.addEventListener("keydown", (evento) => {
    if (
      evento.key === "Escape" &&
      menuContaNav &&
      !menuContaNav.hidden &&
      botaoAbrirMenuContaNav
    ) {
      fecharMenuContaNav();
      botaoAbrirMenuContaNav.focus();
    }
  });

  if (botaoDadosConta && janelaDadosConta) {
    botaoDadosConta.addEventListener("click", () => {
      fecharMenuContaNav();
      preencherModalDadosConta();
      abrirJanela(janelaDadosConta);
    });
  }

  if (botaoSairConta) {
    botaoSairConta.addEventListener("click", () => {
      fecharMenuContaNav();
      if (window.platinadoresAuth) window.platinadoresAuth.sair();
      if (janelaDadosConta) fecharJanela(janelaDadosConta);
      window.location.href = "login_pagina/login.html";
    });
  }

  if (botaoFecharDadosConta && janelaDadosConta) {
    botaoFecharDadosConta.addEventListener("click", () =>
      fecharJanela(janelaDadosConta)
    );
  }
  if (botaoFecharDadosContaRodape && janelaDadosConta) {
    botaoFecharDadosContaRodape.addEventListener("click", () =>
      fecharJanela(janelaDadosConta)
    );
  }

  return { atualizarBarraConta };
}
