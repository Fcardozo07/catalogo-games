import React from "react";
import { IFormNovoJogoProps } from "../../types/lista_jogos/types";
import { Box, Button, Container, FormControl, Icon, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";




export const FormNovoJogo: React.FC<IFormNovoJogoProps> = ({
    marcas,
    modelos,
    fotos,   
    descricao,
    setDescricao,
    valor,
    setValor,
    titulo,
    setTitulo,
    handleUploadImagem,
    imagem,
    setImagem,
    idJogoCriado,
    id_marca,
    setMarca,
    id_modelo,
    setModelo
    
}) =>{

    return(
   <Container maxWidth="sm" sx={{ mt: 2 }}>
                <form>
                    <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
                        Cadastro de Jogo
                    </Typography>

                    <FormControl fullWidth margin="normal">                        
                    <TextField
                    fullWidth
                    label="Marca"
                    select
                    value={id_marca}
                    onChange={(e) => setMarca(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    >
                    {marcas.map((marca) => (
                        <MenuItem key={marca.id} value={marca.id}>
                        {marca.descricao}
                        </MenuItem>
                    ))}
                    </TextField>
        </FormControl>

        <FormControl fullWidth margin="normal">
                    <InputLabel id="modelo-label">Modelo</InputLabel>
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
                        fullWidth
                        label="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Valor"
                        value={valor}
                        onChange={(e) => setValor(Number(e.target.value))}
                        margin="normal"
                        variant="outlined"
                        type="number"
                    />
                    
                    
        
        {idJogoCriado && (
            <FormControl fullWidth margin="normal">
                <Typography variant="subtitle1">Adicionar imagem ao jogo:</Typography>
                <input
                    id="upload-imagem"
                    type="file"
                    accept="image/*"
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
                  

    </form>
            {fotos.length > 0 && (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Imagens do Jogo</Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {fotos.map((foto, idx) => (
                <img
                key={foto.id}
                src={foto.url}
                alt={`Jogo ${idx}`}
                style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 8 }}
                />
            ))}
            </div>
        </Container>
        )}


                
</Container>

    )

}