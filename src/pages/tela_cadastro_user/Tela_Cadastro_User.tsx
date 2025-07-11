
import {  Box,  Container, GlobalStyles, Typography, useMediaQuery, useTheme } from "@mui/material";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { CadastroUsuarioForm } from "../../shared/components/CadastroUsuario/CadastroUsuarioForm";
import { useCadastroUsuarioData } from "../../shared/hooks/Cadastro_Usuario/useCadastroUsuarioData";



export const Tela_Cadastro_User = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [imagem, setImagem] = useState<File | null>(null);  
  const navigate = useNavigate();
  
const{
    nome,
    email,
    senha,
    senhaRepetida,
    erro,
    setNome,
    setEmail,
    setSenha,
    setErro,
    setSenhaRepetida,
    handleCadastrar 
  } = useCadastroUsuarioData(0); // Passando 0 como ID inicial, pois ainda não existe usuário cadastrado
  //const {toggleTheme} = useAppThemeContext();



  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);


  return(
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundImage: `url(assets/images/fundo_login.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <GlobalStyles
        styles={{
          html: { width: "100%", overflowX: "hidden" },
          body: { margin: 0, padding: 0, width: "100%", overflowX: "hidden" },
          "#root": { width: "100%" },
          
        }}
      />

      
      <Container maxWidth="sm" sx={{ mt: 7, px: 2, backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: 2, boxShadow: 3, padding: 2 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            mt: 4,
            mb: 3,
            fontFamily: "cursive",
            color: '#115669',
          }}
        >
         Cadastar Usuario
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >

          
        </Box>

        <CadastroUsuarioForm
        nome={nome}
        setNome={setNome}
        email={email}
        setEmail={setEmail}
        senha={senha}
        setSenha={setSenha}
        senhaRepetida={senhaRepetida}
        setSenhaRepetida={setSenhaRepetida}
        erro={erro}
        setErro={setErro}
        onSubmit={() => handleCadastrar(imagem)} // 👈 passa a imagem aqui
        imagem={imagem}          // 👈 adiciona aqui
        setImagem={setImagem}
        
                
        />
      </Container>
    </Box>
  )

}