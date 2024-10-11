import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="nav_container">
            <div className="nav_esq">
                <img src="/img/logotipo_FAPG.svg" alt="Logo FAPG" />
            </div>

            <div className="nav_meio">
                <h2>Portal da Transparência</h2>
            </div>

            <div className="nav_dir" onClick={handleLogout} style={{ cursor: "pointer" }}>
                <img src="/img/icone_sair.svg" alt="Icone Sair" />
                <p>Sair</p>
            </div>
        </nav>
    );
}

export default Navbar;
