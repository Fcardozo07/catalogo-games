import { ICadastroUsuarioFormProps } from "../../types/Cadastro_Usuario/types";
import { Box, Button, FormControl, Icon, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CadastroUsuarioForm  : React.FC<ICadastroUsuarioFormProps> = ({
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
  onSubmit,
  //imagem,      
  //setImagem  
}) => {
 const navigate = useNavigate();

 return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(); // <-- isso aqui estava faltando!
    }}>
          <InputLabel sx={{ fontSize: "20px", fontWeight: "bold", color: '#115669'  }}>Nome</InputLabel>
         <TextField
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
        <InputLabel sx={{ fontSize: "20px", fontWeight: "bold", color: '#115669'  }}>Email</InputLabel>
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

          <InputLabel sx={{ fontSize: "20px", fontWeight: "bold", color: '#115669' }}>Repetir Senha</InputLabel>
         <TextField
            value={senhaRepetida}
            onChange={(e) => setSenhaRepetida(e.target.value)}
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

          <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb:5,  gap:5}}>
            <Button                
              onClick={() => navigate("/tela_login")}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#e82525",
                '&:hover': { backgroundColor: "#c41f1f" },
                boxShadow: 3,
              }}
            >
             CANCELAR
            </Button>
            <Button 
              type="submit"                
              //onClick={() => navigate("/pagina-inicial")}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#115669",
                '&:hover': { backgroundColor: "#1683a1" },
                boxShadow: 3,
              }}
            >
             CADASTRAR
            </Button>
          </Box>

          
        </form>
 )

}