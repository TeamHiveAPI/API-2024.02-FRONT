import React from 'react';

interface ArquivoDownloadProps {
  titulo: string;
  tamanho: string;
  link: string;
  tipo: string;
}

const ArquivoDownload: React.FC<ArquivoDownloadProps> = ({ titulo, tamanho, link, tipo }) => {
  const handleDownload = async (event: React.MouseEvent) => {
    event.preventDefault(); // Evita o comportamento padrão do link

    try {
      const anchor = document.createElement('a');
      anchor.href = link;

      // Obtém a extensão do link e define o nome do arquivo
      const fileExtension = link.split('.').pop();
      anchor.download = titulo.toLowerCase().endsWith(`.${fileExtension}`)
        ? titulo
        : `${titulo}.${fileExtension}`;

      document.body.appendChild(anchor); // Adiciona o link ao corpo do documento
      anchor.click(); // Simula o clique
      document.body.removeChild(anchor); // Remove o link do documento
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
      alert('Erro ao baixar o arquivo. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="arquivo_card" onClick={handleDownload} style={{ cursor: 'pointer' }}>
      <h4>{titulo}</h4>
      <p>{tamanho}</p>
      <p>{tipo}</p>
    </div>
  );
};

export default ArquivoDownload;
