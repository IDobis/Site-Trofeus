export function definirMensagemCampo(elementoMensagem, texto, erro = false) {
  elementoMensagem.textContent = texto;
  elementoMensagem.classList.toggle("ErroCampo", erro);
}

export function limparMensagemCampo(elementoMensagem) {
  definirMensagemCampo(elementoMensagem, "", false);
}

export function validarLimiteCaracteres(campo, elementoMensagem, limite) {
  if (campo.value.length >= limite) {
    definirMensagemCampo(
      elementoMensagem,
      `Máximo de ${limite} caracteres atingido.`,
      false
    );
    return;
  }

  if (elementoMensagem.classList.contains("ErroCampo")) {
    limparMensagemCampo(elementoMensagem);
  } else {
    definirMensagemCampo(elementoMensagem, "", false);
  }
}
