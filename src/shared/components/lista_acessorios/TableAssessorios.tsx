import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useListaAcessoriosData } from "../../hooks/lista_acessorios/useListaAcessoriosData";
import { useNavigate } from "react-router-dom";
import { ITableAcessoriosProps } from "../../types/lista_acessorios/types";



export const TableAssessorios: React.FC<ITableAcessoriosProps> = (
    {itensFiltrados, marcas, modelos, handledeletar}
) => {

    const hook = useListaAcessoriosData();

    const navigate = useNavigate(); 


    return(
        <TableContainer component={Paper} variant="outlined" sx={{ m:1, width:'auto'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main'}}>Tipo</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main'}}>Marca</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main'}}>Modelo</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main'}}>Descrição</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main'}}>Valor</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }} align="center">Açoes</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {itensFiltrados.map((acessorios) => (
                        <TableRow key={acessorios.id}>
                            <TableCell>{acessorios.tipo}</TableCell>
                            <TableCell sx={{ fontSize:"20px" }}>
                                {marcas.find((marca) => marca.id === acessorios.id_marca)?.descricao}
                            </TableCell>
                            <TableCell sx={{ fontSize:"20px" }}>
                                {modelos.find((modelo) => modelo.id === acessorios.id_modelo)?.descricao}
                            </TableCell>
                            <TableCell sx={{ fontSize:"20px" }}>{acessorios.descricao}</TableCell>
                            <TableCell sx={{ fontSize:"20px" }}>R${acessorios.valor}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => navigate("/editar-acessorio", { state: { acessorios } })}>
                                    <Icon fontSize="large" color="primary">edit</Icon>
                                </IconButton>
                                <IconButton onClick={() => handledeletar(acessorios.id)}>
                                    <Icon fontSize="large" color="error">delete</Icon>
                                </IconButton>
                                <IconButton onClick={() => navigate("/detalhe-acessorios", { state: { acessorios } })} >
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