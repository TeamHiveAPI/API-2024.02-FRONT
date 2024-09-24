import React, { useEffect } from "react";
import axios from "axios";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom"; // Importar o hook useNavigate
import "../../global.scss";
import "./Consulta.scss";
import "../../components/Input/Input.scss"; 

function Consulta() {
  const navigate = useNavigate(); // Instanciar o hook

  function formatarData(data: any) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  useEffect(() => {
    async function carregarTabelaConsulta() {
      try {
        const response = await axios.get("http://localhost:8080/projetos");
        const projetos = response.data;

        const tabela = document.querySelector("tbody");

        if (tabela) {
          tabela.innerHTML = ""; // Limpar o conteúdo da tabela passada

          // Itera sobre cada projeto e insere na tabela
          projetos.forEach((projeto: { id: any; referencia: any; dataInicio: any; dataTermino: any; coordenador: any; valor: number }) => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
              <td><img src="img/detalhe_arquivo.svg" class="detalhe_projeto" /></td>
              <td class="referencia_projeto">${projeto.referencia}</td>
              <td>${formatarData(projeto.dataInicio)}</td>
              <td>${formatarData(projeto.dataTermino)}</td>
              <td>${projeto.coordenador}</td>
              <td>R$${projeto.valor.toFixed(2)}</td>`;

            linha.querySelector(".detalhe_projeto")?.addEventListener("click", () => {
              navigate(`/projeto/${projeto.id}`); // Redirecionar para a página do projeto específico
            });

            tabela.appendChild(linha);
          });
        }
      } catch (error) {
        console.error("Erro ao carregar os projetos:", error);
      }
    }

    carregarTabelaConsulta();
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="margem_10 cons_container mtop80">
        <h1>Consulta de Projetos</h1>
      </div>

      <div className="margem_10 cons_container ">
        <div className="cons_barra_pesquisa">
          <input type="text" placeholder="Pesquisar" />
          <BotaoCTA img="img/pesquisa.svg" escrito="Buscar" aparencia="primario" />
        </div>
        <div className="cons_explicacao">
          <h4>Pesquise por palavras-chave. É possível pesquisar pelos seguintes tópicos:</h4>
          <div className="cons_topicos">
          <div className="cons_topicos_esq">
                <h4>Referência do Projeto</h4>
                <h4>Coordenador</h4>
                <div className="cons_topico_detalhe">
                  <h5>Classificação</h5>
                  <div>
                    <p className="cons_detalhe">• Contrato</p>
                    <p className="cons_detalhe">• Convênio</p>
                    <p className="cons_detalhe">• Patrocínio</p>
                    <p className="cons_detalhe">• Termo de Cooperação</p>
                    <p className="cons_detalhe">• Termo de Outorga</p>
                  </div>
                </div>
              </div>
              <div className="cons_topicos_dir">
                <h4>Data de Início</h4>
                <h4>Data de Término</h4>
                <div className="cons_topico_detalhe">
                  <h5>Situação do Projeto</h5>
                  <div>
                    <p className="cons_detalhe">• Projetos Não Iniciados</p>
                    <p className="cons_detalhe">• Projetos em Andamento</p>
                    <p className="cons_detalhe">• Projetos Encerrados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
        

      <table className="margem_10">
        <thead>
          <tr>
            <th> </th>
            <th>Referência do Projeto</th>
            <th>Início</th>
            <th>Término</th>
            <th>Coordenador</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {/* A função carregarTabelaConsulta vai inserir linhas aqui */}
        </tbody>
      </table>
    </>
  );
}

export default Consulta;
