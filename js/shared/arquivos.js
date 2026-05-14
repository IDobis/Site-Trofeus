export function lerArquivoComoDataUrl(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();

    leitor.onload = (evento) => resolve(evento.target.result);
    leitor.onerror = () => reject(new Error("Falha ao ler o arquivo."));
    leitor.readAsDataURL(arquivo);
  });
}
