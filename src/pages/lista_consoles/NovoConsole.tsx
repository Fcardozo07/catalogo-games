import {  useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { Box, Button, Container, Dialog, DialogContent, FormControl, Icon, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";


interface IItem {
  id: string;
  descricao: string;
  id_marca: string;
}

export const NovoConsole = () => {
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [id_marca, setMarca] = useState("");
  const [id_modelo, setModelo] = useState("");
  const [tipo, setTipo] = useState("");
  const [fotos, setFotos] = useState<string[]>([]);
  const [botaoSalvarDesabilitado, setBotaoSalvarDesabilitado] = useState(false);


  // Dados vindos da API
  const [marcas, setMarcas] = useState<IItem[]>([]);
  const [modelos, setModelos] = useState<IItem[]>([]);
  const [imagem, setImagem] = useState<File | null>(null);
  const [idConsoleCriado, setIdConsoleCriado] = useState<string | null>(null);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);


  const criarConsole = async () => {
    const newConsole = {
      descricao,
      valor,
      id_marca,
      id_modelo,
      tipo,
    };
  
    try {
      const response = await api.post("/consoles", newConsole);
      const id = response.data?.id; // assumindo que o id está em response.data.id
      setIdConsoleCriado(id);
      alert("Console criado com sucesso!");
      setBotaoSalvarDesabilitado(true);
      // NÃO navega automaticamente mais aqui
    } catch (error) {
      console.log("Erro ao criar console:", error);
      alert("Erro ao criar console");
    }
  };

  const handleUploadImagem = async () => {
    if (!imagem || !idConsoleCriado) return;
  
    const formData = new FormData();
    formData.append("foto", imagem);
    formData.append("id_console", idConsoleCriado);
  
    try {
      await api.post("/fotosConsole", formData, {
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
        console.log("Modelos:", modelosResp.data);

        setMarcas(marcasResp.data);
        setModelos(modelosResp.data);
        } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  const handleSalvarEVoltar = async () => {
    await criarConsole(); // aguarda a criação antes de navegar
    navigate("/lista-consoles");
  }

  const carregarImagens = async () => {
    if (!idConsoleCriado) return;
  
    try {
      console.log("Buscando fotos para o console com ID:", idConsoleCriado);
      const response = await api.get(`/fotosConsole/console/${idConsoleCriado}`);
      console.log("Resposta da API:", response.data);
  
      const baseUrl = 'http://localhost:3003/uploads/';
      const imagens = response.data.map((foto: any) => `${baseUrl}${foto.filename}`);
      console.log("Imagens geradas:", imagens);
  
      setFotos(imagens);
    } catch (error) {
      console.error("Erro ao carregar imagens:", error);
    }
  };
  
  
  return (
    <LayoutBaseDePaginas
      titulo="Novo Console"
      barraDeFerramentas={<FerramentasDeDetalhe
        mostrarBotaoNovo={false}
        mostrarBotaoApagar={false}
        mostarBotaoSalvarVoltar
        aoClicarEmSalvar={criarConsole}
        desabilitarBotaoSalvar={botaoSalvarDesabilitado}
        aoClicarEmSalvarVoltar={handleSalvarEVoltar}
        aoClicarEmVoltar={() => navigate("/lista-consoles")}
      />}
    >    

    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <form>
        <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
          Cadastro de Console
        </Typography>
        
  
        <FormControl fullWidth margin="normal">
        <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
                labelId="tipo-label"
                label="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
            >
                <MenuItem value="Console">Console de mesa</MenuItem>
                <MenuItem value="Portátil">Console portatil</MenuItem>
                <MenuItem value="Handheld">Hibrido</MenuItem>
            </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="marca-label">Marca</InputLabel>
          <Select
            labelId="marca-label"
            label="Marca"
            value={id_marca}
            onChange={(e) => setMarca(e.target.value)}
          >
            {marcas.map((marca) => (
              <MenuItem key={marca.id} value={marca.id}>
                {marca.descricao}
              </MenuItem>
            ))}
          </Select>
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
          label="Descrição"
          variant="outlined"
          fullWidth
          margin="normal"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <TextField
          label="Valor"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
        />

        
        

        <FormControl fullWidth margin="normal">
 

            {idConsoleCriado && (
            <FormControl fullWidth margin="normal">
              <Typography variant="subtitle1">Adicionar imagem ao console:</Typography>
                <input
                  accept="image/*"
                  id="upload-imagem"
                  type="file"
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

        </FormControl>
        {fotos.length > 0 && (
                    <Container sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>Imagens do Console</Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                            {fotos.map((url, idx) => (
                                <img
                                    key={idx}
                                    src={url}
                                    alt={`Console ${idx}`}
                                    style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 8 }}
                                />
                            ))}
                        </div>
                    </Container>
                )}
      </form>

    </Container>    
    </LayoutBaseDePaginas>
  )

}