import { useNavigate } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePaginas } from "../../shared/layouts"

import { FormDetalheConsoles } from "../../shared/components/lista_consoles/FormDetalheConsoles";


  export const DetalheDeConsoles = () => {
    const navigate = useNavigate();

    return (
        <LayoutBaseDePaginas
            titulo="Detalhe do Console"
            barraDeFerramentas={<FerramentasDeDetalhe
                mostrarBotaoNovo={false}
                mostarBotaoSalvar={false}
                mostarBotaoSalvarVoltar={false}
                mostrarBotaoApagar={false}
                mostarBotaoVoltar={true}
                aoClicarEmVoltar={() => navigate("/lista-consoles")}
            />}
        >
        <FormDetalheConsoles/>
        </LayoutBaseDePaginas>
    )
}
