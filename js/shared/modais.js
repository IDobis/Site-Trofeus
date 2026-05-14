export function abrirJanela(janela) {
  if (!janela.open) {
    janela.showModal();
  }
}

export function fecharJanela(janela) {
  if (janela.open) {
    janela.close();
  }
}
