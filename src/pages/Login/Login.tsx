import { useState } from "react";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Navbar from "../../components/Navbar/Navbar";
import FormInputSenha from "../../components/FormInput/FormInputSenha";
import FormInputEmail from "../../components/FormInput/FormInputEmail";
import "./Login.scss"


function Login() {
    
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
 
    return (
    <>
      <Navbar />

        <div className="login_container">
            <div className="margem_10 login_box_container">
                <h2>LOGIN</h2>
                <FormInputEmail onEmailChange={setNome} />
                <FormInputSenha type="normal" onSenhaChange={setSenha} />
                <div className="login_baixo">
                    <BotaoCTA escrito="Entrar" aparencia="primario" />
                    <BotaoCTA link="/cadastro" escrito="Cadastre-se" aparencia="secundario" />
                </div>
            </div>
        </div>
    </>
  );
}

export default Login;