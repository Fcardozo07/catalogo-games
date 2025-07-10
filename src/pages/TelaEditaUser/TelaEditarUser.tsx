import { useTheme } from "@mui/material";
import { Box, Container, GlobalStyles, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppThemeContext } from "../../shared/contexts";

import { LayoutBaseDePaginas } from "../../shared/layouts/LayoutBaseDePaginas";
import { FerramentasDeDetalhe } from "../../shared/components";
import { EditUsuarioForm } from "../../shared/components/EditUsuarioForm/EditUsuarioForm";
import useEditUsuarioData from "../../shared/hooks/EditarUsuario/useEditUsuarioData";

export const TelaEditarUser = () => {
  // ✅ Hook de edição de usuário (já inclui update + upload foto)
  const {
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    senhaRepetida,
    setSenhaRepetida,
    erro,
    setErro,
    handleEditar,
    imagem,
    setImagem,
  } = useEditUsuarioData();

  // 🎨 Theme
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // 🧭 Navegação
  const navigate = useNavigate();

  // Menu lateral (não utilizado diretamente aqui, mas mantido caso precise)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  // Theme context (botão de alternar tema)
  const { toggleTheme } = useAppThemeContext();

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
