import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import CardArquivo from "../../components/CardArquivo/CardArquivo";
import Navbar from "../../components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para pegar o ID da URL
import api from "../../utils/axiosConfig";
import SecaoCima from "../../components/SecaoCima/SecaoCima";
import "./VisualizacaoProjeto.scss";

function VisualizacaoProjeto() {
  const { id } = useParams(); // Captura o id da URL
  const [projeto, setProjeto] = useState<any>(null); // Estado para armazenar o projeto

  useEffect(() => {
    window.scrollTo(0, 0);

    // Função para buscar os detalhes do projeto
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

  return (
    <>
      <Navbar />

      <SecaoCima titulo="Informações do Projeto" admin="sim" projetoID={id} />

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
      {/* Outros componentes, como arquivos e termos aditivos */}
    </>
  );
}

export default VisualizacaoProjeto;