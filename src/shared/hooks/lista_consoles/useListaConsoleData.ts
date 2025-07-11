import { useEffect, useState } from "react";
import api from "../../services/axios";
import { Marca, Modelo, Console } from "../../types/lista_consoles/types";
import { useAuthContext } from "../../contexts/AuthContext";


export const useListaConsoleData = () => {

    const [itens, setItens] = useState<any[]>([]);
    const [textoBusca, setTextoBusca] = useState("");
    const [consoles, setConsoles] = useState<Console[]>([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const { user } = useAuthContext();

    const itensFiltrados = textoBusca.trim()
      ? itens.filter((item) =>
          item.descricao.toLowerCase().includes(textoBusca.toLowerCase())
        )
      : itens;

    const getConsoles = async () => {
        try {
            const response = await api.get("/consoles", { params: { id_usuario: user?.id } });
            setConsoles(response.data);
            setItens(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };
   useEffect(() => {
  if (user?.id) {
    getConsoles();
  }
}, [user]);

     // Definindo as interfaces para os dados que serão utilizados     
      

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

        const handledeletar = async (id: number) => {
            const confirmDelete = window.confirm("Tem certeza que deseja apagar este console?");
            
            if (!confirmDelete) {
                return; // Se o usuário clicar em "Cancelar", não faz nada
            }
            
            try {
                await api.delete(`/consoles/${id}`);
                setConsoles((prevConsoles) => prevConsoles.filter((console) => console.id !== id));
                await getConsoles();
            } catch (error) {
                console.error("Erro ao excluir console:", error);
            }
        };



    return{
        itens,
        itensFiltrados,
        textoBusca,
        setTextoBusca,
        consoles,
        marcas,
        modelos,
        setItens,
        setConsoles,
        setMarcas,
        setModelos,
        handledeletar
    
    }
}