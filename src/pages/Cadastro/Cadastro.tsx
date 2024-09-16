import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Navbar from "../../components/Navbar/Navbar";
import FormInputSenha from "../../components/FormInput/FormInputSenha";
import FormInputEmail from "../../components/FormInput/FormInputEmail";
import "../Login/Login.scss";

function Cadastro() {
    const [email, setEmail] = useState("");  // Estado para armazenar o email
    const [senha, setSenha] = useState("");  // Estado para armazenar a senha

    // Função para realizar o cadastro
    const handleCadastro = () => {
        // Dados que serão enviados para o backend
        const dadosCadastro = {
            email: email, 
            senha: senha
        };

        // Enviando a requisição POST para o backend
        axios.post('http://localhost:8080/cadastro', dadosCadastro)
            .then((response: AxiosResponse) => {
                // Se o cadastro for bem-sucedido
                alert("Cadastro realizado com sucesso!");
                console.log(response.data);
            })
            .catch((error: AxiosError) => {
                // Se houver um erro no cadastro
                alert("Erro ao realizar o cadastro. Tente novamente.");
                console.error(error);
            });
    };

    return (
        <>
            <Navbar />

            <div className="login_container">
                <div className="margem_10 login_box_container">
                    <h2>CADASTRO</h2>

                    {/* Input de email */}
                    <FormInputEmail onEmailChange={setEmail} />

                    {/* Input de senha */}
                    <FormInputSenha type="extendido" onSenhaChange={setSenha} />

                    <div className="login_baixo">
                        {/* Botão para enviar os dados de cadastro */}
                        <BotaoCTA escrito="Cadastrar-se" aparencia="primario" onClick={handleCadastro} />

                        {/* Botão para redirecionar para a página de login */}
                        <BotaoCTA link="/" escrito="Já tenho uma conta" aparencia="secundario" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cadastro;