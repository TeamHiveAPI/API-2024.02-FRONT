import "./ArquivoUpload.scss";

interface ArquivoUploadProps {
    titulo: string;
    tamanho: string;
    link: string;
    tipo: string;
    onDownload: () => void; // Add onDownload property
}

function ArquivoUpload({ titulo, tamanho, link, tipo, onDownload }: ArquivoUploadProps) { // Inclua onDownload nos parâmetros
    const handleDownload = () => {
        onDownload(); // Chame a função de download passada como prop
    };

    // Função para verificar a extensão do arquivo e definir o ícone apropriado
    const getIconSrc = () => {
        if (titulo.toLowerCase().endsWith(".pdf")) {
            return "/img/download_PDF.svg";
        } else if (titulo.toLowerCase().endsWith(".docx")) {
            return "/img/download_DOCX.svg";
        }
    };

    return (
        <button className="up_wrapper" onClick={handleDownload}>
            <img className="up_img" src={getIconSrc()} alt="Ícone do arquivo" />
            <p className="up_titulo">{titulo}</p>
            <p className="up_azul">{tamanho}</p>
            <div className="divisoria"> </div>
            <p className="up_azul">{tipo}</p>
        </button>
    );
}

export default ArquivoUpload;
