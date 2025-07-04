import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../shared/services/axios";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import {  FerramentasDeDetalhe } from "../../shared/components";
import { Container, MenuItem, TextField, Typography } from "@mui/material";


export const NovoModelo = ()=>{

    const navigate = useNavigate();
    
   interface IMarcas{
    id: number;
    descricao: string;
   } 
    
   const [marcas, setMarcas] = useState<IMarcas[]>([]);
   const [descricao, setDescricao] = useState("");
   const [id_marca, setMarca] = useState("");

   
   const criarModelo = async () => {
    const newModelo ={
        id_marca,
        descricao,
    }

    try{
        await api.post("/modelos", newModelo);
        alert("Modelo criado com sucesso!");
        //navigate("/lista-modelos");
    }catch(error){
        console.log("Erro ao criar modelo:", error);
        alert("Erro ao criar modelo");
    }


    }
   
    useEffect(() => {
        async function getData() {
            try{
                const response = await api.get("/marcas");
                setMarcas(response.data);
            }catch(error){
                console.log("Erro ao buscar dados", error);
            }
        }
        getData();
    }, []);
    

    
    return(
     <LayoutBaseDePaginas
     titulo="Novo Modelo"
     barraDeFerramentas={<FerramentasDeDetalhe
        aoClicarEmNovo={() => navigate("/novo-modelo")}
        aoClicarEmVoltar={() => navigate("/lista-modelos")}
        aoClicarEmSalvar={criarModelo}
       
        />}
     >
        <Container maxWidth="sm" sx={{ mt: 2 }}>
            <form>

                <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
                    Cadastro de Modelo
                </Typography>

                <TextField
                fullWidth
                label="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                margin="normal"
                variant="outlined"
                />
                <TextField
                fullWidth
                label="Marca"
                select
                value={id_marca}
                onChange={(e) => setMarca(e.target.value)}
                margin="normal"
                variant="outlined"
                >
                {marcas.map((marca) => (
                    <MenuItem key={marca.id} value={marca.id}>
                    {marca.descricao}
                    </MenuItem>
                ))}
                </TextField>
            </form>
        </Container>

     </LayoutBaseDePaginas>
    )
}