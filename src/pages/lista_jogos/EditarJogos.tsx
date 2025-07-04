import {   useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { Box, Button, Container, Dialog, DialogContent, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Marca = {
    id: number;
    descricao: string;
  };
  
  type Modelo = {
    id: number;
    descricao: string;
  };
  
  type Foto = {
    id: string;
    url: string;
};

export const EditarJogos = () => {

    const location = useLocation();
    const jogo = location.state?.jogo;
    const navigate = useNavigate();

    const [jogos, setJogos] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [marca, setMarca] = useState<number | null>(null);
    const [modelo, setModelo] = useState<number | null>(null); 
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [fotos, setFotos] = useState<Foto[]>([]);
    const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            const jogoResp = await api.get("/jogos");
            const marcasResp = await api.get("/marcas");
            const modelosResp = await api.get("/modelos");
            
            
            setJogos(jogoResp.data);
            setMarcas(marcasResp.data);
            setModelos(modelosResp.data);
            }
        fetchData();
    }, []);

    useEffect(() => {
        if (jogo) {
            setTitulo(jogo.titulo); 
            setDescricao(jogo.descricao);
            setValor(jogo.valor);         
            setMarca(jogo.id_marca);
            setModelo(jogo.id_modelo);
        }
    }
    , [jogo]);

    const handleSubmit = async () => {
        if (marca === null || modelo === null) {
            alert("Marca e Modelo precisam ser preenchidos corretamente.");
            return;
        }
        const updatedJogo = {
            titulo: titulo, 
            descricao: descricao,
            valor: valor,         
            id_marca: marca,
            id_modelo: modelo,
        };
        
        try {
            await api.put(`/jogos/${jogo.id}`, updatedJogo);

            if(novasImagens.length > 0) {
                const promisses = novasImagens.map(async (imagem) => {
                    const formData = new FormData();
                    formData.append("foto", imagem);
                    formData.append("id_jogos", String(jogo.id));

                    return await api.post("/fotosJogos", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                });

                await Promise.all(promisses);
            }



            alert("Jogo atualizado com sucesso!");
            navigate("/lista-jogos");
        } catch (error) {
            console.error("Erro ao atualizar o jogo:", error);
            alert("Erro ao atualizar o jogo. Tente novamente.");
        }
    };

    
    const [novasImagens, setNovasImagens] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
        setNovasImagens(Array.from(files)); // Salva os arquivos selecionados
    }
    };

    const fetchFotos = async () => {
        if(jogo?.id) {
            try {
                console.log("buscando fotos do jogo com id:", jogo.id);

                const response = await api.get(`/fotosJogos/jogo/${jogo.id}`);
                console.log("Resposta da API:", response.data);

                const baseUrl = 'http://localhost:3003/uploads/'; // URL base para as imagens
                const imagens = response.data.map((foto: any) => ({
                    id: foto.id,
                    url: `${baseUrl}${foto.filename}`,
                }));
                setFotos(imagens);
                console.log("Imagens geradas:", imagens);
            } catch (error) {
                console.error("Erro ao buscar fotos:", error);
            }
        } else {
            console.log("Não há um jogo com ID válido para buscar as fotos.");
        }
    };

    useEffect(() => {
        if (jogo?.id) {
            fetchFotos();
        }
    }, [jogo]);

    




      const handleDeleteFoto = async (id: string) => {
        try {
          await api.delete(`/fotosJogos/${id}`);
          console.log('Imagem apagada com sucesso!');
          setFotos((prevFotos) => prevFotos.filter((foto) => foto.id !== id));
        } catch (error) {
          console.error('Erro ao apagar imagem:', error);
        }
      };

      const handleFileUpload = async () => {
        if (novasImagens.length === 0) return;

        try {
          const formData = new FormData(); 
          formData.append("foto", novasImagens[0]); // ✅ Adiciona a primeira imagem ao FormData
          formData.append("id_jogos", String(jogo.id)); // ✅ Adiciona o ID do jogo ao FormData

          await api.post("/fotosJogos", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                },
            });

          alert("Imagem enviada com sucesso!");
          setNovasImagens([]);
          fetchFotos(); // Atualiza a lista de fotos após o upload
        } catch (error) {
          console.error("Erro ao enviar imagem:", error);
          alert("Erro ao enviar imagem");
        }
      };    

    return(
        <LayoutBaseDePaginas
            titulo="Editar Jogo"
            barraDeFerramentas={<FerramentasDeDetalhe
                mostrarBotaoNovo={false}
                mostarBotaoSalvar               
                mostrarBotaoApagar={false}
                mostarBotaoVoltar
                aoClicarEmVoltar={() => navigate("/lista-jogos")}
                aoClicarEmSalvar={handleSubmit}
                />}
            >
    <Container maxWidth="sm" sx={{ mt: 2 }}>
        <form>
            <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
                Editar Jogo
            </Typography>

            <FormControl fullWidth margin="normal">
                <InputLabel>Marca</InputLabel>
                <Select
                    value={marca ?? ""}
                    onChange={(e) => setMarca(Number(e.target.value))}
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
                    value={modelo ?? ""}
                    onChange={(e) => setModelo(Number(e.target.value))}
                    label="Modelo"
                >
                    {modelos.map((modelo) => (
                        <MenuItem key={modelo.id} value={modelo.id}>
                            {modelo.descricao}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Título"
                variant="outlined"
                fullWidth
                margin="normal"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
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

            <Typography variant="h6" gutterBottom>Adicionar novas imagens</Typography>
            <input
                id="upload-imagem"
                type="file"
                style={{display: 'none'}}
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
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
                    onClick={handleFileUpload}
                    disabled={novasImagens.length === 0}
                    startIcon={<Icon>cloud_upload</Icon>}
                  
                >
                    Enviar Imagem
            </Button>

            </FormControl>
  
                {fotos.length > 0 && (
                    <Container sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>Imagens do Jogo</Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {fotos.map((foto, idx) => (
                        <div key={foto.id} style={{ position: 'relative', width: 150, height: 150 }}>
                            <img
                            src={foto.url}
                            alt={`Jogo ${idx}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }}
                            onClick={() => {
                                setImagemSelecionada(foto.url);
                                setOpenModal(true);
                            }}
                            />
                            <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFoto(foto.id); // Agora passando o id correto
                            }}
                            style={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: 24,
                                height: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold',
                            }}
                            >
                            ×
                            </button>
                        </div>
                ))}


                        </div>
                    </Container>
                )}
                      


        </form>
<Dialog open={openModal} onClose={() => setOpenModal(false)} fullScreen>
  <DialogContent
    sx={{
      backgroundColor: "#000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      p: 0,
      position: "relative",
    }}
  >
    <IconButton
      onClick={() => setOpenModal(false)}
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        color: "#fff",
        zIndex: 10,
      }}
    >
      <CloseIcon />
    </IconButton>

    {imagemSelecionada && (
      <Box
        component="img"
        src={imagemSelecionada}
        alt="Imagem ampliada"
        sx={{
          maxHeight: "95vh",
          maxWidth: "95vw",
          objectFit: "contain",
          borderRadius: 2,
        }}
      />
    )}
  </DialogContent>
</Dialog>
    </Container>
        </LayoutBaseDePaginas>
    )
}
                                                               