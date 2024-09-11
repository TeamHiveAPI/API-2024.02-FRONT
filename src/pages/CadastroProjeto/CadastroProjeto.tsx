import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import SubirArquivo from "../../components/SubirArquivo/SubirArquivo"; // Importando o componente SubirArquivo
import "../CadastroProjeto/CadastroProjeto.scss";

function CadastroProjeto() {
    return (
      <>
        <Navbar />

        <div className="visu_container_info margem_10">
            <h2>Informações Principais</h2>

            <form className="cadpro_cadastro_projeto">
                <div className="cadpro_input_group">
                    <label htmlFor="cadpro_referencia">Referência do Projeto</label>
                    <input type="text" id="cadpro_referencia" placeholder="Digite aqui..." />
                </div>

                <div className="cadpro_input_group cadpro_horizontal">
                    <div className="cadpro_input_item">
                        <label htmlFor="cadpro_empresa">Empresa</label>
                        <input type="text" id="cadpro_empresa" placeholder="Digite aqui..." />
                    </div>
                    <div className="cadpro_input_item">
                        <label htmlFor="cadpro_coordenador">Coordenador</label>
                        <input type="text" id="cadpro_coordenador" placeholder="Digite aqui..." />
                    </div>
                </div>

                <div className="cadpro_input_group">
                    <label htmlFor="cadpro_descricao">Descrição</label>
                    <textarea id="cadpro_descricao" placeholder="Digite aqui..."></textarea>
                </div>

                <div className="cadpro_input_group cadpro_horizontal">
                    <div className="cadpro_input_item">
                        <label htmlFor="cadpro_data_inicio">Data de Início</label>
                        <input type="date" id="cadpro_data_inicio" />
                    </div>
                    <div className="cadpro_input_item">
                        <label htmlFor="cadpro_data_termino">Data de Término</label>
                        <input type="date" id="cadpro_data_termino" />
                    </div>
                    <div className="cadpro_input_item">
                        <label htmlFor="cadpro_valor_projeto">Valor do Projeto</label>
                        <input type="text" id="cadpro_valor_projeto" placeholder="Digite aqui..." />
                    </div>
                </div>
            </form>
            <SubirArquivo titulo="Propostas e Relatórios Técnicos" />
            <SubirArquivo titulo="Contratos" />
            <SubirArquivo titulo="Artigos" />

            <div className='cadpro_botao_cadastrar'>
                <BotaoCTA escrito='Cadastrar' aparencia='primario' img=''/>
            </div>
        </div>

       
      </>
    );
}
  
export default CadastroProjeto;
