import React from 'react';
import './SubirArquivo.scss';
import BotaoCTA from '../BotaoCTA/BotaoCTA';

interface SubirArquivoProps {
    titulo: string;
}

const SubirArquivo: React.FC<SubirArquivoProps> = ({ titulo }) => {
    return (
        <div className="subarq_subir_arquivo">
            <h2 className="subarq_titulo">{titulo}</h2>
            <div className="subarq_mensagem">
                Nenhum arquivo subido ainda.
            </div>
            <BotaoCTA escrito="Subir arquivo" aparencia='primario' img=''/>

        </div>
    );
};

export default SubirArquivo;
