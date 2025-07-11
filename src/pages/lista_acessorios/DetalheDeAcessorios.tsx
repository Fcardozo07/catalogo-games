import {  useNavigate } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePaginas } from "../../shared/layouts"

import { FormDetalheAcessorios } from "../../shared/components/lista_acessorios/FormDetalheAcessorios";


  export const DetalheDeAcessorios = () => {

    const navigate = useNavigate(); // aqui é onde o tema é aplicado, ele vai aplicar o tema que está no provider, que é o AppThemeProvider.


    return(
        <LayoutBaseDePaginas
            titulo="Detalhe do Acessório"
            barraDeFerramentas={<FerramentasDeDetalhe
            mostrarBotaoNovo={false}
            mostarBotaoSalvar={false}
            mostarBotaoSalvarVoltar={false}
            mostrarBotaoApagar={false}
            mostarBotaoVoltar={true}
            aoClicarEmVoltar={() => navigate("/lista-acessorios")}                
        />}
        >
     <FormDetalheAcessorios/>
        </LayoutBaseDePaginas>
    )
}