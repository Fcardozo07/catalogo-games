import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Foto, Marca, Modelo } from "../../types/lista_jogos/types";
import api from "../../services/axios";

export const  useEditarJogoData = () => {

     const { user } = useAuthContext();

    const location = useLocation();
    const jogo = location.state?.jogo;
    const navigate = useNavigate();

    const [jogos, setJogos] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [marca, setMarca] = useState<number | "">("");
    const [modelo, setModelo] = useState<number | "">("");
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [fotos, setFotos] = useState<Foto[]>([]);
    const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            const jogoResp = await api.get("/jogos");
            const marcasResp = await api.get("/marcas");
            const modelosResp = await api.get("/modelos");
            
            
            setJogos(jogoResp.data);
            setMarcas(marcasResp.data);
            setModelos(modelosResp.data);
            }
        fetchData();
    }, []);

    useEffect(() => {
        if (jogo) {
            setTitulo(jogo.titulo); 
            setDescricao(jogo.descricao);
            setValor(jogo.valor);         
            setMarca(jogo.id_marca);
            setModelo(jogo.id_modelo);
        }
    }
    , [jogo]);

    const handleSubmit = async () => {
        if (marca === null || modelo === null) {
            alert("Marca e Modelo precisam ser preenchidos corretamente.");
            return;
        }
        const updatedJogo = {
            titulo: titulo, 
            descricao: descricao,
            valor: valor,         
            id_marca: marca,
            id_modelo: modelo,
            id_usuario: user?.id
        };
        
        try {
            await api.put(`/jogos/${jogo.id}`, updatedJogo);

            if(novasImagens.length > 0) {
                const promisses = novasImagens.map(async (imagem) => {
                    const formData = new FormData();
                    formData.append("foto", imagem);
                    formData.append("id_jogos", String(jogo.id));

                    return await api.post("/fotosJogos", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                });

                await Promise.all(promisses);
            }



            alert("Jogo atualizado com sucesso!");
            navigate("/lista-jogos");
        } catch (error) {
            console.error("Erro ao atualizar o jogo:", error);
            alert("Erro ao atualizar o jogo. Tente novamente.");
        }
    };

    
    const [novasImagens, setNovasImagens] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
        setNovasImagens(Array.from(files)); // Salva os arquivos selecionados
    }
    };

    const fetchFotos = async () => {
        if(jogo?.id) {
            try {
                console.log("buscando fotos do jogo com id:", jogo.id);

                const response = await api.get(`/fotosJogos/jogo/${jogo.id}`);
                console.log("Resposta da API:", response.data);

                const baseUrl = 'http://localhost:3003/uploads/'; // URL base para as imagens
                const imagens = response.data.map((foto: any) => ({
                    id: foto.id,
                    url: `${baseUrl}${foto.filename}`,
                }));
                setFotos(imagens);
                console.log("Imagens geradas:", imagens);
            } catch (error) {
                console.error("Erro ao buscar fotos:", error);
            }
        } else {
            console.log("Não há um jogo com ID válido para buscar as fotos.");
        }
    };

    useEffect(() => {
        if (jogo?.id) {
            fetchFotos();
        }
    }, [jogo]);

      const handleDeleteFoto = async (id: string) => {
        try {
          await api.delete(`/fotosJogos/${id}`);
          console.log('Imagem apagada com sucesso!');
          setFotos((prevFotos) => prevFotos.filter((foto) => foto.id !== id));
        } catch (error) {
          console.error('Erro ao apagar imagem:', error);
        }
      };

      const handleFileUpload = async () => {
        if (novasImagens.length === 0) return;

        try {
          const formData = new FormData(); 
          formData.append("foto", novasImagens[0]); // ✅ Adiciona a primeira imagem ao FormData
          formData.append("id_jogos", String(jogo.id)); // ✅ Adiciona o ID do jogo ao FormData

          await api.post("/fotosJogos", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                },
            });

          alert("Imagem enviada com sucesso!");
          setNovasImagens([]);
          fetchFotos(); // Atualiza a lista de fotos após o upload
        } catch (error) {
          console.error("Erro ao enviar imagem:", error);
          alert("Erro ao enviar imagem");
        }
      };    


    return{
        titulo,
        setTitulo,
        descricao,
        setDescricao,
        valor,
        setValor,
        marca,
        setMarca,
        modelo,
        setModelo,
        marcas,
        modelos,
        fotos,
        setFotos,
        imagemSelecionada,
        setImagemSelecionada,
        openModal,
        setOpenModal,
        handleSubmit,
        handleFileChange,
        handleFileUpload,
        handleDeleteFoto,
        novasImagens,
        setNovasImagens,
        fetchFotos,
        setMarcas,
        setModelos,
        setJogos,
        jogos,
        jogo




    }
}