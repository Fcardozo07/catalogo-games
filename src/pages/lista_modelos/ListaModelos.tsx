import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LayoutBaseDePaginas } from "../../shared/layouts";
import api from "../../shared/services/axios";
import { FerramentasDaListagem } from "../../shared/components";
import { Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export const ListaModelos = () =>{


    interface IModelo {
        id: number;
        id_marca: number;
        descricao: string;
       
      }

      interface IMarca {
        id: number;
        descricao: string;
      }


    const navigate = useNavigate();
    
    const [modelos, setModelos] = useState<IModelo[]>([]);
    const [marcas, setMarcas] = useState<IMarca[]>([]); 
    const [itens, setItens] = useState<any[]>([]);
    const [descricao, setDescricao] = useState<string | null>(null);
    const [id, setId] = useState<number | null>(null);

    const [textoBusca, setTextoBusca] = useState(""); 
 
    const itensFiltrados = textoBusca.trim()
  ? itens.filter((item) =>
      item.descricao.toLowerCase().includes(textoBusca.toLowerCase())
    )
  : itens;

    useEffect(() => {
        async function getData() {
            try{
                const response = await api.get("/modelos")
                setModelos(response.data);
                setItens(response.data);
               
            }catch(error){
                console.log("Erro ao buscar dados", error);
            }
        }
          getData();
    
    }, []);

    useEffect(() => {
        async function getData() {
        try {
            const response = await api.get("/marcas");
            setMarcas(response.data);
            
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
        }
    
        getData();
    }, []);

        const handledeletar = async (id: number) => {
            const confirmDelete = window.confirm("Tem certeza que deseja apagar este modelo?");
            
            if (!confirmDelete) {
                return; // Se o usuário clicar em "Cancelar", não faz nada
                }
            try{
                await api.delete(`/modelos/${id}`);
                setModelos((prevModelos) => prevModelos.filter((modelo) => modelo.id !== id));
            }catch(error){
                console.error("Erro ao excluir Modelo:", error);
            }
        }
    
    return(
        <LayoutBaseDePaginas
        titulo="Lista de Modelos"
        barraDeFerramentas={<FerramentasDaListagem
            aoClicarEmNovo={() => navigate("/novo-modelo")}
            aoClicarEmVoltar={() => navigate("/dashboard")}
            mostrarBotaoVoltar
            mostrarInputBusca
            textoDaBusca={textoBusca}
            aoMudarTextoDeBusca={(texto) => setTextoBusca(texto)}
        
        />}
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m:1, width:'auto'}}>
                <Table>
                    <TableHead>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main'}}>Marca</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main'}}>Descricao</TableCell>
                        <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main'}}>Açoes</TableCell>
                    
                    </TableHead>
                    <TableBody>
                        {itensFiltrados.map((modelo) => (
                            <TableRow key={modelo.id}>
                                <TableCell sx={{ fontSize:"20px" }}>
                                {marcas.find((marca) => marca.id === modelo.id_marca)?.descricao || '---'}
                                </TableCell>
                                <TableCell sx={{ fontSize:"20px" }}>{modelo.descricao}</TableCell>
                                <TableCell>
                                    <Icon
                                    fontSize="large"
                                    color="error"
                                    sx={{cursor:"pointer", marginRight:"10px"}}
                                    onClick={() => handledeletar(modelo.id)}
                                    >delete</Icon>                           
                                    <Icon
                                    fontSize="large"
                                    color="primary"
                                    sx={{cursor:"pointer"}}
                                    onClick={() => navigate("/editar-modelo", { state: {modelo} })}
                                    >edit</Icon>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </LayoutBaseDePaginas>

    ) 
 }