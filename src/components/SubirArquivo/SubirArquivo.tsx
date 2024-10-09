import React, { useState } from 'react';
import './SubirArquivo.scss';
import BotaoCTA from '../BotaoCTA/BotaoCTA';

interface SubirArquivoProps {
    titulo: string;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Recebe a função de mudança de arquivo
}

const SubirArquivo: React.FC<SubirArquivoProps> = ({ titulo, onFileChange }) => {
    const [nomeArquivo, setNomeArquivo] = useState<string | null>(null);

    const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNomeArquivo(e.target.files[0].name); // Atualiza o nome do arquivo selecionado
            onFileChange(e); // Chama a função passada por props para atualizar o estado no componente pai
        }
    };

    const triggerFileInput = () => {
        const fileInput = document.getElementById(`upload-${titulo}`);
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileRemove = () => {
        setNomeArquivo(null); // Remove o nome do arquivo
        onFileChange({ target: { files: null } } as React.ChangeEvent<HTMLInputElement>); // Chama a função passada por props para atualizar o estado no componente pai
    };

    return (
        <div className="subarq_container">
            <h2 className="subarq_titulo">{titulo}</h2>
            <div className="subarq_mensagem">
                {nomeArquivo ? `Arquivo selecionado: ${nomeArquivo}` : "Nenhum arquivo subido ainda."}
                <button className="subarq_remove" onClick={handleFileRemove}>X</button>
            </div>
            <input
                type="file"
                id={`upload-${titulo}`}
                style={{ display: 'none' }}
                onChange={handleFileSelection}
            />
            <label htmlFor={`upload-${titulo}`}>
                <BotaoCTA img="/img/nuvem_upload.svg" escrito="Subir arquivo" aparencia="primario" onClick={triggerFileInput} />
            </label>
        </div>
    );
};

export default SubirArquivo;
