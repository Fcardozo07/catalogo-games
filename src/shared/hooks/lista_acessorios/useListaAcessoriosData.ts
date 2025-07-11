import { useEffect, useState } from "react";
import api from "../../services/axios";
import { Acessorio, Marca, Modelo } from "../../types/lista_acessorios/types";
import { useAuthContext } from "../../contexts/AuthContext";


export const useListaAcessoriosData = () => { 
    
    const [acessorios, setAcessorios] = useState<Acessorio[]>([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [textoBusca, setTextoBusca] = useState("");

   
        const [itens, setItens] = useState<any[]>([]);  
    
        const { user } = useAuthContext();

    const itensFiltrados = textoBusca.trim()
      ? itens.filter((item) =>
          item.descricao.toLowerCase().includes(textoBusca.toLowerCase())
        )
      : itens;


    
    
    const getAcessorios = async () => {
        try {
            const response = await api.get("/acessorios", { params: { id_usuario: user?.id } });
            setAcessorios(response.data);
            setItens(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };
    useEffect(() => {
        if(user?.id)
        getAcessorios();
    }, [user]);

    useEffect(() => {
        async function getData() {
        try {
            const response = await api.get("/marcas");
            setMarcas(response.data);
            
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
        }
    
        getData();
    }, []);

        useEffect(() => {
            async function getData() {
            try {
                const response = await api.get("/modelos");
                setModelos(response.data);
                
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
            }
        
            getData();
        } , []);

        const handleDeletar = async (id: number) => {
            const confirmDelete = window.confirm("Tem certeza que deseja apagar este acessório?");
            
            if (!confirmDelete) {
                return; // Se o usuário clicar em "Cancelar", não faz nada
            }
        
            try {
                await api.delete(`/acessorios/${id}`);
                setAcessorios((prevAcessorios) => prevAcessorios.filter((acessorio) => acessorio.id !== id));
                await getAcessorios(); // Atualiza a lista de acessórios após a exclusão
            } catch (error) {
                console.error("Erro ao excluir acessório:", error);
            }
        };

        return {
            acessorios,
            marcas,
            modelos,
            itens,
            getAcessorios,
            handleDeletar,
            textoBusca,
            setTextoBusca,
            itensFiltrados
            

        };
        
}