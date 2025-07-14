import React from "react";
import { ITableJogosProps } from "../../types/lista_jogos/types";
import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";



export const TableJogos: React.FC<ITableJogosProps> = ({itensFiltrados, marcas, modelos, handledeletar}) =>{

    const navigate = useNavigate();


    return(
     <TableContainer component={Paper} variant="outlined" sx={{ m:1, width:'auto'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Título</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }} >Marca</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Modelo</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Descrição</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Valor</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }} align="center">Açoes</TableCell>                  
                    </TableRow>

                </TableHead>

                <TableBody>
                    {itensFiltrados.map((jogo) => (
                       <TableRow
                        key={jogo.id}
                        sx={{ "&:nth-of-type(odd)": { backgroundColor: "rgba(255, 255, 255, 0.03)" } }}
                        >

                            <TableCell sx={{ fontSize:"20px" }}>{jogo.titulo}</TableCell>
                            <TableCell sx={{ fontSize:"20px" }}>
                                {marcas.find((marca) => marca.id === jogo.id_marca)?.descricao || '---'}
                            </TableCell >
                            <TableCell sx={{ fontSize:"20px" }}>{modelos.find((modelo) => modelo.id === jogo.id_modelo)?.descricao || '---'}</TableCell>
                            <TableCell sx={{ fontSize:"20px" }}>{jogo.descricao}</TableCell>
                            <TableCell sx={{ fontSize:"20px" }}>{jogo.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => navigate("/editar-jogo", { state: { jogo } })}>
                                    <Icon fontSize="large" color="primary">edit</Icon>
                                </IconButton>
                                <IconButton onClick={() => handledeletar(jogo.id)}>
                                    <Icon fontSize="large" color="error">delete</Icon>
                                </IconButton>
                                <IconButton onClick={() => navigate("/detalhe-jogos", { state: { jogo } })} >
                                    <Icon fontSize="large" color="secondary">visibility</Icon>
                                </IconButton>
                            </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                
                
            </Table>
        </TableContainer>
    )
}