import { Box, Button, Card, CardContent, Grid, Icon, Typography } from "@mui/material";
import React from "react";
import { ICardResumoProps } from "../../types/dashboard/types";
import { useNavigate } from "react-router-dom";


export const CardResumo: React.FC<ICardResumoProps> = ({
  totalJogos,
  valorJogos,
  totalConsoles,
  valorConsoles,
  totalAcessorios,
  valorAcessorios,
  valorTotalGeral,
}) => {

    const navigate = useNavigate();


    return(
        <Grid container spacing={2} margin={2} >
    

            <Grid >
                <Card sx={{ display: "flex", flexDirection: "column", height: "300px", width :"300px", borderRadius: 5 }}>
                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h5" align="center">
                        Total de Jogos              
                        </Typography>

                        <Typography variant="h3" align="center" sx={{ marginTop: 2 }}>
                        {totalJogos}
                        </Typography>
                    </CardContent>

                    <Typography variant="h6" align="center" sx={{ marginTop: 1, color: "text.secondary" }}>
                    Valor total: R$ {valorJogos.toFixed(2).replace(".", ",")}
                  </Typography>

                {/* Rodapé do Card */}
                    <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                        <Button
                        color="primary"
                        variant="contained"
                        disableElevation
                        endIcon={<Icon>list</Icon>}
                        onClick={() => navigate("/lista-jogos")}
                        >
                        Listar
                        </Button>
                    </Box>
                </Card>
        </Grid>
   
            <Grid >
                <Card sx={{ display: "flex", flexDirection: "column", height: "300px", width :"300px", borderRadius: 5}}>
                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h5" align="center">
                        Total de Consoles            
                        </Typography>

                        <Typography variant="h3" align="center" sx={{ marginTop: 2 }}>
                        {totalConsoles}
                        </Typography>
                    </CardContent>

                    <Typography variant="h6" align="center" sx={{ marginTop: 1, color: "text.secondary" }}>
                    Valor total: R$ {valorConsoles.toFixed(2).replace(".", ",")}
                    </Typography>

                {/* Rodapé do Card */}
                    <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                        <Button
                        color="primary"
                        variant="contained"
                        disableElevation
                        endIcon={<Icon>list</Icon>}
                        onClick={() => navigate("/lista-consoles")}
                        >
                        Listar
                        </Button>
                    </Box>
                </Card>
        </Grid>
    
            <Grid >
                <Card sx={{ display: "flex", flexDirection: "column", height: "300px", width :"300px", borderRadius: 5 }}>
                    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography variant="h5" align="center">
                        Total de Acessórios
                        </Typography>

                        <Typography variant="h3" align="center" sx={{ marginTop: 2 }}>
                        {totalAcessorios}
                        </Typography>
                    </CardContent>

                    <Typography variant="h6" align="center" sx={{ marginTop: 1, color: "text.secondary" }}>
                      Valor total: R$ {valorAcessorios.toFixed(2).replace(".", ",")}
                    </Typography>

                {/* Rodapé do Card */}
                    <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                        <Button
                        color="primary"
                        variant="contained"
                        disableElevation
                        endIcon={<Icon>list</Icon>}
                        onClick={() => navigate("/lista-acessorios")}
                        >
                        Listar
                        </Button>
                    </Box>
                </Card>
        </Grid>
    
      <Grid>
      <Card sx={{ display: "flex", flexDirection: "column", height: "300px", width :"300px", borderRadius: 5}}>

          <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h5" align="center">
              Valor Total dos Itens
            </Typography>

            <Typography variant="h4" align="center" sx={{ marginTop: 2, fontWeight: "bold" }}>
              R$ {valorTotalGeral.toFixed(2).replace(".", ",")}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      </Grid>
    )

}

