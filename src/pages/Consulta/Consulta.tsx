import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "../../global.scss";
import "./Consulta.scss";
import "../../components/Input/Input.scss";

interface Projeto {
  id: number;
  referencia: string;
  dataInicio: string;
  dataTermino: string;
  coordenador: string;
  valor: number;
}

function Consulta() {
  const navigate = useNavigate();

  const [termoPesquisa, setTermoPesquisa] = useState(""); // Armazena o termo de pesquisa
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  function formatarData(data: any) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  const handleSearch = () => {
    console.log("Botão de busca foi clicado"); // Verifique no console do navegador
    axios.get('http://localhost:8080/projetos/search', {
      params: { 
        coordenador: termoPesquisa  // Aqui pode adicionar mais parâmetros
      }
    })
    .then(response => {
      console.log(response.data); // Verifique se os dados estão retornando do backend
      setProjetos(response.data);  // Armazenar os projetos retornados
    })
    .catch(error => {
      console.error("Erro ao buscar projetos:", error);
    });
  }

  useEffect(() => {
    async function carregarTabelaConsulta() {
      try {
        // Faz a requisição para obter os projetos
        const response = await axios.get("http://localhost:8080/projetos");
        setProjetos(response.data); // Atualiza o estado com os projetos retornados
      } catch (error) {
        console.error("Erro ao carregar os projetos:", error);
      }
    }
  
    carregarTabelaConsulta();
  }, [navigate]); //
  

  return (
    <>
      <Navbar />

      {/* Implementar lógica de mostrar barra depois que ter o JWT*/}

      {/* Se for um usuário, mostrar essa barra */}
      <div className="margem_10 cons_container mtop80">
        <h1>Consulta de Projetos</h1>
      </div>

      {/* Se for um admin, mostrar essa barra */}
      <div className="margem_10 cons_admin">
        <div className="cons_container cons_admin_esq">
          <h1>Consulta de Projetos</h1>
        </div>
        <div className="cons_botoes_admin">
          <button className="cons_botao_grande" onClick={() => navigate("/cadastro-projeto")}>
            <img src="img/criar_projeto.svg" />
            <p>Cadastrar Projeto</p>
          </button>
          <button className="cons_botao_grande" onClick={() => navigate("/dashboard")}>
            <img src="img/dashboard.svg" />
            <p>Dashboard</p>
          </button>
        </div>
      </div>

      <div className="margem_10 cons_container ">
        <div className="cons_barra_pesquisa">
          <input type="text" placeholder="Pesquisar" value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}/>
          <BotaoCTA img="img/pesquisa.svg" escrito="Buscar" aparencia="primario" onClick={handleSearch} />
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
      <th className="th_botao"> </th>
      <th className="th_referencia">Referência do Projeto</th>
      <th className="th_data">Início</th>
      <th className="th_data">Término</th>
      <th className="th_coordenador">Coordenador</th>
      <th className="th_valor">Valor</th>
    </tr>
  </thead>
  <tbody>
    {projetos.length > 0 ? (
      projetos.map((projeto) => (
        <tr key={projeto.id}>
          <td><img src="img/detalhe_arquivo.svg" alt="detalhe" className="detalhe_projeto" onClick={() => navigate(`/projeto/${projeto.id}`)}/></td>
          <td className="referencia">{projeto.referencia}</td>
          <td>{formatarData(projeto.dataInicio)}</td>
          <td>{projeto.dataTermino ? formatarData(projeto.dataTermino) : "Em Processo"}</td>
          <td className="coordenador">{projeto.coordenador}</td>
          <td>R${projeto.valor.toFixed(2)}</td>
        </tr>
      ))
    ) : (
    <tr className="cons_nenhum">
      <td colSpan={6}>Nenhum projeto encontrado.</td>
    </tr>
    )}
  </tbody>
</table>

    </>
  );
}

export default Consulta;
