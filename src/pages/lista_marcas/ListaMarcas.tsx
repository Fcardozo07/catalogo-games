import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../shared/services/axios";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import {  FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
import { Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export const ListaMarcas = () => {

    const navigate = useNavigate();

    interface IMarcas{
        id: number;
        descricao: string;           
    }


    const [marcas, setMarcas] = useState<IMarcas[]>([]);
    const [itens, setItens] = useState<any[]>([]);
    const [textoBusca, setTextoBusca] = useState("");
    const [descricao, setDescricao] = useState<string | null>(null);
    const [id, setId] = useState<number | null>(null);

    const itensFiltrados = textoBusca.trim()
    ? itens.filter((item) =>
        item.descricao.toLowerCase().includes(textoBusca.toLowerCase())
    )
    : itens;

    useEffect(() => {
        async function getData(){
            try{
                const response = await api.get('/marcas');
                setMarcas(response.data);
                setItens(response.data);
            }catch(error){
                console.log("Erro ao buscar os dados",error);
            }
        }
        getData();
    }, []);

        
    const handledeletar = async (id: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja apagar esta marca?");
        
        if (!confirmDelete) {
            return; // Se o usuário clicar em "Cancelar", não faz nada
            }
        try{
            await api.delete(`/marcas/${id}`);
            setMarcas((prevMarcas) => prevMarcas.filter((marca) => marca.id !== id));
        }catch(error){
            console.error("Erro ao excluir marca:", error);
        }
    };


    const handleSubmit = async () => {
        if (descricao === null) {
            alert("Campo vazio, favor preencher o campo descrição")
            return;
        }
        const updatedMarca = { descricao: descricao };
        try {
            await api.put(`/marcas/${id}`, updatedMarca);
            alert("Marca editada com sucesso!");
            navigate("/lista-marcas");
        }
        catch (error) {
            console.error("Erro ao editar marca:", error);
            alert("Erro ao editar marca");
        }
    }

    return(
        <LayoutBaseDePaginas
        titulo="Lista de Marcas"
        barraDeFerramentas={<FerramentasDaListagem        
            aoClicarEmVoltar={() => navigate("/lista-marcas")}
            aoClicarEmNovo={() => navigate("/nova-marca")}
            mostrarBotaoVoltar
            mostrarInputBusca
            textoDaBusca={textoBusca}
            aoMudarTextoDeBusca={(texto) => setTextoBusca(texto)}
       
        />}

        >
            <TableContainer component={Paper} variant="outlined" sx={{ m:1, width:'auto'}}>
            <Table>
                <TableHead>
                    
                    <TableCell sx={{fontSize: 25, fontWeight: 'bold', color: 'secondary.main'}}>Marcas</TableCell>
                    <TableCell sx={{fontSize: 25, fontWeight: 'bold', color: 'secondary.main'}}>Editar</TableCell>
                    <TableCell sx={{fontSize: 25, fontWeight: 'bold', color: 'secondary.main'}}>Deletar</TableCell>
                </TableHead>
                <TableBody>
                    {itensFiltrados.map((marca) => (
                        <TableRow key={marca.id}>
                            <TableCell sx={{fontSize:"20px"}}>{marca.descricao}</TableCell>
                            <TableCell>
                                <Icon
                                fontSize="large"
                                color="primary"
                                sx={{cursor:"pointer"}}
                                onClick={() => navigate("/editar-marca", {state: {marca}})}
                                >edit</Icon>
                            </TableCell>
                            <TableCell>
                                <Icon
                                fontSize="large"
                                color="error"
                                sx={{cursor:"pointer"}}
                                onClick={() => handledeletar(marca.id)}
                                >delete</Icon>
                            </TableCell>
                
                        
                        </TableRow>
                    ))}
                </TableBody>
                    
            </Table>
</TableContainer>
        </LayoutBaseDePaginas>
    )
}
    