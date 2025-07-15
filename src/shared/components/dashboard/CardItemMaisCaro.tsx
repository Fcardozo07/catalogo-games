import { Box, Card, CardContent, Grid, Typography } from "@mui/material"

import {renderizarFabricante} from "../../utils/dashboardHelpers"
import { ICardItemMaisCaroProps } from "../../types/dashboard/types";
import { useNavigate } from "react-router-dom";


export const CardItemMaisCaro: React.FC<ICardItemMaisCaroProps> = ({
jogoMaisCaro,
fabricantePorId,
fotosJogoMaisCaro,
descricaoModelo,
consoleMaisCaro,
fotosConsoleMaisCaro,
acessorioMaisCaro,
fotosAcessorioMaisCaro,

}) => {

    const navigate = useNavigate();
    const fotoJogo = jogoMaisCaro && jogoMaisCaro.id ? fotosJogoMaisCaro[jogoMaisCaro.id] : undefined;
    const fotoConsole = consoleMaisCaro && consoleMaisCaro.id ? fotosConsoleMaisCaro[consoleMaisCaro.id] : undefined;
    const fotoAcessorio = acessorioMaisCaro && acessorioMaisCaro.id ? fotosAcessorioMaisCaro[acessorioMaisCaro.id] : undefined;




    return(
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
                    {jogoMaisCaro?.id_marca !== undefined && (
                    <Box>
                        {renderizarFabricante(fabricantePorId[jogoMaisCaro.id_marca])}
                    </Box>
                    )}
                        
                <Typography variant="h6" align="center" sx={{ marginTop: 0, color: "text.secondary" }}>
            R$ {jogoMaisCaro?.valor?.toFixed(2).replace(".", ",") || "--"}
                </Typography>
                
                  <img
                    src={fotoJogo}
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
                {consoleMaisCaro?.id_marca !== undefined && (
                    <Box>
                        {renderizarFabricante(fabricantePorId[consoleMaisCaro.id_marca])}
                    </Box>
                    )}


                    <Typography variant="h6" align="center" sx={{ marginTop: 1, color: "text.secondary" }}>
                    R$ {consoleMaisCaro?.valor?.toFixed(2).replace(".", ",") || "--"}
                    </Typography>
                      <img
                        src={fotoConsole}
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
                    {acessorioMaisCaro?.id_marca !== undefined && (
                    <Box>
                        {renderizarFabricante(fabricantePorId[acessorioMaisCaro.id_marca])}
                    </Box>
                    )}
                                       
                    <Typography variant="h6" align="center" sx={{ marginTop: 1, color: "text.secondary" }}>
                    R$ {acessorioMaisCaro?.valor?.toFixed(2).replace(".", ",") || "--"}
                    </Typography>
                  <img
                    src={fotoAcessorio}
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


  </Grid>
    );
}
    