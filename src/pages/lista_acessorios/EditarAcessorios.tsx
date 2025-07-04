import { useLocation, useNavigate } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePaginas } from "../../shared/layouts"
import { useEffect, useState } from "react";
import api from "../../shared/services/axios";
import { Box, Button, Container, Dialog, DialogContent, FormControl, Icon, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

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

export const EditarAcessorios = () => {

    const navigate = useNavigate(); // aqui é onde o tema é aplicado, ele vai aplicar o tema que está no provider, que é o AppThemeProvider.
    const location = useLocation();
    const acessorio = location.state?.acessorios;
    
    const [acessorios, setAcessorios] = useState([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [marca, setMarca] = useState<number | null>(null);
    const [modelo, setModelo] = useState<number | null>(null);
    const [tipo, setTipo] = useState("");
    const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [fotos, setFotos] = useState<Foto[]>([]);
    const [novasImagens, setNovasImagens] = useState<File[]>([]);

    useEffect(() => {
        async function fetchData() {
          const acessorioResp = await api.get("/acessorios");
          const marcasResp = await api.get("/marcas");
          const modelosResp = await api.get("/modelos");
          
          setAcessorios(acessorioResp.data);
          setMarcas(marcasResp.data);
          setModelos(modelosResp.data);
        }
    
        fetchData();
      }, []);

    useEffect(() => {
      if (acessorio) {
        setNome(acessorio.tipo);
        setDescricao(acessorio.descricao);
        setValor(acessorio.valor);
        setMarca(acessorio.id_marca); // agora é ID
        setModelo(acessorio.id_modelo); // agora é ID
      }
    }, [acessorio]);

   
    const handleSubmit = async () => {
      if (marca == null || modelo == null) {
        alert("Marca e Modelo precisam ser preenchidos corretamente.");
        return;
      }
    
      const updatedAcessorio = {
        tipo: nome,
        descricao: descricao,
        valor: valor,
        id_marca: marca,
        id_modelo: modelo,
      };
    
      try {
        await api.put(`/acessorios/${acessorio.id}`, updatedAcessorio);
        navigate("/lista-acessorios");

          if(novasImagens.length > 0) {
            const promises = novasImagens.map((file) => {
              const formData = new FormData();
              formData.append("foto", file);
              formData.append("id_acessorio", String(acessorio.id));

              return api.post("/fotosAcessorios", formData, {
                headers: {
                  "ContentType": "multipart/form-data",
                },
              });
            });

            await Promise.all(promises); // Espera todos uploads terminarem
          }

      } catch (error) {
        console.error("Erro ao atualizar acessório:", error);
        alert("Erro ao atualizar acessório! Verifique os dados.");
      }
    };


      
    const fetchFotos = async () => {
          if (acessorio?.id) {
            try {
              console.log("Buscando fotos para o acessório com ID:", acessorio.id); // Verificar se está tentando buscar as fotos
              
              const response = await api.get(`/fotosAcessorios/acessorio/${acessorio.id}`);
              console.log("Resposta da API:", response.data); // Verifique o que a API está retornando

              const baseUrl = 'http://localhost:3003/uploads/';
              const imagens = response.data.map((foto: any) => ({
                  id: foto.id, 
                  url: `${baseUrl}${foto.filename}`
              }));
              setFotos(imagens);

              console.log("Imagens geradas:", imagens); // Verifique se as URLs das imagens estão corretas

              
          } catch (error) {
              console.log("Erro ao buscar imagens:", error); // Aqui é onde podemos capturar qualquer erro da requisição
          }
      }else {
        console.log("Não há um acessório com ID válido para buscar as fotos."); // Verifique se o `acessorio.id` está presente
    }
    }
    useEffect(() => {
      if (acessorio?.id) {
        fetchFotos();
      }
    }, [acessorio]);

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
          setNovasImagens(Array.from(files)); // Salva os arquivos selecionados
        }
        };


        const handleFileUpload = async () => {
          if (novasImagens.length === 0) return;
        
          try {
            const formData = new FormData(); 
            formData.append("foto", novasImagens[0]); // ✅ Apenas 1 imagem e nome correto
            formData.append("id_acessorio", String(acessorio.id));
        
            await api.post("/fotosAcessorios", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
        
            alert("Imagem enviada com sucesso!");
            setNovasImagens([]);
            fetchFotos();
        
          } catch (error) {
            console.error("Erro ao enviar imagem:", error);
            alert("Erro ao enviar imagem");
          }
        };
        


  const handleDeleteFoto = async (idImagem: string) => {
    try {
      await api.delete(`/fotosAcessorios/${idImagem}`);
      console.log('Imagem apagada com sucesso!');
      fetchFotos(); // Recarrega as fotos após a exclusão 

    } catch (error) {
      console.error('Erro ao apagar imagem:', error);
    }
  };
      

    return(
        <LayoutBaseDePaginas
            titulo="Editar Acessório"
            barraDeFerramentas={<FerramentasDeDetalhe
            mostrarBotaoNovo={false}
            mostarBotaoSalvar            
            mostrarBotaoApagar={false}
            mostarBotaoVoltar
            aoClicarEmVoltar={() => navigate("/lista-acessorios")}
            aoClicarEmSalvar={handleSubmit}


            
                
            />}
        >
     <Container maxWidth="sm" sx={{ mt: 2 }}>
      <form>
              <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
              Editar  Acessório
              </Typography>
              <TextField
                label="Tipo"
                variant="outlined"
                fullWidth
                margin="normal"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                
              />
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
              <Typography variant="h6" gutterBottom>Imagens do Acessório</Typography>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {fotos.map((foto, idx) => (
                  <div key={foto.id} style={{ position: 'relative', width:  150, height: 150 }}>
                    <img
                    src={foto.url}
                    alt={`Acessório ${idx}`}
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
                    </  button>
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
    )
}