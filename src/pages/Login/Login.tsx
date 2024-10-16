import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios"; 
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Navbar from "../../components/Navbar/Navbar";
import FormInputSenha from "../../components/FormInput/FormInputSenha";
import FormInputEmail from "../../components/FormInput/FormInputEmail";
import "./Login.scss";
import { toast } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const dadosLogin = {
            email: email, 
            senha: senha
        };

        axios.post('http://localhost:8080/auth/login', dadosLogin)
            .then((response: AxiosResponse) => {
                // Se o login for bem-sucedido
                toast.success("Login realizado com sucesso!");

                const token = response.data;
                localStorage.setItem("token", token);

                setTimeout(() => {
                    navigate("/");
                  });
                console.log(response.data);
            })
            .catch((error: AxiosError) => {
                // Se houver um erro no login
                toast.warn("Erro ao realizar o login. Verifique suas credenciais.");
                console.error(error);
            });
    };

    return (
        <>
            <Navbar />

            <div className="login_container">
                <div className="margem_10 login_box_container">
                    <h2>LOGIN</h2>
                    <FormInputEmail onEmailChange={setEmail} />
                    <FormInputSenha type="normal" onSenhaChange={setSenha} />
                    <div className="login_baixo">
                        <BotaoCTA escrito="Entrar" aparencia="primario" onClick={handleLogin} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
