import { useNavigate } from 'react-router-dom';
import BotaoCTA from '../BotaoCTA/BotaoCTA';
import "./SecaoCima.scss"
import axios from 'axios';

interface SecaoCimaProps {
  titulo: string;
  admin?: string;
  projetoID?: string;
}

const SecaoCima = ({ titulo, admin, projetoID }: SecaoCimaProps) => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); // Voltar para a pág. anterior
  };

  const handleEditarProjeto = () => {
    navigate(`/edicao-projeto/${projetoID}`);
  };

  const handleExcluirProjeto = async () => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este projeto?');
    if (confirmacao) {
      try {
        await axios.delete(`http://localhost:8080/projetos/${projetoID}`);
        alert('Projeto excluído com sucesso!');
        navigate('/consulta');
      } catch (error) {
        console.error('Erro ao excluir o projeto:', error);
        alert('Erro ao excluir o projeto.');
      }
    }
  };

  return (
    <div>
      <div className="secao_cima margem_10">
        <h2>{titulo}</h2>
        <div className="secao_cima_botoes">
        <BotaoCTA
          img="/img/voltar.svg"
          escrito="Voltar"
          aparencia="primario"
          onClick={handleVoltar}
        />

        {admin === "sim" && (
          <>
            <BotaoCTA
              img="/img/editar.svg"
              escrito="Editar"
              aparencia="secundario"
              cor="cor_primario"
              onClick={handleEditarProjeto}
            />
            <BotaoCTA
              img="/img/lixeira.svg"
              escrito="Deletar"
              aparencia="secundario"
              cor="vermelho"
              onClick={handleExcluirProjeto}
            />
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default SecaoCima;
