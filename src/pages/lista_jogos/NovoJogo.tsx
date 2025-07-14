
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { FormNovoJogo } from "../../shared/components/lista_jogos/FormNovoJogo";
import { useNovoJogoData } from "../../shared/hooks/lista_jogos/useNovoJogoData";
import { useNavigate } from "react-router-dom";



export const NovoJogo = () => {
    
    const hook = useNovoJogoData();
    const navigate = useNavigate();


    return (
        <LayoutBaseDePaginas
            titulo="Novo Jogo"
            barraDeFerramentas={<FerramentasDeDetalhe
                textoBotaoNovo="Novo Jogo"
                mostrarBotaoNovo={false}              
                aoClicarEmSalvar={hook.criarJogo}
                aoClicarEmNovo={() => navigate("/novo-jogo")}
                aoClicarEmVoltar={() => navigate("/lista-jogos")}
                desabilitarBotaoSalvar={hook.botaoSalvarDesabilitado}

            />}
        >
        
        <FormNovoJogo {...hook} />


        </LayoutBaseDePaginas>


    )
        
}    