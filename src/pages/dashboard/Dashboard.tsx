import {  FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GraficoPizzaItens } from "../../shared/components/Grafics/GraficoPizzaItens";
import { CardResumo } from "../../shared/components/dashboard/CardResumo";
import { CardItemMaisCaro } from "../../shared/components/dashboard/CardItemMaisCaro";
import { useDashboardData } from "../../shared/hooks/dashboard/useDashboardData";

const fabricantePorId: { [key: number]: string } = {
  1: "nintendo",
  2: "sega",
  5: "microsoft",     
  6: "playstation",  
  8: "atari",
  9: "gradiente",    
  10: "cce",
  12: "dynacom",
};

export const Dashboard = () => {
  const{  
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
        descricaoModelo,
  } = useDashboardData();

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
  
        <CardItemMaisCaro
        jogoMaisCaro={jogoMaisCaro}
        fabricantePorId={fabricantePorId}
        fotosJogoMaisCaro={fotosJogoMaisCaro}
        descricaoModelo={descricaoModelo}
        consoleMaisCaro={consoleMaisCaro}
        fotosConsoleMaisCaro={fotosConsoleMaisCaro}
        acessorioMaisCaro={acessorioMaisCaro}
        fotosAcessorioMaisCaro={fotosAcessorioMaisCaro}
        />

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