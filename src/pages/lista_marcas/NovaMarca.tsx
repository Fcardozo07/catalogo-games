import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { Container, TextField, Typography } from "@mui/material";



export const NovaMarca = () =>{
    const navigate = useNavigate();

const [descricao, setDescricao] = useState('');

const CriarMarca = async () =>{
    const newMarca = {descricao};

    try{
        await api.post('/marcas', newMarca);
        alert('Marca criada com sucesso!');
        navigate('/lista-marcas');
    }catch(error){
        console.log("Erro ao salvar nova marca",error);
        alert('Erro ao salvar nova marca');
    }
}


    return(
        <LayoutBaseDePaginas
        titulo="Nova Marca"
        barraDeFerramentas={<FerramentasDeDetalhe
            textoBotaoNovo="Nova Marca"
            mostrarBotaoNovo={false}              
            aoClicarEmSalvar={CriarMarca}
            aoClicarEmVoltar={() => navigate("/lista-marcas")}
        />}
        >
            <Container maxWidth="sm" sx={{ mt: 2 }}>
                <form>
                    <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
                        Cadastro de Marca
                    </Typography>
                    <TextField
                        fullWidth
                        label="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                </form>
            </Container>

        </LayoutBaseDePaginas>
    )
}