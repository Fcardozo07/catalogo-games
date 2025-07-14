import { useEffect, useState } from "react";
import {  FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import api from "../../shared/services/axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GraficoPizzaItens } from "../../shared/components/Grafics/GraficoPizzaItens";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { CardResumo } from "../../shared/components/dashboard/CardResumo";

const fabricantes: { [key: string]: { nome: string; icone: string } } = {
  nintendo: {
    nome: "Nintendo",
    icone: "/assets/images/icones/nintendo.png",
  },
  sega: {
    nome: "SEGA",
    icone: "/assets/images/icones/sega.png",
  },
  playstation: {
    nome: "PlayStation",
    icone: "/assets/images/icones/playstation.png",
  },
  atari: {
    nome: "Atari",
    icone: "/assets/images/icones/atari.png",
  },
};


const renderizarFabricante = (fabricante: string | undefined) => {
  if (!fabricante) return null;

  const info = fabricantes[fabricante.toLowerCase()];
  if (!info) return null;

  return (
    <Box display="flex" justifyContent="center" sx={{ mt: 0.5, mb: 0.5 }}>
      <img
        src={info.icone}
        alt={info.nome}
        height={70} // levemente menor
        style={{
          maxWidth: 80,
          objectFit: "contain",
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.4))",
          marginTop: 0,
          marginBottom: 0,
        }}
      />
    </Box>
  );
};

const fabricantePorId: { [key: number]: string } = {
  1: "nintendo",
  2: "sega",
  5: "microsoft",     // você pode ignorar se não tiver ícone
  6: "playstation",   // sua marca aparece como "Sony", mas a gente quer exibir o logo PlayStation
  8: "atari",
  9: "gradiente",     // idem, pode ignorar ou colocar ícone
  10: "cce",
  12: "dynacom",
};

export const Dashboard = () => {
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
  const { user } = useAuthContext();
  const navigate = useNavigate();
 
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


  return (
    <LayoutBaseDePaginas
      titulo="Página Inicial"
      barraDeFerramentas={<FerramentasDeDetalhe
        mostrarBotaoNovo={false}
        mostrarBotaoApagar={false}
        mostarBotaoSalvar={false}
        mostarBotaoSalvarVoltar={false}
        mostarBotaoVoltar={false}        
      />}
    >
    
        <Typography variant="h4"  sx={{ marginBottom: 2, marginLeft: 2 }}>
          Visão geral dos itens
        </Typography>
      
      <Box width="100%" display="flex">
  
        <CardResumo
        totalJogos={totalJogos}
        valorJogos={valorJogos}
        totalConsoles={totalConsoles}
        valorConsoles={valorConsoles}
        totalAcessorios={totalAcessorios}
        valorAcessorios={valorAcessorios}
        valorTotalGeral={valorTotalGeral}
      />

  
        </Box>
      <Typography variant="h4"  sx={{ marginBottom: 2, marginLeft: 2 }}>
          Itens mais valorizados
        </Typography>
        <Box width="100%" display="flex">
  
  <Grid container spacing={2} margin={2}>

        <Grid >
           <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 300,
              height: 430, // <-- altura padrão para todos
              borderRadius: 5,
              justifyContent: "space-between", // distribui o conteúdo
            }}
          >
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 0.5,
            }}
          >
                <Typography variant="h5" align="center">
                    Jogo mais caro           
                    </Typography>
                <Typography variant="h6" align="center" sx={{ marginTop: 0 }}>
               {jogoMaisCaro?.titulo || "Carregando..."}
                </Typography>
               <Box>
               {renderizarFabricante(fabricantePorId[jogoMaisCaro?.id_marca])}
               </Box> 
     
                <Typography variant="h6" align="center" sx={{ marginTop: 0, color: "text.secondary" }}>
            R$ {jogoMaisCaro?.valor?.toFixed(2).replace(".", ",") || "--"}
                </Typography>
                
                  <img
                    src={fotosJogoMaisCaro[jogoMaisCaro?.id]}
                    alt="Imagem do jogo"
                    onClick={() => navigate("/detalhe-jogos", { state: { jogo: jogoMaisCaro } })}
                    style={{
                      cursor: "pointer",
                      height: 120, // menor que 150
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />


                </CardContent>

            </Card>
    </Grid>

        <Grid >
           <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                width: 300,
                height: 430, // <-- altura padrão para todos
                borderRadius: 5,
                justifyContent: "space-between", // distribui o conteúdo
              }}
            >
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 0.5,
            }}
          >
                    <Typography variant="h5" align="center">
                    Console mais caro           
                    </Typography>

                    <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
                    {descricaoModelo || "Carregando..."}
                    </Typography>
                {renderizarFabricante(fabricantePorId[consoleMaisCaro?.id_marca])}
                    <Typography variant="h6" align="center" sx={{ marginTop: 1, color: "text.secondary" }}>
                    R$ {consoleMaisCaro?.valor?.toFixed(2).replace(".", ",") || "--"}
                    </Typography>
                      <img
                        src={fotosConsoleMaisCaro[consoleMaisCaro?.id]}
                        alt="Imagem do console"
                        onClick={() => navigate("/detalhe-consoles", { state: { console: consoleMaisCaro } })}
                        style={{
                          cursor: "pointer",
                          height: 150,
                          transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      />

                </CardContent>

            </Card>
    </Grid>

        <Grid >
           <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 300,
                  height: 430, // <-- altura padrão para todos
                  borderRadius: 5,
                  justifyContent: "space-between", // distribui o conteúdo
                }}
              >
            <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 0.5,
            }}
          >
                    <Typography variant="h5" align="center">
                    Acessório mais caro
                    </Typography>

                    <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
                    {acessorioMaisCaro?.descricao || "Carregando..."}
                    </Typography>
                     {renderizarFabricante(fabricantePorId[acessorioMaisCaro?.id_marca])}
                    <Typography variant="h6" align="center" sx={{ marginTop: 1, color: "text.secondary" }}>
                    R$ {acessorioMaisCaro?.valor?.toFixed(2).replace(".", ",") || "--"}
                    </Typography>
                  <img
                    src={fotosAcessorioMaisCaro[acessorioMaisCaro?.id]}
                    alt="Imagem do acessório"
                    onClick={() => navigate("/detalhe-acessorios", { state: { acessorios: acessorioMaisCaro } })}
                    style={{
                      cursor: "pointer",
                      height: 150,
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />

                </CardContent>
 
            </Card>

    </Grid>


  </Grid>{/*Grid Container */}

  </Box>
        <Typography variant="h4"  sx={{ marginBottom: 2, marginLeft: 2 }}>
          Distribuição de valor por tipo
        </Typography>
     <Box width="100%" display="flex" flexDirection={"row"} justifyContent={'flex-start'} marginLeft={2}>
         <GraficoPizzaItens
          dados={[
            { nome: "Jogos", valor: valorJogos },
            { nome: "Consoles", valor: valorConsoles },
            { nome: "Acessórios", valor: valorAcessorios },
          ]}
        />

     </Box>
  
    </LayoutBaseDePaginas>
  );
};
