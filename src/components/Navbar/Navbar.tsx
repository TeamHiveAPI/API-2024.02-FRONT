import { useEffect, useState } from "react";
import "./Navbar.scss";

function Navbar() {
  
  
  return (
    
    <nav className="nav_container">
        <div className="nav_esq">
            <img src="/img/logotipo_FAPG.svg" alt="Logo FAPG" />
        </div>

        <div className="nav_meio">
            <h2>Portal da Transparência</h2>
        </div>

        <div className="nav_dir">
            <img src="/img/icone_sair.svg" alt="Logo FAPG" />
            <p>Sair</p>
        </div>
    </nav>

  );
}


export default Navbar;