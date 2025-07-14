import CloseIcon from "@mui/icons-material/Close";
import { useDetalheJogosData } from "../../hooks/lista_jogos/useDetalheJogosData";
import { Box, Dialog, DialogContent, IconButton, TextField, Typography } from "@mui/material";



export const FormDetalheJogo = () => {

const{
      nome,
      descricao,
      valor,
      marca,
      modelo,
      marcas,
      modelos,
      imagemSelecionada,
      setImagemSelecionada,
      openModal,
      setOpenModal,
      fotos,
      setFotos
}=useDetalheJogosData();

    return (
        <>
         <Box
        width="100%"
        maxWidth={600}
        mx="auto"
        mt={2}
        px={2}
        pb={4}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h5" align="center" fontWeight="bold">
          Descrição do Jogo
        </Typography>

        <TextField label="Nome do Jogo" value={nome} fullWidth disabled size="small" />
        <TextField label="Descrição" value={descricao} fullWidth disabled size="small" />
        <TextField label="Valor" value={valor} fullWidth disabled size="small" />
        <TextField label="Marca" value={marca} fullWidth disabled size="small" />
        <TextField label="Modelo do Console" value={modelo} fullWidth disabled size="small" />

        {fotos.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Imagens do Jogo
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {fotos.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Jogo ${idx}`}
                  style={{
                    width: 130,
                    height: 130,
                    objectFit: "cover",
                    borderRadius: 10,
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onClick={() => {
                    setImagemSelecionada(url);
                    setOpenModal(true);
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>

      
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
        </>
       
    )
}
