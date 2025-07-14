import {   useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { Box, Button, Container, Dialog, DialogContent, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import { useAuthContext } from "../../shared/contexts/AuthContext";
import { FormEditarJogos } from "../../shared/components/lista_jogos/FormEditarJogo";
import { useEditarJogoData } from "../../shared/hooks/lista_jogos/useEditarJogoData";



export const EditarJogos = () => {

   const navigate = useNavigate();
   const hook  = useEditarJogoData();

   
    return(
        <LayoutBaseDePaginas
            titulo="Editar Jogo"
            barraDeFerramentas={<FerramentasDeDetalhe
                mostrarBotaoNovo={false}
                mostarBotaoSalvar               
                mostrarBotaoApagar={false}
                mostarBotaoVoltar
                aoClicarEmVoltar={() => navigate("/lista-jogos")}
                aoClicarEmSalvar={hook.handleSubmit}
                />}
            >
    
                <FormEditarJogos {...hook} />
            

        </LayoutBaseDePaginas>
    )
}
                                                               