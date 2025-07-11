
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";

import { useNovoConsoleData } from "../../shared/hooks/lista_consoles/useNovoConsoleData";

import { FormNovoConsole } from "../../shared/components/lista_consoles/FormNovoConsole";
import { useNavigate } from "react-router-dom";


export const NovoConsole = () => {

 
   const navigate = useNavigate();
  const hook = useNovoConsoleData();
  
  return (
    <LayoutBaseDePaginas
      titulo="Novo Console"
      barraDeFerramentas={<FerramentasDeDetalhe
        mostrarBotaoNovo={false}
        mostrarBotaoApagar={false}
        mostarBotaoSalvarVoltar
        aoClicarEmSalvar={hook.criarConsole}
        desabilitarBotaoSalvar={hook.botaoSalvarDesabilitado}
        aoClicarEmSalvarVoltar={hook.handleSalvarEVoltar}
        aoClicarEmVoltar={() => navigate("/lista-consoles")}
      />}
    >    
       
        <FormNovoConsole {...hook} />

    
    </LayoutBaseDePaginas>
  )

}