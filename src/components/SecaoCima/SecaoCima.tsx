import { useNavigate } from 'react-router-dom';
import BotaoCTA from '../BotaoCTA/BotaoCTA';
import "./SecaoCima.scss"

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
              onClick={() => console.log("Ação Extra 1 clicada")}
            />
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default SecaoCima;
