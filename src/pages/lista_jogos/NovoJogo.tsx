


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { Box, Button, Container, FormControl, Icon, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useAuthContext } from "../../shared/contexts/AuthContext";

interface IItem {
    id: string;
    descricao: string;
    id_marca: string;
  }

  

export const NovoJogo = () => {
    const navigate = useNavigate();
    
    const { user } = useAuthContext();
    
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [id_marca, setMarca] = useState("");
    const [id_modelo, setModelo] = useState("");
    const [botaoSalvarDesabilitado, setBotaoSalvarDesabilitado] = useState(false);
    
 
    
    // Dados vindos da API
    const [marcas, setMarcas] = useState<IItem[]>([]);
    const [modelos, setModelos] = useState<IItem[]>([]);
    const [idJogoCriado, setIdJogoCriado] = useState<string | null>(null);
    const [fotos, setFotos] = useState<string[]>([]);
    const [imagem, setImagem] = useState<File | null>(null);
    
    
   
    
    
    const criarJogo = async () => {
        const newJogo = {
        titulo,
        descricao,
        valor,
        id_marca,
        id_modelo,
        id_usuario:user?.id
        };
    
        try {
        const response = await api.post("/jogos", newJogo);
        const id = response.data?.id; // assumindo que o id está em api.data.id
        setIdJogoCriado(id);
        alert("Jogo criado com sucesso!");
        setBotaoSalvarDesabilitado(true);
        //navigate("/jogos");
        } catch (error) {
        console.log("Erro ao criar jogo:", error);
        alert("Erro ao criar jogo");
        }
    };

    const carregarImagens = async () => {
        if (!idJogoCriado) return;
    
        try {
            console.log("Buscando fotos para o jogo com ID:", idJogoCriado);
            const response = await api.get(`/fotosJogos/jogo/${idJogoCriado}`);
            console.log("Resposta da API:", response.data);

            const baseUrl = 'http://localhost:3003/uploads/';
            const imagens = response.data.map((foto: any) => `${baseUrl}${foto.filename}`);
            console.log("Imagens geradas:", imagens);

            setFotos(imagens);
        } catch (error) {
            console.error("Erro ao carregar imagens:", error);
        }
    };

    const handleUploadImagem = async () => {
        if (!imagem || !idJogoCriado) return;

        const formData = new FormData();
        formData.append("foto", imagem);
        formData.append("id_jogos", idJogoCriado);

        try {
            await api.post("/fotosJogos", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Imagem enviada com sucesso!");
            setImagem(null);
            carregarImagens(); // carregar imagens após o upload
        } catch (error) {
            console.error("Erro ao enviar imagem:", error);
            alert("Erro ao enviar imagem");
        }
    };

            
    
    useEffect(() => {
        async function fetchData() {
        try {
            const marcasResp = await api.get("/marcas");
            const modelosResp = await api.get("/modelos");
    
            console.log("Marcas:", marcasResp.data);
            console.log("Consoles:", modelosResp.data);
    
            setMarcas(marcasResp.data);
            setModelos(modelosResp.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
        }
    
        fetchData();
    }, []);
    
    return (
        <LayoutBaseDePaginas
            titulo="Novo Jogo"
            barraDeFerramentas={<FerramentasDeDetalhe
                textoBotaoNovo="Novo Jogo"
                mostrarBotaoNovo={false}              
                aoClicarEmSalvar={criarJogo}
                aoClicarEmNovo={() => navigate("/novo-jogo")}
                aoClicarEmVoltar={() => navigate("/lista-jogos")}
                desabilitarBotaoSalvar={botaoSalvarDesabilitado}

            />}
        >
            <Container maxWidth="sm" sx={{ mt: 2 }}>
                <form>
                    <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
                        Cadastro de Jogo
                    </Typography>

                    <FormControl fullWidth margin="normal">                        
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
        </FormControl>

        <FormControl fullWidth margin="normal">
                    <InputLabel id="modelo-label">Modelo</InputLabel>
                    <Select
                    labelId="modelo-label"
                    label="Modelo"
                    value={id_modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    disabled={!id_marca} // desativa o select se nenhuma marca foi escolhida
                    >
                    {modelos
                        .filter((modelo) => modelo.id_marca === id_marca)
                        .map((modelo) => (
                        <MenuItem key={modelo.id} value={modelo.id}>
                            {modelo.descricao}
                        </MenuItem>
                        ))}
        </Select>

        </FormControl>

                    <TextField
                        fullWidth
                        label="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
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
                        label="Valor"
                        value={valor}
                        onChange={(e) => setValor(Number(e.target.value))}
                        margin="normal"
                        variant="outlined"
                        type="number"
                    />
                    
                    
        
        {idJogoCriado && (
            <FormControl fullWidth margin="normal">
                <Typography variant="subtitle1">Adicionar imagem ao jogo:</Typography>
                <input
                    id="upload-imagem"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setImagem(e.target.files[0]);
                        }
                    }}
                />

                <label htmlFor="upload-imagem">
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<Icon>upload</Icon>}
                            fullWidth 
                        >
                            Escolher Imagem
                        </Button>
                    </Box>
                        
                </label>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUploadImagem}
                    disabled={!imagem}
                    startIcon={<Icon>cloud_upload</Icon>}
                >
                    Enviar Imagem
                </Button>
            </FormControl>  
        )}
                  

    </form>
    {fotos.length > 0 && (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Imagens do Jogo</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {fotos.map((url, idx) => (
                    <img
                        key={idx}
                        src={url}
                        alt={`Jogo ${idx}`}
                        style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 8 }}
                    />
                ))}
            </div>
        </Container>
    )}

                
            </Container>
        </LayoutBaseDePaginas>


    )
        
}    