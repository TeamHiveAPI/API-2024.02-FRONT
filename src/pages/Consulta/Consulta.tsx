import React, { useEffect } from "react";
import axios from "axios";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import "../../global.scss";
import "./Consulta.scss";
import "../../components/Input/Input.scss"; 

function Consulta() {

  function formatarData(data: any) {
    const [ano, mes, dia] = data.split('-');
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
          projetos.forEach((projeto: { referencia: any; dataInicio: any; dataTermino: any; coordenador: any; valor: number; }) => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
              <td><img src="img/detalhe_arquivo.svg" /></td>
              <td class="referencia_projeto">${projeto.referencia}</td>
              <td>${formatarData(projeto.dataInicio)}</td>
              <td>${formatarData(projeto.dataTermino)}</td>
              <td>${projeto.coordenador}</td>
              <td>R$${projeto.valor.toFixed(2)}</td> ` ;

            tabela.appendChild(linha);
          });
        }
      } catch (error) {
        console.error("Erro ao carregar os projetos:", error);
      }
    }
    
    // Provisoriamente já colocar todos os projetos na tabela para fins de teste
    carregarTabelaConsulta();
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="margem_10 cons_container mtop80">
        <h1>Consulta de Projetos</h1>
      </div>

      <div className="margem_10 cons_container ">
        <Input texto="Referência do Projeto" placeholder="Digite aqui..." />
        <Input texto="Coordenador" placeholder="Digite aqui..." />
        <Input texto="Data de Início" placeholder="Digite aqui..." />
        <Input texto="Data de Término" placeholder="Digite aqui..." />
        <Input texto="Classificação" placeholder="Digite aqui..." />
        <Input texto="Situação do Projeto" placeholder="Digite aqui..." />
        <BotaoCTA img="img/pesquisa.svg" escrito="Buscar" aparencia="primario"/>
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

        {/* A função CarregarTabelaConsulta vai inserir linhas aqui */}

        </tbody>
      </table>
    </>
  );
}

export default Consulta;