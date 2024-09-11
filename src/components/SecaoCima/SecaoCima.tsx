import { useEffect, useState } from "react";
import "./SecaoCima.scss";
import BotaoCTA from "../BotaoCTA/BotaoCTA";

interface SecaoCimaProps {
    titulo: string;
}

function SecaoCima({ titulo}: SecaoCimaProps) {  
  
  return (
    
    <div>
         <div className="secao_cima margem_10">
            <h2>{titulo}</h2>
            <BotaoCTA img="img/voltar.svg" escrito="Voltar" aparencia="primario" />
        </div>
    </div>

  );
}


export default SecaoCima;