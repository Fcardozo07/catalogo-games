import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";

import { useNavigate } from "react-router-dom";
import { useListaConsoleData } from "../../shared/hooks/lista_consoles/useListaConsoleData";
import { TableConsoles } from "../../shared/components/lista_consoles/TableConsoles";



export const ListaConsoles = () => {
    const navigate = useNavigate(); // aqui é onde o tema é aplicado, ele vai aplicar o tema que está no provider, que é o AppThemeProvider.

    const hook = useListaConsoleData();


    return (
        <LayoutBaseDePaginas
        titulo="Lista de Consoles"
        barraDeFerramentas={<FerramentasDaListagem 
        aoClicarEmNovo={() => navigate("/novo-console")}
        aoClicarEmVoltar={() => navigate("/dashboard")}
        aoMudarTextoDeBusca={hook.setTextoBusca}
        textoDaBusca={hook.textoBusca}
        mostrarBotaoVoltar
        mostrarInputBusca
        />}
        >
      <TableConsoles
        itensFiltrados={hook.itensFiltrados}
        marcas={hook.marcas}
        modelos={hook.modelos}
        handledeletar={hook.handledeletar}
      />

        </LayoutBaseDePaginas>
    );
};