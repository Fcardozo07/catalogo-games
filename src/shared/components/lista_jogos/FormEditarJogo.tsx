import { Box, Button, Container, Dialog, DialogContent, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { IFormEditarJogoProps, Foto } from "../../types/lista_jogos/types";
import CloseIcon from "@mui/icons-material/Close";



export const FormEditarJogos: React.FC<IFormEditarJogoProps> = ({
    marcas,
    modelos,
    fotos,
    descricao,
    setDescricao,
    valor,
    setValor,
    titulo,
    setTitulo,
    setMarca,
    modelo,
    setModelo,
    marca,
    handleFileUpload,
    handleFileChange,
    handleDeleteFoto,
    setImagemSelecionada,
    imagemSelecionada,
    openModal,
    setOpenModal,
    novasImagens,


}) => {

    return(
        <Container maxWidth="sm" sx={{ mt: 2 }}>
        <form>
            <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
                Editar Jogo
            </Typography>

            <FormControl fullWidth margin="normal">
                <InputLabel>Marca</InputLabel>
                <Select
                    value={marca ?? ""}
                    onChange={(e) => setMarca(Number(e.target.value))}
                    label="Marca"
                >
                    {marcas.map((marca) => (
                        <MenuItem key={marca.id} value={marca.id}>
                            {marca.descricao}
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
                    {modelos.map((modelo) => (
                        <MenuItem key={modelo.id} value={modelo.id}>
                            {modelo.descricao}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Título"
                variant="outlined"
                fullWidth
                margin="normal"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
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
                type="number"
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
            />
            
            

            <FormControl fullWidth margin="normal">

            <Typography variant="h6" gutterBottom>Adicionar novas imagens</Typography>
            <input
                id="upload-imagem"
                type="file"
                style={{display: 'none'}}
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
            />
                    <label htmlFor="upload-imagem">
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
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
                        <Typography variant="h6" gutterBottom>Imagens do Jogo</Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {fotos.map((foto, idx) => (
                        <div key={foto.id} style={{ position: 'relative', width: 150, height: 150 }}>
                            <img
                            src={foto.url}
                            alt={`Jogo ${idx}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }}
                            onClick={() => {
                                setImagemSelecionada(foto.url);
                                setOpenModal(true);
                            }}
                            />
                            <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFoto(foto.id); // Agora passando o id correto
                            }}
                            style={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: 24,
                                height: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold',
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
<Dialog open={openModal} onClose={() => setOpenModal(false)} fullScreen>
  <DialogContent
    sx={{
      backgroundColor: "#000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      p: 0,
      position: "relative",
    }}
  >
    <IconButton
      onClick={() => setOpenModal(false)}
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        color: "#fff",
        zIndex: 10,
      }}
    >
      <CloseIcon />
    </IconButton>

    {imagemSelecionada && (
      <Box
        component="img"
        src={imagemSelecionada}
        alt="Imagem ampliada"
        sx={{
          maxHeight: "95vh",
          maxWidth: "95vw",
          objectFit: "contain",
          borderRadius: 2,
        }}
      />
    )}
  </DialogContent>
</Dialog>
    </Container>
    )
}