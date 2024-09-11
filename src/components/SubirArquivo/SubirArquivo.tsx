import React from 'react';
import './SubirArquivo.scss';
import BotaoCTA from '../BotaoCTA/BotaoCTA';

interface SubirArquivoProps {
    titulo: string;
}

const SubirArquivo: React.FC<SubirArquivoProps> = ({ titulo }) => {
    return (
        <div className="subarq_container">
            <h2 className="subarq_titulo">{titulo}</h2>
            <div className="subarq_mensagem">
                Nenhum arquivo subido ainda.
            </div>
            <BotaoCTA img="img/nuvem_upload.svg" escrito="Subir arquivo" aparencia="primario"/>

        </div>
    );
};

export default SubirArquivo;
