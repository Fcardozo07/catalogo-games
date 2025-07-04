import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../shared/services/axios";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { Container, MenuItem, TextField } from "@mui/material";

type IModelo = {
    id: number;
    descricao: string;
    id_marca: number;
}

type IMarca = {
    id: number;
    descricao: string;
}

export const EditaModelo = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const modelo = location.state?.modelo;
    
    const [descricao, setDescricao] = useState('');
    const { idModelo } = useParams();
    const [id, setId] = useState(0);
    const [idMarca, setIdMarca] = useState<number | ''>('');
    const [marcas, setMarcas] = useState<IMarca[]>([]);
   
    useEffect(() => {
        if (modelo) {
            setDescricao(modelo.descricao);
            setId(modelo.id);
            setIdMarca(modelo.id_marca);
        }
    }, [modelo]);

    useEffect(() => {
        async function getData() {
            try {
                const responseMarcas = await api.get('/marcas');
                setMarcas(responseMarcas.data);
        
                const responseModelo = await api.get(`/modelos/${idModelo}`);
                setDescricao(responseModelo.data.descricao);
                setId(responseModelo.data.id);
                setIdMarca(responseModelo.data.id_marca);
            } catch (error) {
                console.log("Erro ao buscar dados", error);
            }
        }
        getData();
    }, [idModelo]);

    const EditarModelo = async () => {
        const newModelo = { descricao, id_marca: idMarca };
        try {
            await api.put(`/modelos/${id}`, newModelo);
            alert('Modelo editado com sucesso!');
            navigate('/lista-modelos');
        }
        catch (error) {
            console.log("Erro ao editar modelo", error);
        }
    }

    return(
        <LayoutBaseDePaginas
            titulo="Editar Modelo"
            barraDeFerramentas={<FerramentasDeDetalhe
                textoBotaoNovo="Novo Modelo"
                mostrarBotaoNovo={false}
                aoClicarEmSalvar={EditarModelo}
                aoClicarEmVoltar={() => navigate("/lista-modelos")}
            />}
        >
            <Container maxWidth="sm" sx={{ mt: 2 }}>
                <form>
                    <TextField
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        label="Descrição"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="Marca"
                        value={idMarca}
                        onChange={(e) => setIdMarca(Number(e.target.value))}
                        fullWidth
                        margin="normal"
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