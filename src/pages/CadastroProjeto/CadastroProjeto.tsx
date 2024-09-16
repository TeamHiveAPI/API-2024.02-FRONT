import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import SubirArquivo from "../../components/SubirArquivo/SubirArquivo";
import SecaoCima from "../../components/SecaoCima/SecaoCima";
import "../CadastroProjeto/CadastroProjeto.scss";

function CadastroProjeto() {

    // Estados para armazenar os dados do formulário
    const [projeto, setProjeto] = useState({
        referencia: '',
        empresa: '',
        coordenador: '',
        descricao: '',
        dataInicio: '',
        dataTermino: '',
        valorProjeto: ''
    });

    // Função para atualizar os estados com os valores do formulário
    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setProjeto((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Função para enviar o formulário para o back-end
    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post('http://localhost:8080/projetos', projeto)
            .then((response) => {
                alert("Projeto cadastrado com sucesso!");
                console.log(response.data);
            })
            .catch((error) => {
                alert("Erro ao cadastrar o projeto.");
                console.error(error);
            });
    };

    return (
      <>
        <Navbar />

        <SecaoCima titulo="Cadastrar Novo Projeto" />
        <div className="visu_container_info margem_10">
            <h2 className="testezinho">Informações Principais</h2>

            <form className="cadpro_cadastro_projeto" onSubmit={handleSubmit}>
                <div className="cadpro_input_group">
                    <label htmlFor="cadpro_referencia">Referência do Projeto</label>
                    <input type="text" id="cadpro_referencia" placeholder="Digite aqui..." value={projeto.referencia} onChange={handleChange} />
                </div>

                <div className="cadpro_input_group cadpro_horizontal">
                    <div className="cadpro_input_item">
                        <label htmlFor="cadpro_empresa">Empresa</label>
                        <input type="text" id="cadpro_empresa" placeholder="Digite aqui..." value={projeto.empresa} onChange={handleChange} />
                    </div>
                    <div className="cadpro_input_item">
                        <label htmlFor="cadpro_coordenador">Coordenador</label>
                        <input type="text" id="cadpro_coordenador" placeholder="Digite aqui..." value={projeto.coordenador} onChange={handleChange} />
                    </div>
                </div>

                <div className="cadpro_input_group">
                    <label htmlFor="cadpro_descricao">Descrição</label>
                    <textarea id="cadpro_descricao" placeholder="Digite aqui..." value={projeto.descricao} onChange={handleChange} ></textarea>
                </div>

                <div className="cadpro_input_group cadpro_horizontal">
                    <div className="cadpro_input_item">
                        <label htmlFor="cadpro_data_inicio">Data de Início</label>
                        <input type="date" id="cadpro_data_inicio" value={projeto.dataInicio} onChange={handleChange} />
                    </div>
                    <div className="cadpro_input_item">
                        <label htmlFor="cadpro_data_termino">Data de Término</label>
                        <input type="date" id="cadpro_data_termino" value={projeto.dataTermino} onChange={handleChange} />
                    </div>
                    <div className="cadpro_input_item">
                        <label htmlFor="cadpro_valor_projeto">Valor do Projeto</label>
                        <input type="text" id="cadpro_valor_projeto" placeholder="Digite aqui..." value={projeto.valorProjeto} onChange={handleChange} />
                    </div>
                </div>
            </form>
            <SubirArquivo titulo="Propostas e Relatórios Técnicos" />
            <SubirArquivo titulo="Contratos" />
            <SubirArquivo titulo="Artigos" />

            <div className="cadpro_botao_cadastrar" onClick={handleSubmit}>
                <BotaoCTA img="img/salvar.svg" escrito="Cadastrar" aparencia="primario"/>
            </div>
        </div>

       
      </>
    );
}
  
export default CadastroProjeto;
