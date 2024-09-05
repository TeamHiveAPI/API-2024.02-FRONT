import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Input from "../../components/Input/Input";
import Navbar from "../../components/Navbar/Navbar";
import "../../global.scss"
import "./Consulta.scss"

function Consulta() {
    
  return (
    <>
      <Navbar />

      <div className="margem_10 cons_container">
      <Input texto="Mude o Texto Aqui" placeholder="Digite aqui..." />
      <Input texto="Mude o Texto Aqui" placeholder="Digite aqui..." />
      <Input texto="Mude o Texto Aqui" placeholder="Digite aqui..." />
      <Input texto="Mude o Texto Aqui" placeholder="Digite aqui..." />
      </div>
    </>
  );
}

export default Consulta;