import { useEffect, useState } from "react";
import "./Navbar.scss";

function Navbar() {
  
  const [Scrolou, setScrolou] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolou(true);
      } else {
        setScrolou(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    
    <nav className={`nav_container ${Scrolou ? "scrolled" : ""}`}>
        <div className={`nav_esq ${Scrolou ? "scrolled" : ""}`}>
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