import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import CardArquivo from "../../components/CardArquivo/CardArquivo";
import Navbar from "../../components/Navbar/Navbar";
import "./VisualizacaoProjeto.scss"


function VisualizacaoProjeto() {
    
    return (
    <>
      <Navbar />

        <div className="visu_container_cima margem_10">
            <h2>Informações do Projeto</h2>
            <BotaoCTA escrito="Voltar" aparencia="primario" />
        </div>
        <div className="visu_container_info margem_10">
            <div className="visu_info_linha">
                <h3>Referência do Projeto</h3>
                <p>Conduto Transdimensional para Manipulação Crono-espacial e Interconexão Instantânea</p>
            </div>
            <hr className="divisoria"/>
            <div className="visu_info_linha">
                <h3>Empresa</h3>
                <p>Aperture Laboratories</p>
            </div>
            <hr className="divisoria"/>
            <div className="visu_info_linha">
                <h3>Descrição</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, aliquid est perspiciatis doloribus tenetur quae. Numquam iste atque voluptate obcaecati, ipsa error assumenda culpa hic accusantium voluptas quisquam unde sint?</p>
            </div>
            <hr className="divisoria"/>
            <div className="visu_info_linha">
                <h3>Coordenador</h3>
                <p>Cave Johnson</p>
            </div>
            <hr className="divisoria"/>
            <div className="visu_info_linha">
                <h3>Valor do Projeto</h3>
                <p>124.000,00</p>
            </div>
            <hr className="divisoria"/>
            <div className="visu_info_linha">
                <h3>Data de Inicio</h3>
                <p>01/01/2024</p>
            </div>
            <hr className="divisoria"/>
            <div className="visu_info_linha">
                <h3>Data de Término</h3>
                <p>01/01/2024</p>
            </div>
        </div>
        <div className="visu_propostas margem_10">
            <h3>Propostas e Relatórios</h3>
            <div className="visu_cards">
                <CardArquivo titulo="proposta1.pdf" tamanho="1.2MB"/>
                <CardArquivo titulo="relatorio.pdf" tamanho="1.2MB"/>
            </div>
        </div>
        <div className="visu_contratos margem_10">
            <h3>Contratos</h3>
            <div className="visu_cards">
                <CardArquivo titulo="contrato.pdf" tamanho="0.8MB"/>
            </div>
        </div>
        <div className="visu_artigos margem_10">
            <h3>Artigos</h3>
            <p>Nenhum artigo encontrado.</p>
        </div>
    </>
  );
}

export default VisualizacaoProjeto;