import { Box, Button, Container, FormControl, Icon, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import { IFormNovoAcessorioProps } from "../../types/lista_acessorios/types";



export const FormNovoAcessorio: React.FC<IFormNovoAcessorioProps> = ({
    tipo,
    setTipo,
    id_marca,
    setMarca,
    id_modelo,
    setModelo,
    descricao,
    setDescricao,
    valor,
    setValor,
    id_console,
    setConsole,
    marcas,
    modelos,
    consoles,
    fotos,
    imagem,
    setImagem,
    handleUploadImagem,
    idAcessorioCriado,
   
    
}) => {
    return(
        <Container maxWidth="sm" sx={{ mt: 2 }}>
          <form>
            <Typography
              variant="h6"
              display="flex"
              justifyContent="center"
              gutterBottom
            >
              Cadastro de Acessório
            </Typography>
  
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo</InputLabel>
              <Select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                label="Tipo"
              >
                <MenuItem value="Controle">Controle</MenuItem>
                <MenuItem value="Cabo de Video">Cabo de Video</MenuItem>
                <MenuItem value="Memory Card">Memory Card</MenuItem>
                <MenuItem value="Motion Plus">Motion Plus</MenuItem>
                <MenuItem value="Fonte de Alimentação">Fonte de Alimentação</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Marca</InputLabel>
              <Select
                value={id_marca}
                onChange={(e) => setMarca(e.target.value)}
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
                labelId="modelo-label"
                label="Modelo"
                value={id_modelo}
                onChange={(e) => setModelo(e.target.value)}
                disabled={!id_marca} // desativa o select se nenhuma marca foi escolhida
              >
                {modelos
                  .filter((modelo) => modelo.id_marca === id_marca)
                  .map((modelo) => (
                    <MenuItem key={modelo.id} value={modelo.id}>
                      {modelo.descricao}
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
              type="number"
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
            />
    
  
            <FormControl fullWidth margin="normal">
              <InputLabel>Console (Opcional)</InputLabel>
              <Select
                value={id_console}
                onChange={(e) => setConsole(e.target.value)}
                label="Console"
              >
                {consoles.map((console) => (
                  <MenuItem key={console.id} value={console.id}>
                    {console.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


            {idAcessorioCriado && (
            <FormControl fullWidth margin="normal">
              <Typography variant="subtitle1">Adicionar imagem ao acessório:</Typography>
              <input
                accept="image/*"
                id="upload-imagem"
                type="file"
                style={{ display: 'none' }}                
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImagem(e.target.files[0]);
                  }
                }}
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
                onClick={handleUploadImagem}
                disabled={!imagem}
                startIcon={<Icon>cloud_upload</Icon>}
                
              >
                Enviar Imagem
              </Button>

            </FormControl>
            
          )}
          
          {fotos.length > 0 && (
            <Container sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>Imagens do Acessório</Typography>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {fotos.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Acessório ${idx}`}
                    style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 8 }}
                  />
                ))}
              </div>
            </Container>
          )}
          
            
          </form>
  
        </Container>

    )
}