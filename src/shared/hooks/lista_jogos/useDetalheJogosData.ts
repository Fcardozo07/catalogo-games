import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { Marca, Modelo } from "../../types/lista_jogos/types";




export const useDetalheJogosData = () => {

  
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

    return{
      nome,
      descricao,
      valor,
      marca,
      modelo,
      marcas,
      modelos,
      imagemSelecionada,
      setImagemSelecionada,
      openModal,
      setOpenModal,
      fotos,
      setFotos
  
    }
}