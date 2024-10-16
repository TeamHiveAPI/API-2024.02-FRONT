import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import CardArquivo from "../../components/CardArquivo/CardArquivo";
import Navbar from "../../components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para pegar o ID da URL
import api from "../../utils/axiosConfig";
import SecaoCima from "../../components/SecaoCima/SecaoCima";
import { jwtDecode } from 'jwt-decode'; // Importar a biblioteca jwt-decode
import "./VisualizacaoProjeto.scss";
import ArquivoUpload from "../../components/ArquivoUpload/ArquivoUpload";

function VisualizacaoProjeto() {

  const { id } = useParams(); // Captura o id da URL
  const [projeto, setProjeto] = useState<any>(null); // Estado para armazenar o projeto
  const [admin, setAdmin] = useState<string>("nao"); // Estado para verificar se o usuário é admin

  const arquivos = projeto?.arquivos || [];

  useEffect(() => {
    window.scrollTo(0, 0);

    // Verificar se o JWT está no localStorage
    const token = localStorage.getItem("token"); // Troque "jwt" pelo nome da chave que você está usando
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decodifica o token
        // Verifica se a role é admin
        if (decodedToken.role === "ROLE_ADMIN") {
          setAdmin("sim");
        } else {
          setAdmin("nao");
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }

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

  interface Arquivo {
    id: number;
    nome: string;
    tamanho: number;
    url: string;
}

  interface Projeto {
    arquivos?: Arquivo[];
}

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
                    {arquivos.map((arquivo: Arquivo) => (
                        <ArquivoUpload
                            key={arquivo.id}
                            titulo={arquivo.nome}
                            tamanho={(arquivo.tamanho / 1024 / 1024).toFixed(2) + 'MB'}
                            link={arquivo.url}
                            tipo={"Mudar Aqui"}
                        />
                    ))}
                    </div>
                </div>
            )}
    </>
  );
}

export default VisualizacaoProjeto;
