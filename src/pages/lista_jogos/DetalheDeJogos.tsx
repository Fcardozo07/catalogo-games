import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { useNavigate } from "react-router-dom";
import { FormDetalheJogo } from "../../shared/components/lista_jogos/FormDetalheJogo";


export const DetalheDeJogos = () => {
  
  const navigate = useNavigate();


  return (
    <LayoutBaseDePaginas
      titulo="Detalhes do Jogo"
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoNovo={false}
          mostarBotaoSalvar={false}
          mostarBotaoSalvarVoltar={false}
          mostrarBotaoApagar={false}
          mostarBotaoVoltar
          aoClicarEmVoltar={() => navigate("/lista-jogos")}
        />
      }
    >
      <FormDetalheJogo/>

    </LayoutBaseDePaginas>
  );
};
