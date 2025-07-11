import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useListaConsoleData } from "../../hooks/lista_consoles/useListaConsoleData"
import { useNavigate } from "react-router-dom";
import { ITableConsolesProps } from "../../types/lista_consoles/types";




export const TableConsoles: React.FC<ITableConsolesProps> = (
    {itensFiltrados, marcas, modelos, handledeletar}
) => {

  const navigate = useNavigate(); 



return(
    <TableContainer component={Paper} variant="outlined" sx={{ m:1, width:'auto'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Tipo</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Marca</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }} >Modelo</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Descrição</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Valor</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }} align="center">Açoes</TableCell>
                    </TableRow>
                 </TableHead>

                <TableBody>
            {itensFiltrados.map((console) => (
              <TableRow key={console.id}>
                <TableCell sx={{ fontSize:"20px" }}>{console.tipo}</TableCell>
                <TableCell sx={{ fontSize:"20px" }}>
                  {marcas.find((marca) => marca.id === console.id_marca)?.descricao || "---"}
                </TableCell>
                <TableCell sx={{ fontSize:"20px" }}>
                  {modelos.find((modelo) => modelo.id === console.id_modelo)?.descricao || "---"}
                </TableCell>
                <TableCell sx={{ fontSize:"20px" }}>{console.descricao}</TableCell>
                <TableCell sx={{ fontSize:"20px" }}>R$ {console.valor}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => navigate("/editar-console", { state: { console } })}>
                      <Icon fontSize="large" color="primary">edit</Icon>
                  </IconButton>
                  <IconButton onClick={() => handledeletar(console.id)}>
                      <Icon fontSize="large" color="error">delete</Icon>
                  </IconButton>
                  <IconButton onClick={() => navigate("/detalhe-consoles", { state: { console } })} >
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