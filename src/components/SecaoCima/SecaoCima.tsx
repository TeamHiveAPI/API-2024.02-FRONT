import { useNavigate } from 'react-router-dom';
import BotaoCTA from '../BotaoCTA/BotaoCTA';
import "./SecaoCima.scss"

const SecaoCima = ({ titulo }: any) => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); // Voltar para a pág. anterior
  };

  return (
    <div>
      <div className="secao_cima margem_10">
        <h2>{titulo}</h2>
        <BotaoCTA
          img="/img/voltar.svg"
          escrito="Voltar"
          aparencia="primario"
          onClick={handleVoltar}
        />
      </div>
    </div>
  );
};

export default SecaoCima;