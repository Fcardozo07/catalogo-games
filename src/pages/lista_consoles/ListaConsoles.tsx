import {  useEffect, useState } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import api from "../../shared/services/axios";
import { Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";


export const ListaConsoles = () => {

    const [itens, setItens] = useState<any[]>([]);
    const [textoBusca, setTextoBusca] = useState("");

    const navigate = useNavigate(); // aqui é onde o tema é aplicado, ele vai aplicar o tema que está no provider, que é o AppThemeProvider.
    interface Console {
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

      const itensFiltrados = textoBusca.trim()
      ? itens.filter((item) =>
          item.descricao.toLowerCase().includes(textoBusca.toLowerCase())
        )
      : itens;

    const getConsoles = async () => {
        try {
            const response = await api.get("/consoles");
            setConsoles(response.data);
            setItens(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };
    useEffect(() => {
        getConsoles();
    }, []);
     // Definindo as interfaces para os dados que serão utilizados     
      

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
            const confirmDelete = window.confirm("Tem certeza que deseja apagar este console?");
            
            if (!confirmDelete) {
                return; // Se o usuário clicar em "Cancelar", não faz nada
            }
            
            try {
                await api.delete(`/consoles/${id}`);
                setConsoles((prevConsoles) => prevConsoles.filter((console) => console.id !== id));
                await getConsoles();
            } catch (error) {
                console.error("Erro ao excluir console:", error);
            }
        };


    const [consoles, setConsoles] = useState<Console[]>([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);

    return (
        <LayoutBaseDePaginas
        titulo="Lista de Consoles"
        barraDeFerramentas={<FerramentasDaListagem 
        aoClicarEmNovo={() => navigate("/novo-console")}
        aoClicarEmVoltar={() => navigate("/dashboard")}
        aoMudarTextoDeBusca={setTextoBusca}
        textoDaBusca={textoBusca}
        mostrarBotaoVoltar
        mostrarInputBusca
        />}
        >
        <TableContainer component={Paper} variant="outlined" sx={{ m:1, width:'auto'}}>
            <Table>
                <TableHead>
                    <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Tipo</TableCell>
                    <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Marca</TableCell>
                    <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }} >Modelo</TableCell>
                    <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Descrição</TableCell>
                    <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }}>Valor</TableCell>
                    <TableCell sx={{ fontSize: 25, fontWeight: 'bold', color: 'secondary.main' }} align="center">Açoes</TableCell>
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
                  <IconButton onClick={() => navigate("/editar-jogo", { state: { console } })}>
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
        </LayoutBaseDePaginas>
    );
};