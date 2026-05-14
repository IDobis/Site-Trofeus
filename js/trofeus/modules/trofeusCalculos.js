export function calcularPercentualConclusao(trofeus) {
  if (!trofeus.length) {
    return 0;
  }

  const totalConcluidos = trofeus.filter((trofeu) => trofeu.concluido).length;
  return (totalConcluidos / trofeus.length) * 100;
}

export function formatarPercentual(percentual) {
  if (Number.isInteger(percentual)) {
    return `${percentual}%`;
  }

  return `${percentual.toFixed(1)}%`;
}
