import React, { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";
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

  const [ativo, setAtivo] = useState('Tudo'); // Inicialmente "Tudo" está ativo

  const handleBotaoPesquisa = (nome: any) => {
    setAtivo(nome); // Define o botão clicado como ativo
  };

  const [termoPesquisa, setTermoPesquisa] = useState(""); // Armazena o termo de pesquisa
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  function formatarData(data: any) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  const handleSearch = () => {
    console.log("Botão de busca foi clicado"); // Verifique no console do navegador
    api.get('http://localhost:8080/projetos/search', {
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
        const response = await api.get("http://localhost:8080/projetos");
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
      <div className="margem_10 cons_container mtop80 align_center">
        <h1>Consulta de Projetos</h1>
      </div>
  
      {/* Se for um admin, mostrar essa barra */}
      <div className="margem_10 cons_admin">
        <div className="cons_container cons_admin_esq">
          <h1>Consulta de Projetos</h1>
        </div>
        <div className="cons_botoes_admin">
          <button className="cons_botao_grande" onClick={() => navigate("/cadastro-projeto")}>
            <img src="img/criar_projeto.svg" alt="Cadastrar Projeto"/>
            <p>Cadastrar Projeto</p>
          </button>
          <button className="cons_botao_grande" onClick={() => navigate("/dashboard")}>
            <img src="img/dashboard.svg" alt="Dashboard"/>
            <p>Dashboard</p>
          </button>
        </div>
      </div>
  
      <div className="margem_10 cons_container">
        <div className="cons_barra_pesquisa">
          <input
            type="text"
            placeholder="Pesquisar"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />
          <BotaoCTA img="img/pesquisa.svg" escrito="Buscar" aparencia="primario" onClick={handleSearch} />
        </div>
        <div className="cons_botao_pesquisa_container">
          <button className={`cons_botao_pesquisa ${ativo === 'Tudo' ? 'ativo' : ''}`}onClick={() => handleBotaoPesquisa('Tudo')}> Tudo </button>
          <button className={`cons_botao_pesquisa ${ativo === 'Ref. Projeto' ? 'ativo' : ''}`} onClick={() => handleBotaoPesquisa('Ref. Projeto')}> Ref. Projeto </button>
          <button className={`cons_botao_pesquisa ${ativo === 'Coordenador' ? 'ativo' : ''}`} onClick={() => handleBotaoPesquisa('Coordenador')}> Coordenador </button>
          <button className={`cons_botao_pesquisa ${ativo === 'Contratante' ? 'ativo' : ''}`} onClick={() => handleBotaoPesquisa('Contratante')}>Contratante </button>
          <button className={`cons_botao_pesquisa ${ativo === 'Data de Início' ? 'ativo' : ''}`} onClick={() => handleBotaoPesquisa('Data de Início')}> Data de Início </button>
          <button className={`cons_botao_pesquisa ${ativo === 'Data de Término' ? 'ativo' : ''}`} onClick={() => handleBotaoPesquisa('Data de Término')}> Data de Término </button>
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
                <td>
                  <img
                    src="img/detalhe_arquivo.svg"
                    alt="detalhe"
                    className="detalhe_projeto"
                    onClick={() => navigate(`/projeto/${projeto.id}`)}
                  />
                </td>
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
