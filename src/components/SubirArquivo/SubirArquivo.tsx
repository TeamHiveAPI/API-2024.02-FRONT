import React, { useState } from 'react';
import './SubirArquivo.scss';

interface SubirArquivoProps {
    titulo: string;
    onRemove: () => void; // Função para remover o componente
}

const SubirArquivo: React.FC<SubirArquivoProps> = ({ titulo, onRemove }) => {
    return (
        <div className="subarq_container">
            <div className="subarq_cima">
                <div className="subarq_mensagem">
                    {`${titulo}`}
                </div>
                <div>
                    <div className="subarq_remove" onClick={onRemove}>
                        <img src="/img/fechar.svg" alt="Fechar" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubirArquivo;
