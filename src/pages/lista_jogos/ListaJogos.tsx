import {  useEffect, useState } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import api from "../../shared/services/axios";
import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";


export const ListaJogos = () => {

const navigate = useNavigate(); // aqui é onde o tema é aplicado, ele vai aplicar o tema que está no provider, que é o AppThemeProvider.

const [itens, setItens] = useState<any[]>([]);
const [textoBusca, setTextoBusca] = useState("");

const itensFiltrados = textoBusca.trim()
  ? itens.filter((item) =>
      item.titulo.toLowerCase().includes(textoBusca.toLowerCase())
    )
  : itens;


    interface Jogo {
        id: number;
        titulo: string;
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
 
      

    const [jogos, setJogos] = useState<Jogo[]>([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);




      const getJogos = async () => {
            try {
                const response = await api.get("/jogos");
                setJogos(response.data);
                setItens(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);  
            }
            };

            useEffect(() => {
            getJogos();
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

        const handledeletar = async (id: number) => {
            const confirmDelete = window.confirm("Tem certeza que deseja apagar este jogo?");
            
            if (!confirmDelete) {
                return; // Se o usuário clicar em "Cancelar", não faz nada  

        };

        try {
            await api.delete(`/jogos/${id}`);
            setJogos((prevJogos) => prevJogos.filter((jogo) => jogo.id !== id));
            await getJogos(); 
        } catch (error) {
            console.error("Erro ao excluir jogo:", error);
        }
    }


    return (
        <LayoutBaseDePaginas
        titulo="Listagem de Jogos"
        barraDeFerramentas={<FerramentasDaListagem 
            aoClicarEmNovo={() => navigate("/novo-jogo")}
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

        </LayoutBaseDePaginas>
    );
};