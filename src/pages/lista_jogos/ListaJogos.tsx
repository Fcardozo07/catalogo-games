
import { FerramentasDaListagem } from "../../shared/components";
import { TableJogos } from "../../shared/components/lista_jogos/TableJogos";
import useListaJogosData from "../../shared/hooks/lista_jogos/useListaJogosData";
import { LayoutBaseDePaginas } from "../../shared/layouts";

import { useNavigate } from "react-router-dom";


export const ListaJogos = () => {
const navigate = useNavigate();

const hook = useListaJogosData();


    return (
        <LayoutBaseDePaginas
        titulo="Listagem de Jogos"
        barraDeFerramentas={<FerramentasDaListagem 
            aoClicarEmNovo={() => navigate("/novo-jogo")}
            aoClicarEmVoltar={() => navigate("/dashboard")}
            mostrarBotaoVoltar
            mostrarInputBusca
            textoDaBusca={hook.textoBusca}
            aoMudarTextoDeBusca={(texto) => hook.setTextoBusca(texto)}
        />}
      
        >

            <TableJogos
                itensFiltrados={hook.itensFiltrados}
                marcas={hook.marcas}
                modelos={hook.modelos}
                handledeletar={hook.handledeletar}
            />
        
        </LayoutBaseDePaginas>
    );
};