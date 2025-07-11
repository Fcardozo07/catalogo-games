import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { useNavigate } from "react-router-dom";
import { TableAssessorios } from "../../shared/components/lista_acessorios/TableAssessorios";
import { useListaAcessoriosData } from "../../shared/hooks/lista_acessorios/useListaAcessoriosData";

export const ListaAcessorios = () => {

    const hook = useListaAcessoriosData();

    const navigate = useNavigate();

    

    return (
        <LayoutBaseDePaginas
        titulo="Lista de Acessórios"
        barraDeFerramentas={<FerramentasDaListagem
        aoClicarEmNovo={() => navigate("/novo-acessorio")}
        aoClicarEmVoltar={() => navigate("/dashboard")}
        mostrarBotaoVoltar
        mostrarInputBusca
        textoDaBusca={hook.textoBusca}
        aoMudarTextoDeBusca={hook.setTextoBusca}
        />}
        >
        <TableAssessorios/>
        </LayoutBaseDePaginas>
    );
};