import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Corrigido para importação padrão
import "./Navbar.scss";

function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Token inválido ou expirado", error);
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.reload()
    };

    return (
        <nav className="nav_container">
            <div className="nav_esq">
                <img src="/img/logotipo_FAPG.svg" alt="Logo FAPG" />
            </div>

            <div className="nav_meio">
                <h2>Portal da Transparência</h2>
            </div>

            <div className="nav_dir">
                {isLoggedIn && (
                    <img src="/img/foto_perfil_admin.svg" alt="Foto do Perfil" /> 
                )}

            <div className="nav_botao" onClick={isLoggedIn ? handleLogout : () => navigate("/login")}>
                    <img src={isLoggedIn ? "/img/icone_sair.svg" : "/img/icone_login.svg"} alt={isLoggedIn ? "Icone Sair" : "Icone Login"} />
                    <p>{isLoggedIn ? "Sair" : "Login"}</p>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
