import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import "../../global.scss"
import "./Consulta.scss"
import "../../components/Input/Input.scss"; 

function Consulta() {
    
  return (
    <>
      <Navbar />
      
      <div className="margem_10 cons_container">
        <h1>Consulta de Projetos</h1>
      </div>

      <div className="margem_10 cons_container input_container">
      <Input texto="Referência do Projeto" placeholder="Digite aqui..." />
      <Input texto="Coordenador" placeholder="Digite aqui..." />
      <Input texto="Data de Início" placeholder="Digite aqui..." />
      <Input texto="Data de Término" placeholder="Digite aqui..." />
      <Input texto="Classificação" placeholder="Digite aqui..." />
      <Input texto="Situação do Projeto" placeholder="Digite aqui..." />
      <BotaoCTA escrito="Buscar" aparencia="primario"/>
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
        <tr>
            <td><img src="img/nuvem_upload.svg" /></td>
            <td className="referencia_projeto">Conduto Transdimensional para Manipulação Crono-espacial e Interconexão Instantânea</td>
            <td>01/01/2024</td>
            <td>31/12/2024</td>
            <td>João Silva</td>
            <td>R$ 500.000,00</td>
        </tr>
        <tr>
            <td><img src="img/nuvem_upload.svg" /></td>
            <td className="referencia_projeto">Botas com Sistema de Estabilização e Amortecimento Dinâmico com Proteção Dinâmica Antigravitacional...</td>
            <td>15/03/2024</td>
            <td>15/09/2024</td>
            <td>Maria Souza</td>
            <td>R$ 300.000,00</td>
        </tr>
        <tr>
            <td><img src="img/nuvem_upload.svg" /></td>
            <td className="referencia_projeto">Cubo de Conexão Emocional com Interface Sensorial Inteligente</td>
            <td>05/05/2024</td>
            <td>05/11/2024</td>
            <td>Carlos Pereira</td>
            <td>R$ 250.000,00</td>
        </tr>
    </tbody>
</table>


    </>
  );
}

export default Consulta;