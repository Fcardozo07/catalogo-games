import {  useNavigate } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePaginas } from "../../shared/layouts"
import { FormEditarAcessorios } from "../../shared/components/lista_acessorios/FormEditarAcessorios";
import { useEditarAcessoriosData } from "../../shared/hooks";

export const EditarAcessorios = () => {
 const navigate = useNavigate(); 

  const hook = useEditarAcessoriosData();
    return(
        <LayoutBaseDePaginas
            titulo="Editar Acessório"
            barraDeFerramentas={<FerramentasDeDetalhe
            mostrarBotaoNovo={false}
            mostarBotaoSalvar            
            mostrarBotaoApagar={false}
            mostarBotaoVoltar
            aoClicarEmVoltar={() => navigate("/lista-acessorios")}
            aoClicarEmSalvar={hook.handleSubmit}

            />}
        >     
     <FormEditarAcessorios {...hook} />
    </LayoutBaseDePaginas>
    )
}