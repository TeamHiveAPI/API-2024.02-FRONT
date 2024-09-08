import { useState } from "react";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import Navbar from "../../components/Navbar/Navbar";
import FormInputSenha from "../../components/FormInput/FormInputSenha";
import FormInputEmail from "../../components/FormInput/FormInputEmail";
import "../Login/Login.scss"


function Cadastro() {
    
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
 
    return (
    <>
      <Navbar />

        <div className="login_container">
            <div className="margem_10 login_box_container">
                <h2>CADASTRO</h2>
                <FormInputEmail onEmailChange={setNome} />
                <FormInputSenha type="extendido" onSenhaChange={setSenha} />
                <div className="login_baixo">
                    <BotaoCTA escrito="Cadastrar-se" aparencia="primario" />
                    <BotaoCTA link="/" escrito="Já tenho uma conta" aparencia="secundario" />
                </div>
            </div>
        </div>
    </>
  );
}

export default Cadastro;