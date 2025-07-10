
import {Routes, Route, Navigate} from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, DetalheDeAcessorios, DetalheDeConsoles, DetalheDeJogos,
     EditaModelo,
     EditarAcessorios, EditarConsoles, EditarJogos, ListaAcessorios, ListaConsoles, ListaMarcas, ListaModelos,
      NovaMarca, NovoAcessorio, NovoConsole, NovoJogo, 
      NovoModelo} from "../pages";

import { ListaJogos } from "../pages/lista_jogos/ListaJogos";
import { EditarMarca } from "../pages/lista_marcas/EditarMarca";
import { TelaLogin } from "../pages/tela_login/Tela_Login";
import { Tela_Cadastro_User } from "../pages/tela_cadastro_user/Tela_Cadastro_User";
import { TelaEditarUser } from "../pages/TelaEditaUser/TelaEditarUser";
import ProtectedRoute from "../shared/midlleware/ProtectedRoute";


export const AppRoutes = () => {

    const {  setDrawerOptions }  = useDrawerContext(); // aqui é onde o tema é aplicado, ele vai aplicar o tema que está no provider, que é o AppThemeProvider.

    useEffect(() => {
        setDrawerOptions([
            {
                icon: "home",
                label: "Página Inicial",
                path: "/pagina-inicial"
            },

          

            {
                icon: "sports_esports",
                label: "Jogos",
                path: "/lista-jogos",
            },

            {
                icon: "sports_esports",
                label: "Consoles",
                path: "/lista-consoles",
            },

            {
                icon: "sports_esports",
                label: "Acessórios",
                path: "/lista-acessorios",
            },



                        
        ]);

    },[]);

    return (
        <Routes>

            <Route element={<ProtectedRoute/>}>
                <Route path="/nova-marca" element={<NovaMarca/>}/>
                <Route path="/novo-modelo" element={<NovoModelo/>}/>
                <Route path="/lista-marcas" element={<ListaMarcas/>}/>         
                <Route path="/lista-modelos" element={<ListaModelos/>}/>
                <Route path="/editar-marca" element={<EditarMarca/>}/>
                <Route path="/editar-modelo" element={<EditaModelo/>}/>     
            </Route>

            <Route path="tela-login" element={<TelaLogin/>}/>
            <Route path="/cadastro-user" element={<Tela_Cadastro_User/>}/>
            <Route path='/editar-user' element={<TelaEditarUser/>}/>
            <Route path="/pagina-inicial" element={<Dashboard/>}/>
            <Route path="/lista-jogos" element={<ListaJogos/>}/>
            <Route path="/lista-consoles" element={<ListaConsoles/>}/>
            <Route path="/lista-acessorios" element={<ListaAcessorios/>}/>
            <Route path="/lista-marcas" element={<ListaMarcas/>}/>         
            <Route path="/lista-modelos" element={<ListaModelos/>}/>         
            <Route path="/detalhe-jogos" element={<DetalheDeJogos/>}/>
            <Route path="/detalhe-consoles" element={<DetalheDeConsoles/>}/>
            <Route path="/detalhe-acessorios" element={<DetalheDeAcessorios/>}/>
            <Route path="/novo-acessorio" element={<NovoAcessorio/>}/> 
            <Route path="/novo-console" element={<NovoConsole/>}/>
            <Route path="/novo-jogo" element={<NovoJogo/>}/>       
            <Route path="/editar-acessorio" element={<EditarAcessorios/>}/>
            <Route path="/editar-console" element={<EditarConsoles/>}/>
            <Route path="/editar-jogo" element={<EditarJogos/>}/>
            <Route path="*" element={<Navigate to="/tela-login"/>}/>

        </Routes>
    )

        
}