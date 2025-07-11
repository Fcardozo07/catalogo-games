import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IItem } from "../../types/lista_consoles/types";
import { useAuthContext } from "../../contexts/AuthContext";
import api from "../../services/axios";



export const useNovoConsoleData = () => {
    
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [id_marca, setMarca] = useState("");
  const [id_modelo, setModelo] = useState("");
  const [tipo, setTipo] = useState("");
  const [fotos, setFotos] = useState<string[]>([]);
  const [botaoSalvarDesabilitado, setBotaoSalvarDesabilitado] = useState(false);
  const [id_console, setConsole] = useState("");
  const [consoles, setConsoles] = useState<IItem[]>([]);



  // Dados vindos da API
  const [marcas, setMarcas] = useState<IItem[]>([]);
  const [modelos, setModelos] = useState<IItem[]>([]);
  const [imagem, setImagem] = useState<File | null>(null);
  const [idConsoleCriado, setIdConsoleCriado] = useState<string | null>(null);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const { user } = useAuthContext();


  const criarConsole = async () => {
    const newConsole = {
      descricao,
      valor,
      id_marca,
      id_modelo,
      tipo,
      id_usuario: user?.id
    };
  
    try {
      const response = await api.post("/consoles", newConsole);
      const id = response.data?.id; // assumindo que o id está em response.data.id
      setIdConsoleCriado(id);
      alert("Console criado com sucesso!");
      setBotaoSalvarDesabilitado(true);
      console.log("item criado para o id_usuario: ", user?.id )
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
    
    return {
  descricao,
  setDescricao,
  valor,
  setValor,
  id_marca,
  setMarca,
  id_modelo,
  setModelo,  
  id_console,
  setConsole,
  tipo,
  setTipo,
  botaoSalvarDesabilitado,
  setBotaoSalvarDesabilitado,
  marcas,
  modelos,    
  consoles,
  setConsoles,
  fotos,
  imagem,
  setImagem,
  handleUploadImagem,
  handleSalvarEVoltar,
  idConsoleCriado,
  setIdConsoleCriado,
  criarConsole,
  carregarImagens,
  imagemSelecionada,
  setImagemSelecionada,
  openModal,
  setOpenModal
};

}