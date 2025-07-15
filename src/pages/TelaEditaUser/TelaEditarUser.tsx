import { Box, Container, GlobalStyles, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LayoutBaseDePaginas } from "../../shared/layouts/LayoutBaseDePaginas";
import { FerramentasDeDetalhe } from "../../shared/components";
import { EditUsuarioForm } from "../../shared/components/EditUsuarioForm/EditUsuarioForm";


export const TelaEditarUser = () => {
 

  // // 🧭 Navegação
  const navigate = useNavigate();

  

  return (
    <LayoutBaseDePaginas
      titulo="Dashboard"
      barraDeFerramentas={
        <FerramentasDeDetalhe
                mostrarBotaoNovo={false}             
                mostarBotaoSalvar={false}
                mostarBotaoSalvarVoltar={false}
                mostarBotaoVoltar={true}               
                aoClicarEmVoltar={() => navigate("/pagina-inicial")}
        />
      }
    >
      {/* Global styles para garantir largura total */}
      <GlobalStyles
        styles={{
          html: { width: "100%", overflowX: "hidden" },
          body: { margin: 0, padding: 0, width: "100%", overflowX: "hidden" },
          "#root": { width: "100%" },
        }}
      />

      <Container maxWidth="sm" sx={{ mt: 4, px: 2 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            mt: 4,
            mb: 3,
          }}
        >
          Editar Perfil
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >
          {/* Espaço para imagem ou logo se precisar */}
        </Box>

        {/* ✅ Formulário com todos os dados controlados */}
        <EditUsuarioForm/>
      </Container>
    </LayoutBaseDePaginas>
  );
};
