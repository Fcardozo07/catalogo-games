import {
    Container,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Box,
    Icon,
  } from "@mui/material";
  import { FerramentasDeDetalhe } from "../../shared/components";
  import { LayoutBaseDePaginas } from "../../shared/layouts";
  import { useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import api from "../../shared/services/axios";
  
  interface IItem {
    id: string;
    descricao: string;
    id_marca: string;
  }

  export const NovoAcessorio = () => {
    const navigate = useNavigate();
  
  
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [id_marca, setMarca] = useState("");
    const [id_modelo, setModelo] = useState("");
    const [id_console, setConsole] = useState("");
    const [tipo, setTipo] = useState("");
    const [botaoSalvarDesabilitado, setBotaoSalvarDesabilitado] = useState(false);

  
    // Dados vindos da API
    const [marcas, setMarcas] = useState<IItem[]>([]);
    const [modelos, setModelos] = useState<IItem[]>([]);
    const [consoles, setConsoles] = useState<IItem[]>([]);
    const [idAcessorioCriado, setIdAcessorioCriado] = useState<string | null>(null);
    const [imagem, setImagem] = useState<File | null>(null);
    const [fotos, setFotos] = useState<string[]>([]);

  
    const criarAcessorio = async () => {
      const newAcessorio = {
        tipo,
        descricao,
        valor,
        id_marca,
        id_modelo,
        id_console: id_console || null, 
      };
  
      try {
        const response =  await api.post("/acessorios", newAcessorio);
        const id = response.data?.id; // assumindo que o id está em response.data.id
        setIdAcessorioCriado(id);
        alert("Acessório criado com sucesso!");
        setBotaoSalvarDesabilitado(true);
        //navigate("/acessorios");
      } catch (error) {
        console.log("Erro ao criar acessório:", error);
        alert("Erro ao criar acessório");
      }
    };
  
    const carregarImagens = async () => {
      if (!idAcessorioCriado) return;
  
      try {
        console.log("Buscando fotos para o acessório com ID:", idAcessorioCriado);
        const response = await api.get(`/fotosAcessorios/acessorio/${idAcessorioCriado}`);
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
      if (!imagem || !idAcessorioCriado) return;
  
      const formData = new FormData();
      formData.append("foto", imagem);
      formData.append("id_acessorio", idAcessorioCriado);

      try {
        await api.post("/fotosAcessorios", formData, {
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
      
    }

    useEffect(() => {
        async function fetchData() {
          try {
            const marcasResp = await api.get("/marcas");
            const modelosResp = await api.get("/modelos");
            const consolesResp = await api.get("/consoles");
      
            console.log("Marcas:", marcasResp.data);
            console.log("Modelos:", modelosResp.data);
            console.log("Consoles:", consolesResp.data);
      
            setMarcas(marcasResp.data);
            setModelos(modelosResp.data);
            setConsoles(consolesResp.data);
          } catch (err) {
            console.error("Erro ao buscar dados:", err);
          }
        }
      
        fetchData();
      }, []);
  
      const handleSalvarEVoltar = async () => {
        await criarAcessorio(); // aguarda a criação antes de navegar
        navigate("/lista-acessorios");
      };

    return (
      <LayoutBaseDePaginas
        titulo="Novo Acessório"
        barraDeFerramentas={
          <FerramentasDeDetalhe
            mostrarBotaoNovo={false}
            mostrarBotaoApagar={false}
            mostarBotaoSalvarVoltar
            aoClicarEmSalvar={criarAcessorio}
            desabilitarBotaoSalvar={botaoSalvarDesabilitado}
            aoClicarEmSalvarVoltar={handleSalvarEVoltar}
            aoClicarEmVoltar={() => navigate("/lista-acessorios")}
          />
        }
      >
        <Container maxWidth="sm" sx={{ mt: 2 }}>
          <form>
            <Typography
              variant="h6"
              display="flex"
              justifyContent="center"
              gutterBottom
            >
              Cadastro de Acessório
            </Typography>
  
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo</InputLabel>
              <Select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                label="Tipo"
              >
                <MenuItem value="Controle">Controle</MenuItem>
                <MenuItem value="Cabo de Video">Cabo de Video</MenuItem>
                <MenuItem value="Memory Card">Memory Card</MenuItem>
                <MenuItem value="Motion Plus">Motion Plus</MenuItem>
                <MenuItem value="Fonte de Alimentação">Fonte de Alimentação</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Marca</InputLabel>
              <Select
                value={id_marca}
                onChange={(e) => setMarca(e.target.value)}
                label="Marca"
              >
                {marcas.map((marca) => (
                  <MenuItem key={marca.id} value={marca.id}>
                    {marca.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
                
            <FormControl fullWidth margin="normal">
              <InputLabel>Modelo</InputLabel>
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
              <InputLabel>Console (Opcional)</InputLabel>
              <Select
                value={id_console}
                onChange={(e) => setConsole(e.target.value)}
                label="Console"
              >
                {consoles.map((console) => (
                  <MenuItem key={console.id} value={console.id}>
                    {console.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


            {idAcessorioCriado && (
            <FormControl fullWidth margin="normal">
              <Typography variant="subtitle1">Adicionar imagem ao acessório:</Typography>
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
          
          {fotos.length > 0 && (
            <Container sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>Imagens do Acessório</Typography>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {fotos.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Acessório ${idx}`}
                    style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 8 }}
                  />
                ))}
              </div>
            </Container>
          )}
          
            
          </form>
  
        </Container>
      </LayoutBaseDePaginas>
    );
  };
  