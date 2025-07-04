import { useLocation, useNavigate } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePaginas } from "../../shared/layouts"
import { use, useEffect, useState } from "react";
import api from "../../shared/services/axios";
import { Container, TextField, Typography, Dialog, DialogContent } from "@mui/material";

type Marca = {
    id: number;
    descricao: string;
  };
  
  type Modelo = {
    id: number;
    descricao: string;
  };
  

  export const DetalheDeConsoles = () => {
    const navigate = useNavigate();
    const [fotos, setFotos] = useState<string[]>([]);
    const location = useLocation();
    const consoleData = location.state?.console;  // Renomeado para evitar conflito

    const [consoles, setConsoles] = useState([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);

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
          setNome(consoleData.tipo);
          setDescricao(consoleData.descricao);
          setValor(consoleData.valor);
          const marcaEncontrada = marcas.find(m => m.id === consoleData.id_marca);
          const modeloEncontrado = modelos.find(c => c.id === consoleData.id_modelo);
          setMarca(marcaEncontrada?.descricao || "---");
          setModelo(modeloEncontrado?.descricao || "---");
        }
    }, [consoleData, marcas, modelos]);

    useEffect(() => {
        const fetchFotos = async () => {
            if (consoleData?.id) {
                try {
                    console.log("Buscando fotos para o console com ID:", consoleData.id); // Verificar se está tentando buscar as fotos
    
                    const response = await api.get(`/fotosConsole/console/${consoleData.id}`);
                    console.log("Resposta da API:", response.data); // Verifique o que a API está retornando
    
                    const baseUrl = 'http://localhost:3003/uploads/';
                    const imagens = response.data.map((foto: any) => `${baseUrl}${foto.filename}`);
                    console.log("Imagens geradas:", imagens); // Verifique se as URLs das imagens estão corretas
    
                    setFotos(imagens);
                } catch (error) {
                    console.error("Erro ao buscar imagens:", error); // Aqui é onde podemos capturar qualquer erro da requisição
                }
            } else {
                console.log("Não há um console com ID válido para buscar as fotos."); // Verifique se o `consoleData.id` está presente
            }
        };
    
        fetchFotos();
    }, [consoleData]);
    

    return (
        <LayoutBaseDePaginas
            titulo="Detalhe do Console"
            barraDeFerramentas={<FerramentasDeDetalhe
                mostrarBotaoNovo={false}
                mostarBotaoSalvar={false}
                mostarBotaoSalvarVoltar={false}
                mostrarBotaoApagar={false}
                mostarBotaoVoltar={true}
                aoClicarEmVoltar={() => navigate("/lista-consoles")}
            />}
        >
        <Container maxWidth="sm" sx={{ mt: 2 }}>
            <form>
                <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
                    Descrição do Console
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
                        <Typography variant="h6" gutterBottom>Imagens do Console</Typography>
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
