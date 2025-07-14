import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";


export const useDashboardData = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();  
  const [jogos, setJogos] = useState([]);
  const [consoles, setConsoles] = useState([]);
  const [acessorios, setAcessorios] = useState([]);
   const [totalJogos, setTotalJogos] = useState(0);
  const [totalConsoles, setTotalConsoles] = useState(0);
  const [totalAcessorios, setTotalAcessorios] = useState(0);
  const [valorJogos, setValorJogos] = useState(0);
  const [valorConsoles, setValorConsoles] = useState(0);
  const [valorAcessorios, setValorAcessorios] = useState(0);
  const valorTotalGeral = valorJogos + valorConsoles + valorAcessorios;
  const [jogoMaisCaro, setJogoMaisCaro] = useState<any>(null);
  const [consoleMaisCaro, setConsoleMaisCaro] = useState<any>(null);
  const [acessorioMaisCaro, setAcessorioMaisCaro] = useState<any>(null);
  const [fotosJogoMaisCaro, setFotoJogoMaisCaro] = useState<{ [id: number]: string }>({});
  const [fotosConsoleMaisCaro, setFotoConsoleMaisCaro] = useState<{ [id: number]: string }>({});
  const [fotosAcessorioMaisCaro, setFotoAcessorioMaisCaro] = useState<{ [id: number]: string }>({});
  const [modelos, setModelos] = useState<{ id: number; descricao: string }[]>([]);
  const [descricaoModelo, setDescricaoModelo] = useState(null);

useEffect(() => {
  const buscarDadosDashboard = async () => {
    try {
      const [resJogos, resConsoles, resAcessorios] = await Promise.all([
        api.get("/jogos", { params: { id_usuario: user?.id } }),
        api.get("/consoles", { params: { id_usuario: user?.id } }),
        api.get("/acessorios", { params: { id_usuario: user?.id } }),
      ]);

      // Helpers
      const calcularTotal = (items: any[]) =>
        items.reduce((acc, item) => acc + (item.valor || 0), 0);
      const encontrarMaisCaro = (items: any[]) =>
        items.reduce((prev, curr) =>
          curr.valor > (prev?.valor || 0) ? curr : prev,
          null
        );

      // Jogos
      setJogos(resJogos.data);
      setTotalJogos(resJogos.data.length);
      setValorJogos(calcularTotal(resJogos.data));
      setJogoMaisCaro(encontrarMaisCaro(resJogos.data));

      // Consoles
      setConsoles(resConsoles.data);
      setTotalConsoles(resConsoles.data.length);
      setValorConsoles(calcularTotal(resConsoles.data));
      setConsoleMaisCaro(encontrarMaisCaro(resConsoles.data));

      // Acessórios
      setAcessorios(resAcessorios.data);
      setTotalAcessorios(resAcessorios.data.length);
      setValorAcessorios(calcularTotal(resAcessorios.data));
      setAcessorioMaisCaro(encontrarMaisCaro(resAcessorios.data));
      console.log("Fabricante do jogo mais caro:", jogoMaisCaro?.id_fabricante);
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
    }
  };

  buscarDadosDashboard();
}, [user]);

useEffect(() => {
    const fetchFotoParaJogoMaisCaro = async () => {
      if (!jogoMaisCaro) return;
  
      try {
        const response = await api.get(`/fotosJogos/jogo/${jogoMaisCaro.id}`,{params:{id_usuario: user?.id}});
        const baseUrl = 'http://localhost:3003/uploads/';
        if (response.data.length > 0) {
          setFotoJogoMaisCaro({
            [jogoMaisCaro.id]: `${baseUrl}${response.data[0].filename}`
          });
        }
      } catch (error) {
        console.error(`Erro ao buscar imagem do jogo ${jogoMaisCaro.id}:`, error);
      }
    };
  
    fetchFotoParaJogoMaisCaro();
  }, [jogoMaisCaro]);
  

  useEffect(() => {
    const fetchFotoParaConsoleMaisCaro = async () => {
      if (!consoleMaisCaro) return;
  
      try {
        const response = await api.get(`/fotosConsole/console/${consoleMaisCaro.id}`,{params:{id_usuario: user?.id}});
        const baseUrl = 'http://localhost:3003/uploads/';
        if (response.data.length > 0) {
          setFotoConsoleMaisCaro({
            [consoleMaisCaro.id]: `${baseUrl}${response.data[0].filename}`
          });
        }
      } catch (error) {
        console.error(`Erro ao buscar imagem do console ${consoleMaisCaro.id}:`, error);
      }
    };
  
    fetchFotoParaConsoleMaisCaro();
  }, [consoleMaisCaro]);

  useEffect(() => {
    const fetchFotoParaAcessorioMaisCaro = async () => {
      if (!acessorioMaisCaro) return;
  
      try {
        const response = await api.get(`/fotosAcessorios/acessorio/${acessorioMaisCaro.id}`,{params:{id_usuario: user?.id}});
        const baseUrl = 'http://localhost:3003/uploads/';
        if (response.data.length > 0) {
          setFotoAcessorioMaisCaro({
            [acessorioMaisCaro.id]: `${baseUrl}${response.data[0].filename}`
          });
        }
      } catch (error) {
        console.error(`Erro ao buscar imagem do acessório ${acessorioMaisCaro.id}:`, error);
      }
    };
  
    fetchFotoParaAcessorioMaisCaro();
  }, [acessorioMaisCaro]);

      useEffect(() => {
        const getModeloDescricao = async () => {
          if (!consoleMaisCaro?.id_modelo) return;

          try {
            const response = await api.get(`/modelos/${consoleMaisCaro.id_modelo}`,{params:{id_usuario: user?.id}});
            setDescricaoModelo(response.data.descricao);
            setModelos([response.data]); // Mantendo modelos como array
          } catch (error) {
            console.error("Erro ao buscar dados do modelo:", error);
          }
        };

        getModeloDescricao();
      }, [consoleMaisCaro]);
    
      return {
        jogos,
        consoles,
        acessorios,
        totalJogos,
        totalConsoles,
        totalAcessorios,
        valorJogos,
        valorConsoles,
        valorAcessorios,
        valorTotalGeral,
        jogoMaisCaro,
        consoleMaisCaro,
        acessorioMaisCaro,
        fotosJogoMaisCaro,
        fotosConsoleMaisCaro,
        fotosAcessorioMaisCaro,
        modelos,
        descricaoModelo,
        navigate,
        user,
        setDescricaoModelo,
        setModelos
      };
    };
