import React, { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";  
import Navbar from "../../components/Navbar/Navbar";
import BotaoCTA from "../../components/BotaoCTA/BotaoCTA";
import SubirArquivo from "../../components/SubirArquivo/SubirArquivo";
import SecaoCima from "../../components/SecaoCima/SecaoCima";
import { toast } from "react-toastify";
import "../CadastroProjeto/CadastroProjeto.scss";

function CadastroProjeto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [projeto, setProjeto] = useState({
    titulo: "",
    situacao: "",
    empresa: "",
    coordenador: "",
    descricao: "",
    dataInicio: "",
    dataTermino: "",
    valor: "",
    classificacao: "",
  });

  // Upload de Arquivos

  const [arquivosPlanosDeTrabalho, setArquivosPlanosDeTrabalho] = useState<{ file: File | null, nome: string }[]>([]);
  const [arquivosContratos, setArquivosContratos] = useState<{ file: File | null, nome: string }[]>([]);
  const [arquivosTermosAditivos, setArquivosTermosAditivos] = useState<{ file: File | null, nome: string }[]>([]);
  const [arquivosRemovidos, setArquivosRemovidos] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      api.get(`http://localhost:8080/projetos/${id}`)
        .then((response) => {
          setProjeto(response.data);
  
          // Carregar arquivos do projeto no estado
          const arquivosExistentesPlanos = response.data.arquivos.filter((arquivo: { tipoDocumento: string; }) => arquivo.tipoDocumento === 'PLANO_DE_TRABALHO');
          const arquivosExistentesContratos = response.data.arquivos.filter((arquivo: { tipoDocumento: string; }) => arquivo.tipoDocumento === 'CONTRATO');
          const arquivosExistentesTermos = response.data.arquivos.filter((arquivo: { tipoDocumento: string; }) => arquivo.tipoDocumento === 'TERMO_ADITIVO');
  
          setArquivosPlanosDeTrabalho(arquivosExistentesPlanos.map((arquivo: { nome: any; }) => ({
            file: null, // Não existe um arquivo File real, pois já está salvo no servidor
            nome: arquivo.nome
          })));
  
          setArquivosContratos(arquivosExistentesContratos.map((arquivo: { nome: any; }) => ({
            file: null,
            nome: arquivo.nome
          })));
  
          setArquivosTermosAditivos(arquivosExistentesTermos.map((arquivo: { nome: any; }) => ({
            file: null,
            nome: arquivo.nome
          })));
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados do projeto", error);
          toast.error("Erro ao carregar o projeto.");
        });
    }
  }, [id]);
  

  // Planos de Trabalho
  const handleFilePlanosDeTrabalhoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const maxFileSize = 10 * 1024 * 1024; // 10MB em bytes
  
      // Cria uma lista de arquivos válidos, filtrando os arquivos que excedem o limite de 10MB
      const novosArquivos = Array.from(e.target.files)
        .filter(file => file.size <= maxFileSize) // Filtra arquivos maiores que 10MB
        .map(file => ({
          file: file,
          nome: file.name
        }));
  
      if (novosArquivos.length < e.target.files.length) {
        toast.warn("Algum arquivo excedeu o limite de 10MB e não foi adicionado.");
      }
  
      setArquivosPlanosDeTrabalho((prevArquivos) => [
        ...prevArquivos,
        ...novosArquivos
      ]);
    }
  };

  const removerArquivoPlanos = (index: number) => {
    const arquivoRemovido = arquivosPlanosDeTrabalho[index].nome;
    setArquivosPlanosDeTrabalho((prevArquivos) =>
      prevArquivos.filter((_, i) => i !== index)
    );
    setArquivosRemovidos((prevRemovidos) => [...prevRemovidos, arquivoRemovido]);
  };

  // Contratos
  const handleFileContratosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const maxFileSize = 10 * 1024 * 1024; // 10MB em bytes
  
      const novosArquivos = Array.from(e.target.files)
        .filter(file => file.size <= maxFileSize) // Filtra arquivos maiores que 10MB
        .map(file => ({
          file: file,
          nome: file.name
        }));
  
      if (novosArquivos.length < e.target.files.length) {
        toast.warn("Algum arquivo excedeu o limite de 10MB e não foi adicionado.");
      }
  
      setArquivosContratos((prevArquivos) => [
        ...prevArquivos,
        ...novosArquivos
      ]);
    }
  };
    

  const removerArquivoContrato = (index: number) => {
    const arquivoRemovido = arquivosContratos[index].nome;
    setArquivosContratos((prevArquivos) =>
      prevArquivos.filter((_, i) => i !== index)
    );
    setArquivosRemovidos((prevRemovidos) => [...prevRemovidos, arquivoRemovido]);
  };

// Termos Aditivos
const handleFileTermosAditivosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    const maxFileSize = 10 * 1024 * 1024; // 10MB em bytes

    const novosArquivos = Array.from(e.target.files)
      .filter(file => file.size <= maxFileSize) // Filtra arquivos maiores que 10MB
      .map(file => ({
        file: file,
        nome: file.name
      }));

    if (novosArquivos.length < e.target.files.length) {
      toast.warn("Algum arquivo excedeu o limite de 10MB e não foi adicionado.");
    }

    setArquivosTermosAditivos((prevArquivos) => [
      ...prevArquivos,
      ...novosArquivos
    ]);
  }
};


const removerArquivoTermosAditivos = (index: number) => {
  const arquivoRemovido = arquivosTermosAditivos[index].nome;
  setArquivosTermosAditivos((prevArquivos) =>
    prevArquivos.filter((_, i) => i !== index)
  );
  setArquivosRemovidos((prevRemovidos) => [...prevRemovidos, arquivoRemovido]);
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

    const valorNumerico = typeof projeto.valor === "string" 
    ? parseFloat(projeto.valor.replace(",", ".")) 
    : projeto.valor;
    
    const projetoComValorCorrigido = {
      ...projeto,
      valor: valorNumerico,
    };

    const formData = new FormData();
    formData.append("projeto", JSON.stringify(projetoComValorCorrigido));

    arquivosPlanosDeTrabalho.forEach((arquivo, index) => {
      if (arquivo.file) { // Verifica se existe um arquivo
        formData.append(`planosDeTrabalho`, arquivo.file); // Passa o arquivo e o nome
      }
    });

    // Enviar arquivos de Contratos
    arquivosContratos.forEach((arquivo) => {
      if (arquivo.file) {
        formData.append("contratos", arquivo.file);  // Nome do campo é "contratos"
      }
    });

    // Enviar arquivos de Termos Aditivos
    arquivosTermosAditivos.forEach((arquivo) => {
      if (arquivo.file) {
        formData.append("termosAditivos", arquivo.file);  // Nome do campo é "termosAditivos"
      }
    });

    console.log("Arquivos Planos de Trabalho:", arquivosPlanosDeTrabalho);
    console.log("Arquivos Contratos:", arquivosContratos);
    console.log("Arquivos Termos Aditivos:", arquivosTermosAditivos);

     // Adicionar os arquivos removidos ao formData
  formData.append("arquivosRemovidos", JSON.stringify(arquivosRemovidos));
  console.log("Arquivos removidos:", arquivosRemovidos);


    const url = id ? `http://localhost:8080/projetos/${id}` : 'http://localhost:8080/projetos';
    const method = id ? 'put' : 'post';

    api ({
      method: method,
      url: url,
      data: formData,
    })
      .then(() => {
        toast.success(`Projeto ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
        setTimeout(() => {
          navigate("/");
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
      <SecaoCima titulo={id ? "Editar Projeto" : "Cadastrar Novo Projeto"} />
      <div className="visu_container_info margem_10">
        <h2 className="cadpro_titulo">Informações Principais</h2>
        <form className="cadpro_container" onSubmit={handleSubmit}>
          <div className="cadpro_secao">
            <div className="cadpro_input maior">
              <label htmlFor="titulo">Título do Projeto</label>
              <input
                type="text"
                id="titulo"
                placeholder="Digite aqui..."
                value={projeto.titulo}
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
          {arquivosPlanosDeTrabalho.length === 0 ? (
          <p className="cadpro_nenhum">Nenhum arquivo selecionado.</p>
          ) : (
            arquivosPlanosDeTrabalho.map((arquivo, index) => (
              <div key={index}>
                <SubirArquivo
                  titulo={arquivo.nome}
                  onRemove={() => removerArquivoPlanos(index)}
                />
              </div>
            ))
          )}
          </div>
          {/* Input invisível para selecionar arquivos */}
          <input
            type="file"
            id="input-file-upload-planos"
            style={{ display: "none" }}
            onChange={handleFilePlanosDeTrabalhoChange}
            multiple
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
          {arquivosContratos.length === 0 ? (
          <p className="cadpro_nenhum">Nenhum arquivo selecionado.</p>
          ) : (
            arquivosContratos.map((arquivo, index) => (
              <div key={index}>
                <SubirArquivo
                  titulo={arquivo.nome}
                  onRemove={() => removerArquivoContrato(index)}
                />
              </div>
            ))
          )}
          </div>
          {/* Input invisível para selecionar arquivos */}
          <input
            type="file"
            id="input-file-upload-contratos"
            style={{ display: "none" }}
            onChange={handleFileContratosChange}
            multiple
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
            {arquivosTermosAditivos.length === 0 ? (
          <p className="cadpro_nenhum">Nenhum arquivo selecionado.</p>
          ) : (
            arquivosTermosAditivos.map((arquivo, index) => (
              <div key={index}>
                <SubirArquivo
                  titulo={arquivo.nome}
                  onRemove={() => removerArquivoTermosAditivos(index)}
                />
              </div>
            ))
          )}
          </div>
          {/* Input invisível para selecionar arquivos */}
          <input
            type="file"
            id="input-file-upload-termos-aditivos"
            style={{ display: "none" }}
            onChange={handleFileTermosAditivosChange}
            multiple
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