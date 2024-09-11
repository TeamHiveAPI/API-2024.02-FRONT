import { useEffect, useState } from "react";
import "./Footer.scss";

function Footer() {
  
  
  return (
    
   <footer>
    <div className="footer_cima">
        <div className="footer_esq">
            <a href="https://github.com/TeamHiveAPI/API-2024.02" target="_blank">
                <img src="/img/logo_github.svg" alt="GitHub Logo" />
            </a>

            <button className="footer_voltar" onClick={() => window.scrollTo({ top: 0 })} > Voltar ao Topo
            </button>
        </div>
        <div className="footer_dir">
            <p>Este site é um projeto API (Aprendizagem por Projeto Integrador) desenvolvido pelo Team HIVE no 2° Semestre de 2024.</p>
            <img src="/img/logo_hive.svg" />
        </div>
    </div>
    <div className="footer_baixo">
        <p>FAPG Portal de Transparência © Todos os direitos reservados 2024 - Team HIVE</p>
        <p>Política de Privacidade</p>
    </div>
    </footer>

  );
}


export default Footer;