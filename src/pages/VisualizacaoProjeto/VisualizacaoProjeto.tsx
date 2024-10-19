import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/axiosConfig";
import Navbar from "../../components/Navbar/Navbar";
import SecaoCima from "../../components/SecaoCima/SecaoCima";
import { jwtDecode } from 'jwt-decode';
import ArquivoUpload from "../../components/ArquivoUpload/ArquivoUpload";

import "./VisualizacaoProjeto.scss";

function VisualizacaoProjeto() {
  const { id } = useParams();
  const [projeto, setProjeto] = useState<any>(null);
  const [admin, setAdmin] = useState<string>("nao");

  const arquivos = projeto?.arquivos || [];

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.role === "ROLE_ADMIN") {
          setAdmin("sim");
        } else {
          setAdmin("nao");
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }

    async function carregarProjeto() {
      try {
        const response = await api.get(`http://localhost:8080/projetos/${id}`);
        setProjeto(response.data);
      } catch (error) {
        console.error("Erro ao carregar o projeto:", error);
      }
    }

    carregarProjeto();
  }, [id]);

  if (!projeto) {
    return <p>Carregando...</p>;
  }

  interface Arquivo {
    id: number;
    nome: string;
    tamanho: number;
    url: string;
    tipoDocumento: string;
  }

  const formatarTipoDocumento = (tipoDocumento: string) => {
    return tipoDocumento.replace(/_/g, " ").toUpperCase();
  };

  const ordenarArquivos = (arquivos: Arquivo[]) => {
    const prioridade: { [key: string]: number } = {
      PLANO_DE_TRABALHO: 1,
      TERMO_ADITIVO: 2,
      CONTRATOS: 3,
    };

    return arquivos.sort((a, b) => {
      const prioridadeA = prioridade[a.tipoDocumento] || 99;
      const prioridadeB = prioridade[b.tipoDocumento] || 99;
      return prioridadeA - prioridadeB;
    });
  };

  // Função para baixar o arquivo
  const handleDownload = async (nome: string) => {
    try {
        const response = await api.get(`/projetos/download/${nome}`, {
            responseType: 'blob' // Garante que a resposta seja tratada como um arquivo binário
        });

        if (!response || response.status !== 200) {
            throw new Error('Erro ao fazer o download');
        }

        const blob = new Blob([response.data]); // Converte o arquivo recebido em um blob
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob); // Cria uma URL para o blob
        link.download = nome; // Define o nome do arquivo ao baixar
        document.body.appendChild(link);
        link.click(); // Simula o clique para baixar o arquivo
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href); // Libera a URL após o uso

    } catch (error) {
        console.error("Erro ao baixar o arquivo:", error);
        alert('Erro ao baixar o arquivo. Tente novamente mais tarde.');
    }
};

  return (
    <>
      <Navbar />

      <SecaoCima titulo="Informações do Projeto" admin={admin} projetoID={id} />

      <div className="visu_container_info margem_10">
        <div className="visu_info_linha">
          <h3>Referência do Projeto</h3>
          <p>{projeto.referencia}</p>
        </div>
        <hr className="divisoria" />
        <div className="visu_info_linha">
          <h3>Empresa</h3>
          <p>{projeto.empresa}</p>
        </div>
        <hr className="divisoria" />
        <div className="visu_info_linha">
          <h3>Descrição</h3>
          <p>{projeto.descricao}</p>
        </div>
        <hr className="divisoria" />
        <div className="visu_info_linha">
          <h3>Coordenador</h3>
          <p>{projeto.coordenador}</p>
        </div>
        <hr className="divisoria" />
        <div className="visu_info_linha">
          <h3>Valor do Projeto</h3>
          <p>R${projeto.valor.toFixed(2)}</p>
        </div>
        <hr className="divisoria" />
        <div className="visu_info_linha">
          <h3>Data de Início</h3>
          <p>{projeto.dataInicio}</p>
        </div>
        <hr className="divisoria" />
        <div className="visu_info_linha">
          <h3>Data de Término</h3>
          <p>{projeto.dataTermino}</p>
        </div>
      </div>

      {arquivos.length > 0 && (
        <div className="visu_container_info arquivo margem_10">
          <h2 className="visu_arquivo_titulo">Arquivos Anexados</h2>
          <div className="visu_arquivo_container">
            {ordenarArquivos(arquivos).map((arquivo: Arquivo) => (
              <ArquivoUpload
                key={arquivo.id}
                titulo={arquivo.nome}
                tamanho={(arquivo.tamanho / 1024 / 1024).toFixed(2) + 'MB'}
                link={arquivo.url}
                tipo={formatarTipoDocumento(arquivo.tipoDocumento)}
                onDownload={() => handleDownload(arquivo.nome)} // Passa apenas o nome do arquivo
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default VisualizacaoProjeto;
