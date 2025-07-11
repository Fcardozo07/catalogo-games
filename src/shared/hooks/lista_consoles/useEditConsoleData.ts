import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Foto, Marca, Modelo } from "../../types/lista_consoles/types";
import api from "../../services/axios";


export const useEditConsoleData = () => {

    const location = useLocation();
     const { user } = useAuthContext();
    
    const [consoles, setConsoles] = useState([]);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState<number | "">(0);
    const [marca, setMarca] = useState<number | "">("");
    const [modelo, setModelo] = useState<number | "">("");
    const [tipo, setTipo] = useState("");
    const navigate = useNavigate();
    const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [fotos, setFotos] = useState<Foto[]>([]);
    const consoleData = location.state?.console; 


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
          setTipo(consoleData.tipo); 
          setDescricao(consoleData.descricao);
          setValor(consoleData.valor);         
          setMarca(consoleData.id_marca);
          setModelo(consoleData.id_modelo);
        }
    }, [consoleData]);
    
    const handleSubmit = async () => {
        if (marca === null || modelo === null) {
          alert("Marca e Modelo precisam ser preenchidos corretamente.");
          return;
        }
        
        const updatedConsole = {
          tipo: tipo,
          descricao: descricao,
          valor: valor,
          id_marca: marca,
          id_modelo: modelo,
          id_usuario: user?.id
        };
        
        try {
          await api.put(`/consoles/${consoleData.id}`, updatedConsole);
      
          if (novasImagens.length > 0) {
            const promises = novasImagens.map((file) => {
              const formData = new FormData();
              formData.append("foto", file);
              formData.append("id_console", String(consoleData.id));
          
              return api.post("/fotosConsole", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
            });
          
            await Promise.all(promises); // Espera todos uploads terminarem
          }
          
      
          alert("Console atualizado com sucesso!");
          navigate("/lista-consoles");
        } catch (error) {
          console.error("Erro ao atualizar console:", error);
          alert("Erro ao atualizar console! Verifique os dados.");
        }
      };
 
        const [novasImagens, setNovasImagens] = useState<File[]>([]);

            const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;
            if (files) {
                setNovasImagens(Array.from(files)); // Salva os arquivos selecionados
            }
            };

           
            const handleDeleteFoto = async (idImagem: string) => {
                try {
                  await api.delete(`/fotosConsole/${idImagem}`);
                  console.log('Imagem apagada com sucesso!');
                  fetchFotos(); // Recarrega as fotos após a exclusão
                } catch (error) {
                  console.error('Erro ao apagar imagem:', error);
                }
              };
              
            
              
            const fetchFotos = async () => {
                    if (consoleData?.id) {
                      try {
                        console.log("Buscando fotos para o console com ID:", consoleData.id); // Verificar se está tentando buscar as fotos
                
                        const response = await api.get(`/fotosConsole/console/${consoleData.id}`);
                        console.log("Resposta da API:", response.data); // Verifique o que a API está retornando
                
                        const baseUrl = 'http://localhost:3003/uploads/';
                        const imagens = response.data.map((foto: any) => ({
                          id: foto.id, 
                          url: `${baseUrl}${foto.filename}`
                        }));
                        setFotos(imagens);
                        
                        console.log("Imagens geradas:", imagens); // Verifique se as URLs das imagens estão corretas
                
                        setFotos(imagens);
                      } catch (error) {
                        console.log("Erro ao buscar imagens:", error); // Aqui é onde podemos capturar qualquer erro da requisição
                      }
                    } else {
                      console.log("Não há um console com ID válido para buscar as fotos."); // Verifique se o `consoleData.id` está presente
                    }
                  };
                
                  useEffect(() => {
                    fetchFotos();
                  }, [consoleData]);
    
            const handleFileUpload = async () => {
                if (novasImagens.length === 0) return;
              
                try {
                  const formData = new FormData(); 
                  formData.append("foto", novasImagens[0]); // ✅ Apenas 1 imagem por vez
                  formData.append("id_console", String(consoleData.id)); // Passa o ID do console
                  
                    await api.post("/fotosConsole", formData, {
                        headers: {
                        "Content-Type": "multipart/form-data",
                        },
                    });
                    alert("Imagem enviada com sucesso!");
                    setNovasImagens([]); // Limpa o estado após o upload
                    fetchFotos(); // Recarrega as fotos após o upload

                } catch (error) {
                  console.error("Erro ao enviar imagem:", error);
                  alert("Erro ao enviar imagem");
                }
              };


              return{
                consoles,
                marcas,
                modelos,
                nome,
                setNome,
                descricao,
                valor,
                marca,
                modelo,
                tipo,
                setTipo,
                setDescricao,
                setValor,
                setMarca,
                setModelo,
                handleSubmit,
                novasImagens,
                setNovasImagens,
                handleFileChange,
                handleFileUpload,
                handleDeleteFoto,
                imagemSelecionada,
                setImagemSelecionada,
                openModal,
                setOpenModal,
                fotos,
                setFotos
              
              }

}