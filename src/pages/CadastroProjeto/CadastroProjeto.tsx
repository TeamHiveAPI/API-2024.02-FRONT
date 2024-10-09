import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";  
import Navbar from "../../components/Navbar/Navbar";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import SubirArquivo from "../../components/SubirArquivo/SubirArquivo";
import SecaoCima from "../../components/SecaoCima/SecaoCima";
import { toast } from "react-toastify";
import NotificacaoToast from "../../components/NotificacaoToast/NotificacaoToast";
import "../CadastroProjeto/CadastroProjeto.scss";

function CadastroProjeto() {
  
  const navigate = useNavigate(); // Inicializa o useNavigate
  const { id } = useParams(); // Pega o id do projeto na URL, se estiver no modo de edição
  
  const [projeto, setProjeto] = useState({
    referencia: "",
    situacao: "",
    empresa: "",
    coordenador: "",
    descricao: "",
    dataInicio: "",
    dataTermino: "",
    valor: "",
    classificacao: "",
  });
  
  const [arquivoPlanosDeTrabalho, setArquivoPlanosDeTrabalho] = useState<File | null>(null);
  const [arquivoContratos, setArquivoContratos] = useState<File | null>(null);
  const [arquivoTermosAditivos, setArquivoTermosAditivos] = useState<File | null>(null);
  
  // Se o ID existir, estamos no modo de edição, então busca-se os dados do projeto 
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/projetos/${id}`)
      .then((response) => {
        setProjeto(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados do projeto", error);
      });
    }
  }, [id]);
  
  const handleFilePlanosDeTrabalhoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArquivoPlanosDeTrabalho(e.target.files[0]);
    }
  };
  
  const handleFileContratosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArquivoContratos(e.target.files[0]);
    }
  };
  
  const handleFileTermosAditivosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArquivoTermosAditivos(e.target.files[0]);
    }
  };  
  
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    
    // Permitir apenas números (remover caracteres não numéricos)
    if (id === "valor") {
      let onlyNumbers = value.replace(/[^0-9,.]/g, ""); // Remove tudo que não é número
      onlyNumbers = onlyNumbers.replace(".", ",");

      if ((onlyNumbers.match(/,/g) || []).length > 1) {
        return; // Impede múltiplas vírgulas
      }
  
      // Limita a duas casas decimais
      if (onlyNumbers.includes(",")) {
        const [integerPart, decimalPart] = onlyNumbers.split(",");
        if (decimalPart.length > 2) {
          onlyNumbers = `${integerPart},${decimalPart.slice(0, 2)}`; // Limita a duas casas decimais
        }
      }

      setProjeto((prevState) => ({
        ...prevState,
        [id]: onlyNumbers
      }));
    } else {
      setProjeto((prevState) => ({
        ...prevState,
        [id]: value
      }));
    }
  };
  
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const projetoComValorCorrigido = {
      ...projeto,
      valor: projeto.valor.replace(",", ".")  // Substitui a vírgula por ponto
    };
    
    const formData = new FormData();
    formData.append('projeto', JSON.stringify(projetoComValorCorrigido));
    
    if (arquivoPlanosDeTrabalho) {
      formData.append('planosDeTrabalho', arquivoPlanosDeTrabalho);
    }
    if (arquivoContratos) {
      formData.append('contratos', arquivoContratos);
    }
    if (arquivoTermosAditivos) {
      formData.append('termosAditivos', arquivoTermosAditivos);
    }

    // Log para ver o conteúdo de formData antes de enviar
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
  }
    
    const url = id ? `http://localhost:8080/projetos/${id}` : 'http://localhost:8080/projetos';
    const method = id ? 'put' : 'post';
    
    axios({
      method: method,
      url: url,
      data: formData,
    })
    .then((response) => {
      toast.success(`Projeto ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
      setTimeout(() => {
        navigate("/consulta");
      }, 3000);
    })
    .catch((error) => {
      toast.warn(`Erro ao ${id ? 'atualizar' : 'cadastrar'} o projeto.`);
      console.error("Erro:", error.response ? error.response.data : error.message);
    });
  
  };
  
  const LimiteCaracteres = 2400;
  
  const handleDescricaoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= LimiteCaracteres) {
      setProjeto((prevProjeto) => ({
        ...prevProjeto,
        descricao: inputValue,
      }));
    }
  };
  
  const handleDataChange = (e: any) => {
    const { id, value } = e.target;
    
    // Verificação ao alterar a data de início
    if (id === "dataInicio" && projeto.dataTermino) {
      if (new Date(value) > new Date(projeto.dataTermino)) {
        toast.warn("A data de início não pode ser posterior à data de término.");
        return;
      }
    }
    
    // Verificação ao alterar a data de término
    if (id === "dataTermino" && projeto.dataInicio) {
      if (new Date(value) < new Date(projeto.dataInicio)) {
        toast.warn("A data de término não pode ser anterior à data de início.");
        return;
      }
    }
    
    // Atualiza o estado do projeto
    setProjeto((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };
  
  return (
    <>
    <Navbar />
    
    <NotificacaoToast />
    
    <SecaoCima titulo={id ? "Editar Projeto" : "Cadastrar Novo Projeto"} />
    <div className="visu_container_info margem_10">
    <h2 className="cadpro_titulo">Informações Principais</h2>
    
    <form className="cadpro_container">
    <div className="cadpro_secao">
    <div className="cadpro_input maior">
    <label htmlFor="referencia">Referência do Projeto</label>
    <input type="text" id="referencia" placeholder="Digite aqui..." value={projeto.referencia} onChange={handleChange} />
    </div>
    <div className="cadpro_input menor">
    <label htmlFor="status">Situação do Projeto</label>
    <select id="situacao" value={projeto.situacao} onChange={handleChange}>
    <option value="">Selecione...</option>
    <option value="Projetos em Andamento">Projetos em Andamento</option>
    <option value="Projetos Encerrados">Projetos Encerrados</option>
    <option value="Projetos Não Iniciados">Projetos Não Iniciados</option>
    </select>
    </div>
    </div>
    <div className="cadpro_secao">
    <div className="cadpro_input">
    <label htmlFor="empresa">Empresa</label>
    <input type="text" id="empresa" placeholder="Digite aqui..." value={projeto.empresa} onChange={handleChange} />
    </div>
    <div className="cadpro_input">
    <label htmlFor="coordenador">Coordenador</label>
    <input type="text" id="coordenador" placeholder="Digite aqui..." value={projeto.coordenador} onChange={handleChange} />
    </div>
    <div className="cadpro_input">
    <label htmlFor="tipo_contrato">Tipo de Contrato</label>
    <select id="classificacao" value={projeto.classificacao} onChange={handleChange} >
    <option value="">Selecione...</option>
    <option value="AS, OF, PC e/ou outros">AS, OF, PC e/ou outros</option>
    <option value="Contrato">Contrato</option>
    <option value="Convênio">Convênio</option>
    <option value="Patrocínio">Patrocínio</option>
    <option value="Termo de Cooperação">Termo de Cooperação</option>
    <option value="Termo de Outorga">Termo de Outorga</option>
    </select>
    </div>
    </div>
    <div className="cadpro_secao">
    <div className="cadpro_input">
    <label htmlFor="descricao">Descrição</label>
    <div className="cadpro_input_descricao"> 
    <textarea name="descricao" id="descricao" value={projeto.descricao} onChange={handleDescricaoChange} maxLength={LimiteCaracteres} rows={6} cols={50} />
    </div>
    <div className="cadpro_input_descricao_contador">
    <p>Limite de caracteres: {projeto.descricao.length}/{LimiteCaracteres} </p>
    </div>
    </div>
    </div>
    <div className="cadpro_secao">
    <div className="cadpro_input">
    <label htmlFor="dataInicio">Data de Início</label>
    <input type="date" id="dataInicio" value={projeto.dataInicio} onChange={handleDataChange} />
    </div>
    <div className="cadpro_input">
    <label htmlFor="dataTermino">Data de Término</label>
    <input type="date" id="dataTermino" value={projeto.dataTermino} onChange={handleDataChange} />
    </div>
    <div className="cadpro_input">
    <label htmlFor="valor">Valor do Projeto</label>
    <input 
    type="text" id="valor" placeholder="Digite aqui..." value={projeto.valor} onChange={handleChange} />
    </div>
    </div>
    </form>
    
    <SubirArquivo titulo="Planos de Trabalho" onFileChange={handleFilePlanosDeTrabalhoChange} />
    <SubirArquivo titulo="Contratos" onFileChange={handleFileContratosChange} />
    <SubirArquivo titulo="Termos Aditivos" onFileChange={handleFileTermosAditivosChange} />
    
    
    <div className="cadpro_botao_cadastrar" onClick={handleSubmit}>
    <BotaoCTA
    img="/img/salvar.svg"
    escrito={id ? "Editar Projeto" : "Cadastrar Projeto"}
    aparencia="primario"
    />
    </div>
    </div>
    </>
  );
}

export default CadastroProjeto;