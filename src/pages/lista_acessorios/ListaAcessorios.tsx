import {  useEffect, useState } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import api from "../../shared/services/axios";
import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../shared/contexts/AuthContext";

export const ListaAcessorios = () => {

    const navigate = useNavigate(); // aqui é onde o tema é aplicado, ele vai aplicar o tema que está no provider, que é o AppThemeProvider.
    const [itens, setItens] = useState<any[]>([]);
    const [textoBusca, setTextoBusca] = useState("");

    const { user } = useAuthContext();

    const itensFiltrados = textoBusca.trim()
      ? itens.filter((item) =>
          item.descricao.toLowerCase().includes(textoBusca.toLowerCase())
        )
      : itens;

      // Definindo as interfaces para os dados que serão utilizados

    interface Acessorio {
        id: number;
        tipo: string;
        id_marca: number;
        id_modelo: number;
        descricao: string;
        valor: number;
      }

      interface Marca {
        id: number;
        descricao: string;
      }

      interface Modelo {
        id: number;
        id_marca: number;
        descricao: string;
       
      }
    const [acessorios, setAcessorios] = useState<Acessorio[]>([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);


    const getAcessorios = async () => {
        try {
            const response = await api.get("/acessorios", { params: { id_usuario: user?.id } });
            setAcessorios(response.data);
            setItens(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };
    useEffect(() => {
        if(user?.id)
        getAcessorios();
    }, [user]);

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

        useEffect(() => {
            async function getData() {
            try {
                const response = await api.get("/modelos");
                setModelos(response.data);
                
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
            }
        
            getData();
        } , []);

        const handleDeletar = async (id: number) => {
            const confirmDelete = window.confirm("Tem certeza que deseja apagar este acessório?");
            
            if (!confirmDelete) {
                return; // Se o usuário clicar em "Cancelar", não faz nada
            }
        
            try {
                await api.delete(`/acessorios/${id}`);
                setAcessorios((prevAcessorios) => prevAcessorios.filter((acessorio) => acessorio.id !== id));
                await getAcessorios(); // Atualiza a lista de acessórios após a exclusão
            } catch (error) {
                console.error("Erro ao excluir acessório:", error);
            }
        };
        


    return (
        <LayoutBaseDePaginas
        titulo="Lista de Acessórios"
        barraDeFerramentas={<FerramentasDaListagem
        aoClicarEmNovo={() => navigate("/novo-acessorio")}
        aoClicarEmVoltar={() => navigate("/dashboard")}
        mostrarBotaoVoltar
        mostrarInputBusca
        textoDaBusca={textoBusca}
        aoMudarTextoDeBusca={setTextoBusca}
        />}
        >
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
                                <IconButton onClick={() => handleDeletar(acessorios.id)}>
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
        </LayoutBaseDePaginas>
    );
};