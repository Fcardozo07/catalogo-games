import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { IItem } from "../../types/lista_acessorios/types";
import api from "../../services/axios";


export const useNovoAcessorioData = () => {
    const navigate = useNavigate();
  
    const { user } = useAuthContext();
  
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
        id_usuario: user?.id
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


      return{
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
        fotos,
        imagem,
        setImagem,
        handleUploadImagem,
        handleSalvarEVoltar,
        idAcessorioCriado,
        setIdAcessorioCriado,
        criarAcessorio,
        carregarImagens

      }
}
    
