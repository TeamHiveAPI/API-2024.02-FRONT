import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  
import Navbar from "../../components/Navbar/Navbar";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import SubirArquivo from "../../components/SubirArquivo/SubirArquivo";
import SecaoCima from "../../components/SecaoCima/SecaoCima";
import "../CadastroProjeto/CadastroProjeto.scss";

function CadastroProjeto() {
  
  const navigate = useNavigate(); // Inicializa o useNavigate

  // Estados para armazenar os dados do formulário
  const [projeto, setProjeto] = useState({
    referencia: "",
    situacao: "",
    empresa: "",
    coordenador: "",
    descricao: "",
    dataInicio: "",
    dataTermino: "",
    valor: "",
    classificacao: "",
  });

  // Estado para armazenar o arquivo
  const [arquivo, setArquivo] = useState<File | null>(null); // Define arquivo como null inicialmente

  // Função para capturar o arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArquivo(e.target.files[0]); // Pega o primeiro arquivo selecionado
    }
  };

  // Função para atualizar os estados com os valores do formulário
  const handleChange = (e: any) => {
    const { id, value } = e.target;

    // Verificar se o campo é o valor do projeto e fazer a conversão para número
    const newValue = id === "valor" ? parseFloat(value) || 0 : value;

    setProjeto((prevState) => ({
        ...prevState,
        [id]: newValue,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    console.log(projeto); // Verifique se a descrição está presente no objeto projeto
  
    if (arquivo && arquivo.size > 0) {
      // Se houver arquivo, envia como multipart/form-data
      const formData = new FormData();
      formData.append('projeto', JSON.stringify(projeto)); // Certifique-se de serializar o objeto
      formData.append('arquivo', arquivo);
  
      axios.post('http://localhost:8080/projetos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        alert("Projeto com arquivo cadastrado com sucesso!");
        console.log(response.data);
        navigate("/consulta"); // Redireciona para a página de consulta
      })
      .catch((error) => {
        alert("Erro ao cadastrar o projeto com arquivo.");
        console.error(error);
      });
    } else {
      // Se não houver arquivo, envia como JSON simples
      axios.post('http://localhost:8080/projetos', projeto)
      .then((response) => {
        alert("Projeto sem arquivo cadastrado com sucesso!");
        console.log(response.data);
        navigate("/consulta"); // Redireciona para a página de consulta
      })
      .catch((error) => {
        alert("Erro ao cadastrar o projeto sem arquivo.");
        console.error(error);
      });
    }
  };
  

  // Input Comentário
  const LimiteCaracteres = 2400;

  const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= LimiteCaracteres) {
      setProjeto((prevProjeto) => ({
        ...prevProjeto,
        descricao: inputValue,
      }));
    }
  };
  

  return (
    <>
      <Navbar />

      <SecaoCima titulo="Cadastrar Novo Projeto" />
      <div className="visu_container_info margem_10">
        <h2 className="cadpro_titulo">Informações Principais</h2>

        <form className="cadpro_container">
            <div className="cadpro_secao">
                <div className="cadpro_input maior">
              <label htmlFor="referencia">Referência do Projeto</label>
              <input type="text" id="referencia" placeholder="Digite aqui..." value={projeto.referencia} onChange={handleChange} />
                </div>
                <div className="cadpro_input menor">
              <label htmlFor="status">Situação do Projeto</label>
              <select id="situacao" value={projeto.situacao} onChange={handleChange}>
                <option value="">Selecione...</option>
                <option value="Projetos em Andamento">Projetos em Andamento</option>
                <option value="Projetos Encerrados">Projetos Encerrados</option>
                <option value="Projetos Não Iniciados">Projetos Não Iniciados</option>
              </select>
                </div>
            </div>
            <div className="cadpro_secao">
                <div className="cadpro_input">
                    <label htmlFor="empresa">Empresa</label>
                    <input type="text" id="empresa" placeholder="Digite aqui..." value={projeto.empresa} onChange={handleChange} />
                </div>
                <div className="cadpro_input">
                    <label htmlFor="coordenador">Coordenador</label>
                    <input type="text" id="coordenador" placeholder="Digite aqui..." value={projeto.coordenador} onChange={handleChange} />
                </div>
                <div className="cadpro_input">
                    <label htmlFor="tipo_contrato">Tipo de Contrato</label>
                     <select id="classificacao" value={projeto.classificacao} onChange={handleChange} >
                        <option value="">Selecione...</option>
                        <option value="AS, OF, PC e/ou outros">AS, OF, PC e/ou outros</option>
                        <option value="Contrato">Contrato</option>
                        <option value="Convênio">Convênio</option>
                        <option value="Patrocínio">Patrocínio</option>
                        <option value="Termo de Cooperação">Termo de Cooperação</option>
                        <option value="Termo de Outorga">Termo de Outorga</option>
                    </select>
                </div>
            </div>
            <div className="cadpro_secao">
                <div className="cadpro_input">
                    <label htmlFor="descricao">Descrição</label>
                        <div className="cadpro_input_descricao"> 
                        <textarea name="descricao" id="descricao" value={projeto.descricao} onChange={handleDescricaoChange} maxLength={LimiteCaracteres} rows={6} cols={50} />
                    </div>
                    <div className="cadpro_input_descricao_contador">
                            <p>Limite de caracteres: {projeto.descricao.length}/{LimiteCaracteres} </p>
                        </div>
                </div>
            </div>
            <div className="cadpro_secao">
                <div className="cadpro_input">
              <label htmlFor="dataInicio">Data de Início</label>
              <input type="date" id="dataInicio" value={projeto.dataInicio} onChange={handleChange} />
                </div>
                <div className="cadpro_input">
              <label htmlFor="dataTermino">Data de Término</label>
              <input type="date" id="dataTermino" value={projeto.dataTermino} onChange={handleChange} />
                </div>
                <div className="cadpro_input">
                <label htmlFor="valor">Valor do Projeto</label>
                <input 
                  type="number" 
                  id="valor"
                  placeholder="Digite aqui..." 
                  value={projeto.valor} 
                  onChange={handleChange} 
                />
              </div>
            </div>
        </form>

        <SubirArquivo titulo="Planos de Trabalho" />
        <SubirArquivo titulo="Contratos" />
        <SubirArquivo titulo="Termos Aditivos" />

        <div className="cadpro_botao_cadastrar" onClick={handleSubmit}>
          <BotaoCTA
            img="img/salvar.svg"
            escrito="Cadastrar"
            aparencia="primario"
          />
        </div>
      </div>
    </>
  );
}

export default CadastroProjeto;
