import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/axios";
import { Marca } from "../../types/lista_consoles/types";
import { Modelo } from "../../types/lista_consoles/types";


export const useDetalheConsolesData = () => {
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

    return{
        fotos,
        consoles,
        marcas,
        modelos,
        nome,
        descricao,
        valor,
        marca,
        modelo,
        setNome,
        setDescricao,
        setValor,
        setMarca,
        setModelo,
        setFotos
    
    }
}