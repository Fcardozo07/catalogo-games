import { useEffect, useRef, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormHandles } from "@unform/core";
import { useLocation, useNavigate } from "react-router-dom";

import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import api from "../../shared/services/axios";

type Marca = {
  id: number;
  descricao: string;
};

type Modelo = {
  id: number;
  descricao: string;
};

export const DetalheDeJogos = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const jogo = location.state?.jogo;

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [fotos, setFotos] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [_, marcasResp, modelosResp] = await Promise.all([
        api.get("/jogos"),
        api.get("/marcas"),
        api.get("/modelos"),
      ]);
      setMarcas(marcasResp.data);
      setModelos(modelosResp.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (jogo) {
      setNome(jogo.titulo);
      setDescricao(jogo.descricao);
      setValor(jogo.valor);
      const marcaEncontrada = marcas.find(m => m.id === jogo.id_marca);
      const modeloEncontrado = modelos.find(c => c.id === jogo.id_modelo);
      setMarca(marcaEncontrada?.descricao || "---");
      setModelo(modeloEncontrado?.descricao || "---");
    }
  }, [jogo, marcas, modelos]);

  useEffect(() => {
    const fetchFotos = async () => {
      if (!jogo?.id) return;
      try {
        const response = await api.get(`/fotosJogos/jogo/${jogo.id}`);
        const baseUrl = "http://localhost:3003/uploads/";
        setFotos(response.data.map((foto: any) => `${baseUrl}${foto.filename}`));
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    fetchFotos();
  }, [jogo]);

  return (
    <LayoutBaseDePaginas
      titulo="Detalhes do Jogo"
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoNovo={false}
          mostarBotaoSalvar={false}
          mostarBotaoSalvarVoltar={false}
          mostrarBotaoApagar={false}
          mostarBotaoVoltar
          aoClicarEmVoltar={() => navigate("/lista-jogos")}
        />
      }
    >
      <Box
        width="100%"
        maxWidth={600}
        mx="auto"
        mt={2}
        px={2}
        pb={4}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h5" align="center" fontWeight="bold">
          Descrição do Jogo
        </Typography>

        <TextField label="Nome do Jogo" value={nome} fullWidth disabled size="small" />
        <TextField label="Descrição" value={descricao} fullWidth disabled size="small" />
        <TextField label="Valor" value={valor} fullWidth disabled size="small" />
        <TextField label="Marca" value={marca} fullWidth disabled size="small" />
        <TextField label="Modelo do Console" value={modelo} fullWidth disabled size="small" />

        {fotos.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Imagens do Jogo
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {fotos.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Jogo ${idx}`}
                  style={{
                    width: 130,
                    height: 130,
                    objectFit: "cover",
                    borderRadius: 10,
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onClick={() => {
                    setImagemSelecionada(url);
                    setOpenModal(true);
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {/* Dialog em tela cheia */}
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
    </LayoutBaseDePaginas>
  );
};
