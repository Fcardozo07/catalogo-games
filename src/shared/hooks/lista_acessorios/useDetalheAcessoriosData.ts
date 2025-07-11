import { useEffect, useState } from "react";
import api from "../../services/axios";
import { useLocation } from "react-router-dom";

type Marca = {
    id: number;
    descricao: string;
  };
  
  type Modelo = {
    id: number;
    descricao: string;
  };

export const useDetalheAcessoriosData = () => {
    
    const [acessorios, setAcessorios] = useState([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState(""); 
    const location = useLocation();  
    

    const [fotos, setFotos] = useState<string[]>([]);
    const acessorio = location.state?.acessorios;
    
    
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

        return {
        acessorios,
        marcas,
        modelos,
        nome,
        descricao,
        valor,
        marca,
        modelo,
        fotos,
        setNome,
        setDescricao,
        setValor,
        setMarca,
        setModelo,
        setFotos        
        }
        
}