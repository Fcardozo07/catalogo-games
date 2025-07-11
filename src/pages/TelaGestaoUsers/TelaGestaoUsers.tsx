import { FerramentasDeDetalhe } from '../../shared/components';
import {TablleUsers} from '../../shared/components/GestaoUsers/TableUsers'
import { LayoutBaseDePaginas } from '../../shared/layouts';

const TelaGestaoUsers = () =>{
    return(
        <>
        <LayoutBaseDePaginas
        titulo="Detalhe do Console"
        barraDeFerramentas={<FerramentasDeDetalhe
            mostrarBotaoNovo={false}
            mostarBotaoSalvar={false}
            mostarBotaoSalvarVoltar={false}
            mostrarBotaoApagar={false}
            mostarBotaoVoltar={true}                       
        />}

        >
        <TablleUsers/> 
        </LayoutBaseDePaginas>
        <TablleUsers/> 
        </>

    )
}

export default TelaGestaoUsers;