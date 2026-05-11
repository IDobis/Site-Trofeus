/**
 * Página de login / cadastro — modo local (localStorage).
 *
 * Dois modos no mesmo formulário:
 * - "login": só nome de utilizador + senha; campos extra de cadastro ocultos.
 * - "cadastro": e-mail, nomes, utilizador + senha; texto do título e botões mudam.
 *
 * O botão "Crie sua conta" / "Entrar" no subtítulo chama definirModoCadastro(),
 * nunca envia o formulário (type="button" no HTML).
 */
document.addEventListener("DOMContentLoaded", () => {
  const auth = window.platinadoresAuth;
  if (!auth) return;

  const formulario = document.querySelector(".FormularioLogin");
  const blocoFormulario = document.getElementById("blocoFormularioLogin");
  const titulo = document.getElementById("tituloLogin");
  const subtituloAntes = document.getElementById("subtituloAntes");
  const botaoAlternarModo = document.getElementById("alternarModoCadastro");
  const rotuloCampoUsuario = document.getElementById("rotuloCampoUsuario");
  const campoNomeUsuario = document.getElementById("campoNomeUsuario");
  const campoSenha = document.getElementById("campoSenha");
  const botaoOlhoSenha = document.getElementById("botaoAlternarVisibilidadeSenha");
  const iconeOlhoSenha = botaoOlhoSenha?.querySelector("i");
  const camposCadastroExtras = document.getElementById("camposCadastroExtras");
  const campoEmailCadastro = document.getElementById("campoEmailCadastro");
  const campoPrimeiroNome = document.getElementById("campoPrimeiroNome");
  const campoSobrenome = document.getElementById("campoSobrenome");
  const mensagem = document.getElementById("mensagemFormularioLogin");
  const botaoEnviar = formulario.querySelector('button[type="submit"]');
  const textoBotaoEnviar = botaoEnviar.querySelector("span");
  const botaoGoogle = document.getElementById("botaoGoogleLogin");
  const painelSessao = document.getElementById("painelSessaoAtiva");
  const rotuloSessao = document.getElementById("rotuloSessaoAtiva");
  const botaoSairPainel = document.getElementById("botaoSairPainelSessao");

  /** true = ecrã de criar conta; false = ecrã de entrar */
  let modoCadastro = false;

  function mostrarErro(texto) {
    mensagem.textContent = texto || "";
  }

  /** Volta o campo senha a tipo password e o ícone `bi-eye` (ao mudar login/cadastro). */
  function resetarCampoSenhaOculto() {
    campoSenha.type = "password";
    if (iconeOlhoSenha) {
      iconeOlhoSenha.className = "bi bi-eye";
    }
    if (botaoOlhoSenha) {
      botaoOlhoSenha.setAttribute("aria-label", "Mostrar senha");
      botaoOlhoSenha.setAttribute("aria-pressed", "false");
    }
  }

  /**
   * Atualiza título, subtítulo, visibilidade dos campos extra e texto do botão principal.
   * A visibilidade dos extras usa o atributo HTML `hidden` + regras em login.css
   * (.GridCadastroExtras[hidden] { display: none !important }).
   */
  function sincronizarInterfaceModo() {
    if (modoCadastro) {
      titulo.textContent = "Crie sua conta no Platinadores";
      subtituloAntes.textContent = "Já tem uma conta? ";
      botaoAlternarModo.textContent = "Entrar";
      textoBotaoEnviar.textContent = "Criar conta";
      rotuloCampoUsuario.textContent = "Nome de usuário (para entrar)";
      camposCadastroExtras.hidden = false;
      campoSenha.setAttribute("autocomplete", "new-password");
      blocoFormulario.dataset.modo = "cadastro";
    } else {
      titulo.textContent = "Efetue login no Platinadores";
      subtituloAntes.textContent = "Não tem uma conta? ";
      botaoAlternarModo.textContent = "Crie sua conta";
      textoBotaoEnviar.textContent = "Continuar";
      rotuloCampoUsuario.textContent = "Nome de usuário";
      camposCadastroExtras.hidden = true;
      campoSenha.setAttribute("autocomplete", "current-password");
      blocoFormulario.dataset.modo = "login";
    }
    botaoAlternarModo.setAttribute(
      "aria-expanded",
      modoCadastro ? "true" : "false"
    );
    resetarCampoSenhaOculto();
  }

  /**
   * Com sessão: mostra só o painel (sessão ativa, ir ao site, sair).
   * Sem sessão: mostra o bloco do formulário e esconde o painel por completo.
   */
  function aplicarEstadoSessao() {
    const sessao = auth.obterSessao();
    const logado = Boolean(sessao);

    if (logado && painelSessao && blocoFormulario) {
      painelSessao.hidden = false;
      blocoFormulario.hidden = true;
      rotuloSessao.textContent = sessao.username;
      return;
    }

    if (painelSessao && blocoFormulario) {
      painelSessao.hidden = true;
      blocoFormulario.hidden = false;
      modoCadastro = false;
      mostrarErro("");
      sincronizarInterfaceModo();
    }
  }

  /**
   * Alterna entre criar conta e entrar (só altera UI; não grava nada).
   */
  function definirModoCadastro(ativo) {
    modoCadastro = ativo;
    mostrarErro("");
    sincronizarInterfaceModo();
  }

  botaoAlternarModo.addEventListener("click", () => {
    definirModoCadastro(!modoCadastro);
  });

  aplicarEstadoSessao();

  if (botaoSairPainel) {
    botaoSairPainel.addEventListener("click", () => {
      auth.sair();
      aplicarEstadoSessao();
    });
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mostrarErro("");
    const usuario = campoNomeUsuario.value;
    const senha = campoSenha.value;
    const resultado = modoCadastro
      ? auth.registrar({
          email: campoEmailCadastro.value,
          username: usuario,
          primeiroNome: campoPrimeiroNome.value,
          sobrenome: campoSobrenome.value,
          senha,
        })
      : auth.entrar(usuario, senha);
    if (!resultado.ok) {
      mostrarErro(resultado.erro);
      return;
    }
    window.location.href = "../index.html";
  });

  if (botaoGoogle) {
    botaoGoogle.addEventListener("click", () => {
      window.alert(
        "O login com Google precisa de um serviço na internet. Neste projeto as contas são só locais, neste computador."
      );
    });
  }

  document.querySelectorAll('[data-acao="esqueciSenha"]').forEach((el) => {
    el.addEventListener("click", (evento) => {
      evento.preventDefault();
      window.alert(
        "Com contas locais não há recuperação de senha. Crie outra conta ou apague os dados do site nas definições do navegador (armazenamento local)."
      );
    });
  });

  document.querySelectorAll(".BotaoInfo").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.alert(
        "No modo local a sessão fica neste navegador até clicar em Sair. A caixa é só visual; não há servidor para guardar preferências remotas."
      );
    });
  });

  if (botaoOlhoSenha && campoSenha && iconeOlhoSenha) {
    botaoOlhoSenha.addEventListener("click", () => {
      const mostrar = campoSenha.type === "password";
      campoSenha.type = mostrar ? "text" : "password";
      iconeOlhoSenha.className = mostrar ? "bi bi-eye-slash" : "bi bi-eye";
      botaoOlhoSenha.setAttribute(
        "aria-label",
        mostrar ? "Ocultar senha" : "Mostrar senha"
      );
      botaoOlhoSenha.setAttribute("aria-pressed", mostrar ? "true" : "false");
    });
  }
});
