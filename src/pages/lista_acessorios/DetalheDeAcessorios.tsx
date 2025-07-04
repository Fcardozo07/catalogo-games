import { useLocation, useNavigate } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePaginas } from "../../shared/layouts"
import { useEffect, useState } from "react";
import api from "../../shared/services/axios";
import { Container, Dialog, DialogContent, TextField, Typography } from "@mui/material";

type Marca = {
    id: number;
    descricao: string;
  };
  
  type Modelo = {
    id: number;
    descricao: string;
  };
  
  

export const DetalheDeAcessorios = () => {

    const navigate = useNavigate(); // aqui é onde o tema é aplicado, ele vai aplicar o tema que está no provider, que é o AppThemeProvider.
    const location = useLocation();
    const acessorio = location.state?.acessorios;
    
    const [acessorios, setAcessorios] = useState([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");   
    const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [fotos, setFotos] = useState<string[]>([]);

    

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
          const marcaEncontrada = marcas.find(m => m.id === acessorio.id_marca);
          const modeloEncontrado = modelos.find(c => c.id === acessorio.id_modelo);
          setMarca(marcaEncontrada?.descricao || "---");
          setModelo(modeloEncontrado?.descricao || "---");
        }
      }, [acessorio, marcas, modelos]);

   
     useEffect(() => {
        const fetchFotos = async () => {
            if (acessorio?.id) {
                try {
                    console.log("Buscando fotos para o console com ID:", acessorio.id); // Verificar se está tentando buscar as fotos
    
                    const response = await api.get(`/fotosAcessorios/acessorio/${acessorio.id}`);
                    console.log("Resposta da API:", response.data); // Verifique o que a API está retornando

                    const baseUrl = 'http://localhost:3003/uploads/';
                    const imagens = response.data.map((foto: any) => `${baseUrl}${foto.filename}`);
                    console.log("Imagens geradas:", imagens); // Verifique se as URLs das imagens estão corretas

                    setFotos(imagens);
                    } catch (error) {
                        console.error("Erro ao buscar imagens:", error); // Aqui é onde podemos capturar qualquer erro da requisição
                    }
                } else {
                    console.log("Não há um console com  ID válido para buscar as fotos."); // Verifique se o `consoleData.id` está presente
                }
            };
            fetchFotos();
        }, [acessorio]);






    return(
        <LayoutBaseDePaginas
            titulo="Detalhe do Acessório"
            barraDeFerramentas={<FerramentasDeDetalhe
            mostrarBotaoNovo={false}
            mostarBotaoSalvar={false}
            mostarBotaoSalvarVoltar={false}
            mostrarBotaoApagar={false}
            mostarBotaoVoltar={true}
            aoClicarEmVoltar={() => navigate("/lista-acessorios")}
            
                
            />}
        >
     <Container maxWidth="sm" sx={{ mt: 2 }}>
      <form>
        <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
          Descrição do Acessório
        </Typography>
        <TextField
          label="Tipo"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled
        />
        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          margin="normal"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          disabled
        /> 
        <TextField
          label="Valor"
          variant="outlined"
          fullWidth
          margin="normal"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          disabled
        />
        <TextField
          label="Marca"
          variant="outlined"
          fullWidth
          margin="normal"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          disabled
        />
        <TextField
          label="Modelo"
          variant="outlined"
          fullWidth
          margin="normal"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          disabled
        />
                   {fotos.length > 0 && (
                    <Container sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>Imagens do Acessório</Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {fotos.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`Console ${idx}`}
                                style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }}
                                onClick={() => {
                                setImagemSelecionada(url);
                                setOpenModal(true);
                                }}
                            />
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