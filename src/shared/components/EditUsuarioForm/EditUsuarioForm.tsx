import { Box, Button, FormControl, Icon, IconButton, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICadastroUsuarioFormProps } from "../../types/Cadastro_Usuario/types";
import { FotoUsuario } from "../FotoUsuario/FotoUsuario";
import useEditUsuarioData from "../../hooks/EditarUsuario/useEditUsuarioData";
import { useFotoUsuarioContext } from "../../contexts/FotoUsuarioContext";

export const EditUsuarioForm = () => {

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
    handleDeleteFoto,
    handleEditar,
    imagem,
    setImagem
  } = useEditUsuarioData();

  const { fotoUrl } = useFotoUsuarioContext();

  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditar();
      }}  
    >
      <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Nome</InputLabel>
      <TextField
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        margin="normal"
      />

      <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Email</InputLabel>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />

      <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Senha</InputLabel>
      <TextField
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        fullWidth
        margin="normal"
        type="password"
      />

      <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Repetir Senha</InputLabel>
      <TextField
        value={senhaRepetida}
        onChange={(e) => setSenhaRepetida(e.target.value)}
        fullWidth
        margin="normal"
        type="password"
      />

      {erro && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {erro}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          position: "relative",
        }}
      >
        <FotoUsuario />

        <IconButton
          size="small"
          onClick={handleDeleteFoto}
          sx={{
            position: "absolute",
            top: 0,
            right: "calc(50% - 60px)",
            backgroundColor: "red",
            color: "white",
            "&:hover": { backgroundColor: "darkred" },
            transform: "translate(50%, -50%)",
          }}
        >
          <Icon fontSize="small">close</Icon>
        </IconButton>
      </Box>

      <FormControl fullWidth margin="normal">
        <Typography variant="subtitle1">Adicionar imagem do usuário:</Typography>
        <input
          accept="image/*"
          id="upload-imagem"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImagem(e.target.files[0]);
            }
          }}

          disabled={!!fotoUrl} // 👈 aqui!
        />
        <label htmlFor="upload-imagem">
          <Button
            variant="contained"
            component="span"
            startIcon={<Icon>upload</Icon>}
            fullWidth
            disabled={!!fotoUrl}
          >
            Escolher Imagem
          </Button>
        </label>
      </FormControl>


      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 3 }}>
        <Button
          type="button"
          onClick={() => navigate("/pagina-inicial")}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#8c0f0f",
            "&:hover": { backgroundColor: "#e03131" },
          }}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#115669",
            "&:hover": { backgroundColor: "#1683a1" },
          }}
        >
          Salvar
        </Button>
      </Box>
    </form>
  );
};
