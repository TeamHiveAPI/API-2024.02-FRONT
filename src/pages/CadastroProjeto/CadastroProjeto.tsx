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
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

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

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/projetos/${id}`)
        .then((response) => {
          setProjeto(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados do projeto", error);
          toast.error("Erro ao carregar o projeto.");
        });
    }
  }, [id]);

  // Upload de Arquivos

  const [arquivosPlanosDeTrabalho, setArquivosPlanosDeTrabalho] = useState<{ file: File | null, nome: string }[]>([]);
  const [arquivosContratos, setArquivosContratos] = useState<{ file: File | null, nome: string }[]>([]);
  const [arquivosTermosAditivos, setArquivosTermosAditivos] = useState<{ file: File | null, nome: string }[]>([]);

  // Planos de Trabalho
  const handleFilePlanosDeTrabalhoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const novoArquivo = e.target.files[0];
      setArquivosPlanosDeTrabalho((prevArquivos) => [
        ...prevArquivos,
        { file: novoArquivo, nome: novoArquivo.name } // Adiciona o novo arquivo com o nome
      ]);
    }
  };
   

  const removerArquivoPlanos = (index: number) => {
    setArquivosPlanosDeTrabalho((prevArquivos) =>
      prevArquivos.filter((_, i) => i !== index)
    );
  };

  // Contratos
  const handleFileContratosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    const novoArquivo = e.target.files[0];
    setArquivosContratos((prevArquivos) => [
      ...prevArquivos,
      { file: novoArquivo, nome: novoArquivo.name }
    ]);
  }
};

const removerArquivoContrato = (index: number) => {
  setArquivosContratos((prevArquivos) =>
    prevArquivos.filter((_, i) => i !== index)
  );
};

// Termos Aditivos
const handleFileTermosAditivosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    const novoArquivo = e.target.files[0];
    setArquivosTermosAditivos((prevArquivos) => [
      ...prevArquivos,
      { file: novoArquivo, nome: novoArquivo.name }
    ]);
  }
};

const removerArquivoTermosAditivos = (index: number) => {
  setArquivosTermosAditivos((prevArquivos) =>
    prevArquivos.filter((_, i) => i !== index)
  );
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    if (id === "valor") {
      let onlyNumbers = value.replace(/[^0-9,.]/g, "").replace(".", ",");

      if ((onlyNumbers.match(/,/g) || []).length > 1) return;

      if (onlyNumbers.includes(",")) {
        const [integerPart, decimalPart] = onlyNumbers.split(",");
        if (decimalPart.length > 2) {
          onlyNumbers = `${integerPart},${decimalPart.slice(0, 2)}`;
        }
      }

      setProjeto((prevState: any) => ({
        ...prevState,
        [id]: onlyNumbers,
      }));
    } else {
      setProjeto((prevState: any) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const projetoComValorCorrigido = {
      ...projeto,
      valor: projeto.valor.replace(",", "."),
    };

    const formData = new FormData();
    formData.append("projeto", JSON.stringify(projetoComValorCorrigido));

    arquivosPlanosDeTrabalho.forEach((arquivo, index) => {
      if (arquivo.file) { // Verifica se existe um arquivo
        formData.append(`planosDeTrabalho[${index}]`, arquivo.file, arquivo.nome); // Passa o arquivo e o nome
      }
    });

    const url = id ? `http://localhost:8080/projetos/${id}` : 'http://localhost:8080/projetos';
    const method = id ? 'put' : 'post';

    axios ({
      method: method,
      url: url,
      data: formData,
    })
      .then(() => {
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

  return (
    <>
      <Navbar />
      <NotificacaoToast />
      <SecaoCima titulo={id ? "Editar Projeto" : "Cadastrar Novo Projeto"} />
      <div className="visu_container_info margem_10">
        <h2 className="cadpro_titulo">Informações Principais</h2>
        <form className="cadpro_container" onSubmit={handleSubmit}>
          <div className="cadpro_secao">
            <div className="cadpro_input maior">
              <label htmlFor="referencia">Referência do Projeto</label>
              <input
                type="text"
                id="referencia"
                placeholder="Digite aqui..."
                value={projeto.referencia}
                onChange={handleChange}
              />
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
              <input
                type="text"
                id="empresa"
                placeholder="Digite aqui..."
                value={projeto.empresa}
                onChange={handleChange}
              />
            </div>
            <div className="cadpro_input">
              <label htmlFor="coordenador">Coordenador</label>
              <input
                type="text"
                id="coordenador"
                placeholder="Digite aqui..."
                value={projeto.coordenador}
                onChange={handleChange}
              />
            </div>
            <div className="cadpro_input">
              <label htmlFor="tipo_contrato">Tipo de Contrato</label>
              <select id="classificacao" value={projeto.classificacao} onChange={handleChange}>
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
                <textarea
                  name="descricao"
                  id="descricao"
                  value={projeto.descricao}
                  onChange={handleChange}
                  rows={6}
                  cols={50}
                />
              </div>
            </div>
          </div>
          <div className="cadpro_secao">
            <div className="cadpro_input">
              <label htmlFor="dataInicio">Data de Início</label>
              <input type="date" id="dataInicio" value={projeto.dataInicio} onChange={handleChange} />
            </div>
            <div className="cadpro_input">
              <label htmlFor="dataTermino">Data de Término</label>
              <input type="date" id="dataTermino" value={projeto.dataTermino} onChange={handleChange} />
            </div>
            <div className="cadpro_input">
              <label htmlFor="valor">Valor do Projeto</label>
              <input
                type="text"
                id="valor"
                placeholder="Digite aqui..."
                value={projeto.valor}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="cadpro_arquivos_container">
  
          {/* Seção de Planos de Trabalho */}
          <div className="cadpro_secao_vertical_arquivo">
          <h2 className="cadpro_titulo_arquivo">Planos de Trabalho</h2>
          <div className="cadpro_arquivo_componentes">
          {arquivosPlanosDeTrabalho.map((arquivo, index) => (
            <div key={index}>
              <SubirArquivo
              titulo={arquivo.nome}
                onRemove={() => removerArquivoPlanos(index)}
            />
            </div>
          ))}
          </div>
          {/* Input invisível para selecionar arquivos */}
          <input
            type="file"
            id="input-file-upload-planos"
            style={{ display: "none" }}
            onChange={handleFilePlanosDeTrabalhoChange}
          />
          {/* Botão para abrir o input e selecionar o arquivo */}
          <div className="cadpro_botao_upload">
            <BotaoCTA
              img="/img/nuvem_upload.svg"
              escrito="Subir arquivo"
              aparencia="primario"
              onClick={() => document.getElementById("input-file-upload-planos")?.click()} />
          </div>
          </div>

          {/* Seção de Contratos */}
          <div className="cadpro_secao_vertical_arquivo">
          <h2 className="cadpro_titulo_arquivo">Contratos</h2>
          <div className="cadpro_arquivo_componentes">
          {arquivosContratos.map((arquivo, index) => (
            <div key={index}>
              <SubirArquivo
                titulo={arquivo.nome}
                onRemove={() => removerArquivoContrato(index)}
              />
            </div>
          ))}
          </div>
          {/* Input invisível para selecionar arquivos */}
          <input
            type="file"
            id="input-file-upload-contratos"
            style={{ display: "none" }}
            onChange={handleFileContratosChange}
          />
          {/* Botão para abrir o input e selecionar o arquivo */}
          <div className="cadpro_botao_upload">
            <BotaoCTA
              img="/img/nuvem_upload.svg"
              escrito="Subir arquivo"
              aparencia="primario"
              onClick={() => document.getElementById("input-file-upload-contratos")?.click()} />
          </div>
          </div>

          {/* Seção de Termos Aditivos */}
          <div className="cadpro_secao_vertical_arquivo">
          <h2 className="cadpro_titulo_arquivo">Termos Aditivos</h2>
            <div className="cadpro_arquivo_componentes">
            {arquivosTermosAditivos.map((arquivo, index) => (
              <div key={index}>
                <SubirArquivo
                  titulo={arquivo.nome}
                  onRemove={() => removerArquivoTermosAditivos(index)}
                />
              </div>
            ))}
          </div>
          {/* Input invisível para selecionar arquivos */}
          <input
            type="file"
            id="input-file-upload-termos-aditivos"
            style={{ display: "none" }}
            onChange={handleFileTermosAditivosChange}
          />
          {/* Botão para abrir o input e selecionar o arquivo */}
          <div className="cadpro_botao_upload">
            <BotaoCTA
              img="/img/nuvem_upload.svg"
              escrito="Subir arquivo"
              aparencia="primario"
              onClick={() => document.getElementById("input-file-upload-termos-aditivos")?.click()} />
          </div>
          </div>
        </div>
        {/* Botão de cadastrar */}
        <div className="cadpro_botao_cadastrar">
            <BotaoCTA
              img="/img/salvar.svg"
              escrito={id ? "Editar Projeto" : "Cadastrar Projeto"}
              aparencia="primario"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default CadastroProjeto;