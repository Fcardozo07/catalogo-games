import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Jogo, Marca, Modelo } from "../../types/lista_jogos/types";
import api from "../../services/axios";




export const useListaJogosData = ()=> {



const [itens, setItens] = useState<any[]>([]);
const [textoBusca, setTextoBusca] = useState("");


const { user } = useAuthContext();

const itensFiltrados = textoBusca.trim()
  ? itens.filter((item) =>
      item.titulo.toLowerCase().includes(textoBusca.toLowerCase())
    )
  : itens;

    const [jogos, setJogos] = useState<Jogo[]>([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);




      const getJogos = async () => {
            try {
                const response = await api.get("/jogos", { params: { id_usuario: user?.id } });
                setJogos(response.data);
                setItens(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);  
            }
            };

            useEffect(() => {
            if(user?.id){
            getJogos();
            }
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

        const handledeletar = async (id: number) => {
            const confirmDelete = window.confirm("Tem certeza que deseja apagar este jogo?");
            
            if (!confirmDelete) {
                return; // Se o usuário clicar em "Cancelar", não faz nada  

        };

        try {
            await api.delete(`/jogos/${id}`);
            setJogos((prevJogos) => prevJogos.filter((jogo) => jogo.id !== id));
            await getJogos(); 
        } catch (error) {
            console.error("Erro ao excluir jogo:", error);
        }
    }



  return {
    itens,
    itensFiltrados,
    textoBusca,
    setTextoBusca,
    jogos,
    marcas,
    modelos,
    setItens,
    setJogos,
    setMarcas,
    setModelos,
    handledeletar
  };
};

export default useListaJogosData;