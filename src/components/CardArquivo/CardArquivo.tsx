import "../../global.scss";
import "./CardArquivo.scss";

interface InputProps {
    titulo: string;
    tamanho: string;
}

function CardArquivo({ titulo, tamanho }: InputProps) {
    return (
        <div className="arq_container">
            <img src="img/DownloadPDF.svg" alt="" />
            <h5>{titulo}</h5>
            <h6>{tamanho}</h6>
        </div>
    );
}

export default CardArquivo;