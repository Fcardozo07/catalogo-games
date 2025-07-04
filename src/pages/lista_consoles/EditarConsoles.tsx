import { use, useEffect, useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { Box, Button, Container, Dialog, DialogContent, FormControl, Icon, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FerramentasDeDetalhe } from "../../shared/components";

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
  
export const EditarConsoles = () => {
    const location = useLocation();
    
    
    const [consoles, setConsoles] = useState([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [marca, setMarca] = useState<number | null>(null);
    const [modelo, setModelo] = useState<number | null>(null);
    const [tipo, setTipo] = useState("");
    const navigate = useNavigate();
    const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [fotos, setFotos] = useState<Foto[]>([]);
    const consoleData = location.state?.console; 


    useEffect(() => {
        async function fetchData() {
          const consoleResp = await api.get("/consoles");
          const marcasResp = await api.get("/marcas");
          const modelosResp = await api.get("/modelos");
          
        
          setConsoles(consoleResp.data);
          setMarcas(marcasResp.data);
          setModelos(modelosResp.data);
        }
    
        fetchData();
      }, []);
      
      useEffect(() => {
        if (consoleData) {
          setTipo(consoleData.tipo); 
          setDescricao(consoleData.descricao);
          setValor(consoleData.valor);         
          setMarca(consoleData.id_marca);
          setModelo(consoleData.id_modelo);
        }
    }, [consoleData]);
    
    const handleSubmit = async () => {
        if (marca === null || modelo === null) {
          alert("Marca e Modelo precisam ser preenchidos corretamente.");
          return;
        }
        
        const updatedConsole = {
          tipo: tipo,
          descricao: descricao,
          valor: valor,
          id_marca: marca,
          id_modelo: modelo,
        };
        
        try {
          await api.put(`/consoles/${consoleData.id}`, updatedConsole);
      
          if (novasImagens.length > 0) {
            const promises = novasImagens.map((file) => {
              const formData = new FormData();
              formData.append("foto", file);
              formData.append("id_console", String(consoleData.id));
          
              return api.post("/fotosConsole", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
            });
          
            await Promise.all(promises); // Espera todos uploads terminarem
          }
          
      
          alert("Console atualizado com sucesso!");
          navigate("/lista-consoles");
        } catch (error) {
          console.error("Erro ao atualizar console:", error);
          alert("Erro ao atualizar console! Verifique os dados.");
        }
      };
 
        const [novasImagens, setNovasImagens] = useState<File[]>([]);

            const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;
            if (files) {
                setNovasImagens(Array.from(files)); // Salva os arquivos selecionados
            }
            };

           
            const handleDeleteFoto = async (idImagem: string) => {
                try {
                  await api.delete(`/fotosConsole/${idImagem}`);
                  console.log('Imagem apagada com sucesso!');
                  fetchFotos(); // Recarrega as fotos após a exclusão
                } catch (error) {
                  console.error('Erro ao apagar imagem:', error);
                }
              };
              
            
              
            const fetchFotos = async () => {
                    if (consoleData?.id) {
                      try {
                        console.log("Buscando fotos para o console com ID:", consoleData.id); // Verificar se está tentando buscar as fotos
                
                        const response = await api.get(`/fotosConsole/console/${consoleData.id}`);
                        console.log("Resposta da API:", response.data); // Verifique o que a API está retornando
                
                        const baseUrl = 'http://localhost:3003/uploads/';
                        const imagens = response.data.map((foto: any) => ({
                          id: foto.id, 
                          url: `${baseUrl}${foto.filename}`
                        }));
                        setFotos(imagens);
                        
                        console.log("Imagens geradas:", imagens); // Verifique se as URLs das imagens estão corretas
                
                        setFotos(imagens);
                      } catch (error) {
                        console.log("Erro ao buscar imagens:", error); // Aqui é onde podemos capturar qualquer erro da requisição
                      }
                    } else {
                      console.log("Não há um console com ID válido para buscar as fotos."); // Verifique se o `consoleData.id` está presente
                    }
                  };
                
                  useEffect(() => {
                    fetchFotos();
                  }, [consoleData]);
    
            const handleFileUpload = async () => {
                if (novasImagens.length === 0) return;
              
                try {
                  const formData = new FormData(); 
                  formData.append("foto", novasImagens[0]); // ✅ Apenas 1 imagem por vez
                  formData.append("id_console", String(consoleData.id)); // Passa o ID do console
                  
                    await api.post("/fotosConsole", formData, {
                        headers: {
                        "Content-Type": "multipart/form-data",
                        },
                    });
                    alert("Imagem enviada com sucesso!");
                    setNovasImagens([]); // Limpa o estado após o upload
                    fetchFotos(); // Recarrega as fotos após o upload

                } catch (error) {
                  console.error("Erro ao enviar imagem:", error);
                  alert("Erro ao enviar imagem");
                }
              };


        return(
            <LayoutBaseDePaginas
                titulo="Editar Console"
                barraDeFerramentas={<FerramentasDeDetalhe
                mostrarBotaoNovo={false}
                mostarBotaoSalvar               
                mostrarBotaoApagar={false}
                mostarBotaoVoltar
                aoClicarEmVoltar={() => navigate("/lista-consoles")}
                aoClicarEmSalvar={handleSubmit}
                />}
            >
    
                <Container maxWidth="sm" sx={{ mt: 2 }}>
                    <form>
                        <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
                            Editar Console
                        </Typography>
                        <FormControl fullWidth margin="normal">
                        <InputLabel>Tipo</InputLabel>
                        <Select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            label="Tipo"
                        >
                            <MenuItem value="Console">Console de mesa</MenuItem>
                            <MenuItem value="Portátil">Console portátil</MenuItem>
                            <MenuItem value="Handheld">Híbrido</MenuItem>
                        </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                        <InputLabel>Marca</InputLabel>
                        <Select
                            value={marca ?? ""} // evita dar erro se estiver null
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
                            value={modelo ?? ""} // evita dar erro se estiver null
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
                        <Typography variant="h6" gutterBottom>Imagens do Console</Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {fotos.map((foto, idx) => (
                        <div key={foto.id} style={{ position: 'relative', width: 150, height: 150 }}>
                            <img
                            src={foto.url}
                            alt={`Console ${idx}`}
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
            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
                        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {imagemSelecionada && (
                            <img
                                src={imagemSelecionada}
                                alt="Imagem ampliada"
                                style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 8 }}
                            />
                            )}
                        </DialogContent>
                        </Dialog>
                </Container>
            </LayoutBaseDePaginas>
        );
      };

    



    