import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { useNavigate } from "react-router-dom";
import { FormNovoAcessorio } from "../../shared/components/lista_acessorios/FormNovoAcessorio";
import { useNovoAcessorioData } from "../../shared/hooks/lista_acessorios/useNovoAcessorioData";
  export const NovoAcessorio = () => {
  const navigate = useNavigate();
 
  const hook = useNovoAcessorioData();


    return (
      <LayoutBaseDePaginas
        titulo="Novo Acessório"
        barraDeFerramentas={
          <FerramentasDeDetalhe
            mostrarBotaoNovo={false}
            mostrarBotaoApagar={false}
            mostarBotaoSalvarVoltar
            aoClicarEmSalvar={hook.criarAcessorio}
            desabilitarBotaoSalvar={hook.botaoSalvarDesabilitado}
            aoClicarEmSalvarVoltar={hook.handleSalvarEVoltar}
            aoClicarEmVoltar={() => navigate("/lista-acessorios")}
          />
        }
      >        
        <FormNovoAcessorio{...hook}/>        

      </LayoutBaseDePaginas>
    );
  };
  