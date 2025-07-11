import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { IFormEditarAcessoriosProps } from "../../types/lista_acessorios/types";



export const FormEditarAcessorios: React.FC<IFormEditarAcessoriosProps> = ({
  nome,
  setNome,
  descricao,
  setDescricao,
  valor,
  setValor,
  marca,
  setMarca,
  modelo,
  setModelo,
  marcas,
  modelos,
  fotos,
  novasImagens,
  handleFileChange,
  handleFileUpload,
  handleDeleteFoto,
  imagemSelecionada,
  setImagemSelecionada,
  openModal,
  setOpenModal,
}) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <form>
        <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
          Editar Acessório
        </Typography>

        <TextField
          label="Tipo"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Marca</InputLabel>
          <Select
            value={marca ?? ""}
            onChange={(e) => setMarca(Number(e.target.value))}
            label="Marca"
          >
            {marcas.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.descricao}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Modelo</InputLabel>
          <Select
            value={modelo ?? ""}
            onChange={(e) => setModelo(Number(e.target.value))}
            label="Modelo"
          >
            {modelos.map((mod) => (
              <MenuItem key={mod.id} value={mod.id}>
                {mod.descricao}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          margin="normal"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <TextField
          label="Valor"
          variant="outlined"
          fullWidth
          margin="normal"
          value={valor}
          onChange={(e) => {
            const v = e.target.value === "" ? "" : Number(e.target.value);
            setValor(v);
          }}
        />

        <FormControl fullWidth margin="normal">
          <Typography variant="h6" gutterBottom>
            Adicionar novas imagens
          </Typography>

          <input
            id="upload-imagem"
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => handleFileChange(e)}
          />
          <label htmlFor="upload-imagem">
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
              <Button
                variant="contained"
                component="span"
                startIcon={<Icon>upload</Icon>}
                fullWidth
              >
                Escolher Imagem
              </Button>
            </Box>
          </label>

          <Button
            variant="contained"
            color="primary"
            onClick={handleFileUpload}
            disabled={novasImagens.length === 0}
            startIcon={<Icon>cloud_upload</Icon>}
          >
            Enviar Imagem
          </Button>
        </FormControl>

        {fotos.length > 0 && (
          <Container sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Imagens do Acessório
            </Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {fotos.map((foto, idx) => (
                <div key={foto.id} style={{ position: "relative", width: 150, height: 150 }}>
                  <img
                    src={foto.url}
                    alt={`Acessório ${idx}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setImagemSelecionada(foto.url);
                      setOpenModal(true);
                    }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFoto(foto.id);
                    }}
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </Container>
        )}
      </form>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {imagemSelecionada && (
            <img
              src={imagemSelecionada}
              alt="Imagem ampliada"
              style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 8 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};
