
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import api from "../../services/axios";


type IMarca = {
    id: number;
    descricao: string;
  };
  
  type IModelo = {
    id: number;
    descricao: string;
  };
  
  type IFoto = {
    id: string;
    url: string;
};


export const useEditarAcessoriosData = () => {
    const location = useLocation();
    const acessorio = location.state?.acessorios;
    const navigate = useNavigate(); 

    const { user } = useAuthContext();
    
// Estados básicos
  const [acessorios, setAcessorios] = useState<any[]>([]); // Ajustar tipo se necessário
  const [marcas, setMarcas] = useState<IMarca[]>([]);
  const [modelos, setModelos] = useState<IModelo[]>([]);

  // Campos do formulário
  const [nome, setNome] = useState<string>(""); // Inicia com string vazia
  const [descricao, setDescricao] = useState<string>("");
  const [valor, setValor] = useState<number | "">(""); // Permitindo string vazia para evitar erro
  const [marca, setMarca] = useState<number | "">(""); 
  const [modelo, setModelo] = useState<number | "">("");
  const [tipo, setTipo] = useState<string>("");

  // Imagens
  const [fotos, setFotos] = useState<IFoto[]>([]);
  const [novasImagens, setNovasImagens] = useState<File[]>([]);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);


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
        setMarca(acessorio.id_marca); // agora é ID
        setModelo(acessorio.id_modelo); // agora é ID
      }
    }, [acessorio]);

   
    const handleSubmit = async () => {
      if (marca == null || modelo == null) {
        alert("Marca e Modelo precisam ser preenchidos corretamente.");
        return;
      }
    
      const updatedAcessorio = {
        tipo: nome,
        descricao: descricao,
        valor: valor,
        id_marca: marca,
        id_modelo: modelo,
        id_usuario: user?.id
      };
    
      try {
        await api.put(`/acessorios/${acessorio.id}`, updatedAcessorio);
        navigate("/lista-acessorios");

          if(novasImagens.length > 0) {
            const promises = novasImagens.map((file) => {
              const formData = new FormData();
              formData.append("foto", file);
              formData.append("id_acessorio", String(acessorio.id));

              return api.post("/fotosAcessorios", formData, {
                headers: {
                  "ContentType": "multipart/form-data",
                },
              });
            });

            await Promise.all(promises); // Espera todos uploads terminarem
          }

      } catch (error) {
        console.error("Erro ao atualizar acessório:", error);
        alert("Erro ao atualizar acessório! Verifique os dados.");
      }
    };


      
    const fetchFotos = async () => {
          if (acessorio?.id) {
            try {
              console.log("Buscando fotos para o acessório com ID:", acessorio.id); // Verificar se está tentando buscar as fotos
              
              const response = await api.get(`/fotosAcessorios/acessorio/${acessorio.id}`);
              console.log("Resposta da API:", response.data); // Verifique o que a API está retornando

              const baseUrl = 'http://localhost:3003/uploads/';
              const imagens = response.data.map((foto: any) => ({
                  id: foto.id, 
                  url: `${baseUrl}${foto.filename}`
              }));
              setFotos(imagens);

              console.log("Imagens geradas:", imagens); // Verifique se as URLs das imagens estão corretas

              
          } catch (error) {
              console.log("Erro ao buscar imagens:", error); // Aqui é onde podemos capturar qualquer erro da requisição
          }
      }else {
        console.log("Não há um acessório com ID válido para buscar as fotos."); // Verifique se o `acessorio.id` está presente
    }
    }
    useEffect(() => {
      if (acessorio?.id) {
        fetchFotos();
      }
    }, [acessorio]);

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
          setNovasImagens(Array.from(files)); // Salva os arquivos selecionados
        }
        };


        const handleFileUpload = async () => {
          if (novasImagens.length === 0) return;
        
          try {
            const formData = new FormData(); 
            formData.append("foto", novasImagens[0]); // ✅ Apenas 1 imagem e nome correto
            formData.append("id_acessorio", String(acessorio.id));
        
            await api.post("/fotosAcessorios", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
        
            alert("Imagem enviada com sucesso!");
            setNovasImagens([]);
            fetchFotos();
        
          } catch (error) {
            console.error("Erro ao enviar imagem:", error);
            alert("Erro ao enviar imagem");
          }
        };
        


  const handleDeleteFoto = async (idImagem: string) => {
    try {
      await api.delete(`/fotosAcessorios/${idImagem}`);
      console.log('Imagem apagada com sucesso!');
      fetchFotos(); // Recarrega as fotos após a exclusão 

    } catch (error) {
      console.error('Erro ao apagar imagem:', error);
    }
  };

  return {
    acessorios,
    marcas,
    modelos,
    nome,
    descricao,
    valor,
    marca,
    modelo,
    tipo,
    imagemSelecionada,
    openModal,
    fotos,
    novasImagens,
    setNome,
    setDescricao,
    setValor,
    setMarca,
    setModelo,
    setTipo,
    setImagemSelecionada,
    setOpenModal,
    setFotos,
    setNovasImagens,
    handleSubmit,
    handleFileChange,
    handleFileUpload,
    handleDeleteFoto
  }
      
}