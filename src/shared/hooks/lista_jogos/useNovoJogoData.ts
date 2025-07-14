import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { IItem } from "../../types/lista_consoles/types";
import api from "../../services/axios";
import { Foto } from "../../types/lista_consoles/types";



export const useNovoJogoData = () => {
  const navigate = useNavigate();
    
    const { user } = useAuthContext();
    
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [id_marca, setMarca] = useState("");
    const [id_modelo, setModelo] = useState("");
    const [botaoSalvarDesabilitado, setBotaoSalvarDesabilitado] = useState(false);
    
    
    // Dados vindos da API
    const [marcas, setMarcas] = useState<IItem[]>([]);
    const [modelos, setModelos] = useState<IItem[]>([]);
    const [idJogoCriado, setIdJogoCriado] = useState<string | null>(null);
    const [fotos, setFotos] = useState<Foto[]>([]);
    const [imagem, setImagem] = useState<File | null>(null);
    
    
    const criarJogo = async () => {
        const newJogo = {
        titulo,
        descricao,
        valor,
        id_marca,
        id_modelo,
        id_usuario:user?.id
        };
    
        try {
        const response = await api.post("/jogos", newJogo);
        const id = response.data?.id; // assumindo que o id está em api.data.id
        setIdJogoCriado(id);
        alert("Jogo criado com sucesso!");
        setBotaoSalvarDesabilitado(true);
        //navigate("/jogos");
        } catch (error) {
        console.log("Erro ao criar jogo:", error);
        alert("Erro ao criar jogo");
        }
    };

    const carregarImagens = async () => {
        if (!idJogoCriado) return;

        try {
            const response = await api.get(`/fotosJogos/jogo/${idJogoCriado}`);
            const baseUrl = 'http://localhost:3003/uploads/';
            const imagens = response.data.map((foto: any) => ({
            id: foto.id,
            url: `${baseUrl}${foto.filename}`,
            }));
            setFotos(imagens);
        } catch (error) {
            console.error("Erro ao carregar imagens:", error);
        }
        };


    const handleUploadImagem = async () => {
        if (!imagem || !idJogoCriado) return;

        const formData = new FormData();
        formData.append("foto", imagem);
        formData.append("id_jogos", idJogoCriado);

        try {
            await api.post("/fotosJogos", formData, {
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
            console.log("Consoles:", modelosResp.data);
    
            setMarcas(marcasResp.data);
            setModelos(modelosResp.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
        }
    
        fetchData();
    }, []);

    return{
        titulo,
        setTitulo,
        descricao,
        setDescricao,
        valor,
        setValor,
        id_marca,
        setMarca,
        id_modelo,
        setModelo,
        botaoSalvarDesabilitado,
        setBotaoSalvarDesabilitado,
        marcas,
        modelos,
        idJogoCriado,
        setIdJogoCriado,
        criarJogo,
        carregarImagens,
        fotos,
        imagem,
        setImagem,
        handleUploadImagem

    }

}