import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios"; 
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Navbar from "../../components/Navbar/Navbar";
import FormInputSenha from "../../components/FormInput/FormInputSenha";
import FormInputEmail from "../../components/FormInput/FormInputEmail";
import "./Login.scss";

function Login() {
    const [email, setEmail] = useState("");  // Estado para armazenar o email
    const [senha, setSenha] = useState("");  // Estado para armazenar a senha
    const navigate = useNavigate();  // Hook para redirecionamento

    // Função para realizar o login
    const handleLogin = () => {
        // Dados que serão enviados para o backend
        const dadosLogin = {
            email: email, 
            senha: senha
        };

        // Enviando a requisição POST para o backend
        axios.post('http://localhost:8080/usuarios/login', dadosLogin)
            .then((response: AxiosResponse) => {  // Tipagem explícita para 'response'
                // Se o login for bem-sucedido
                alert("Login realizado com sucesso!");
                console.log(response.data);
                navigate("/consulta");  // Redireciona para a página de consulta
            })
            .catch((error: AxiosError) => {  // Tipagem explícita para 'error'
                // Se houver um erro no login
                alert("Erro ao realizar o login. Verifique suas credenciais.");
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
