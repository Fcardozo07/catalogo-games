import { useNavigate } from "react-router-dom";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEditConsoleData } from "../../shared/hooks/lista_consoles/useEditConsoleData";
import { FormEditarConsole } from "../../shared/components/lista_consoles/FormEditarConsole";
  
export const EditarConsoles = () => {
    
  const hook = useEditConsoleData();
  const navigate = useNavigate();

        return(
            <LayoutBaseDePaginas
                titulo="Editar Console"
                barraDeFerramentas={<FerramentasDeDetalhe
                mostrarBotaoNovo={false}
                mostarBotaoSalvar               
                mostrarBotaoApagar={false}
                mostarBotaoVoltar
                aoClicarEmVoltar={() => navigate("/lista-consoles")}
                aoClicarEmSalvar={hook.handleSubmit}
                />}
            >

             <FormEditarConsole {...hook} />
            
               
            </LayoutBaseDePaginas>
        );
      };

    



    