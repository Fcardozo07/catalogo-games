
import { AppBar, Box, Button, Container, Drawer, GlobalStyles, Icon, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export const TelaLogin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  
  const [email, setEmail] = useState(""); 
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
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

      
      <Container maxWidth="sm" sx={{ mt: 20, px: 2, backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: 2, boxShadow: 3, padding: 2 }}>
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
         Catalogo de Games
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

        <form onSubmit={() => {}}>
          <InputLabel sx={{ fontSize: "20px", fontWeight: "bold", color: '#115669'  }}>Login</InputLabel>
         <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="username"
            type="text"
            sx={{
                "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "#115669", // cor da borda
                },
                "&:hover fieldset": {
                    borderColor: "#1683a1", // cor ao passar mouse
                },
                "&.Mui-focused fieldset": {
                    borderColor: "#1683a1", // cor quando focado
                },
                },
                input: { color: "#000" }, // cor do texto
            }}
            />



          <InputLabel sx={{ fontSize: "20px", fontWeight: "bold", color: '#115669' }}>Senha</InputLabel>
         <TextField
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="current-password"
            type="password"
            sx={{
                "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "#115669",
                },
                "&:hover fieldset": {
                    borderColor: "#1683a1",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "#1683a1",
                },
                },
                input: { color: "#000" },
            }}
            />

          {erro && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {erro}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button                
              onClick={() => navigate("/pagina-inicial")}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#115669",
                '&:hover': { backgroundColor: "#1683a1" },
                boxShadow: 3,
              }}
            >
             ENTRAR
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 2, flexWrap: "wrap" }}>
            <Typography
                  component="a"
                  onClick={() => navigate("/esqueci_senha")}
                  sx={{
                    color: '#115669', 
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Esqueci minha senha
          </Typography>

          <Typography
                  component="a"
                  onClick={() => navigate("/cadastro-user")}
                  sx={{
                    color: '#115669',// <-- aqui também
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
            Criar conta
          </Typography>

          </Box>
        </form>
      </Container>
    </Box>
  )

}