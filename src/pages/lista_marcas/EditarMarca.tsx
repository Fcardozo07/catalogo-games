import { Container, TextField, Typography } from "@mui/material";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts/LayoutBaseDePaginas";
import { use, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";  
import api from "../../shared/services/axios";

export const EditarMarca = () => {
    const navigate = useNavigate();

    const [descricao, setDescricao] = useState('');
    const [id, setId] = useState(0);
    const { idMarca } = useParams();
    const location = useLocation();
    const marca  = location.state?.marca;

    useEffect(() => {
        if (marca) {
            setDescricao(marca.descricao);
            setId(marca.id);
        }
    }, [marca]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await api.get(`/marcas/${idMarca}`);
                setDescricao(response.data.descricao);
                setId(response.data.id);
            } catch (error) {
                console.log("Erro ao buscar dados", error);
            }
        }
        getData();
    }, [idMarca]);

    const EditarMarca = async () => {
        const newMarca = { descricao };

        try {
            await api.put(`/marcas/${id}`, newMarca);
            alert('Marca editada com sucesso!');
            navigate('/lista-marcas');
        } catch (error) {
            console.log("Erro ao editar marca", error);
            alert('Erro ao editar marca');
        }
    }
    return (
        <LayoutBaseDePaginas
            titulo="Editar Marca"
            barraDeFerramentas={<FerramentasDeDetalhe
                textoBotaoNovo="Nova Marca"
                mostrarBotaoNovo={false}
                aoClicarEmSalvar={EditarMarca}
                aoClicarEmVoltar={() => navigate("/lista-marcas")}
            />}
        >
            <Container maxWidth="sm" sx={{ mt: 2 }}>
                <form>
                    <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
                        Edição de Marca
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
};

    
        
    
