import { Container, Dialog, DialogContent, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDetalheConsolesData } from "../../hooks/lista_consoles/useDetalheConsolesData";


export const FormDetalheConsoles: React.FC = () => {

    const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const{
        fotos,
        consoles,
        marcas,
        modelos,
        nome,
        descricao,
        valor,
        marca,
        modelo,
        setNome,
        setDescricao,
        setValor,
        setMarca,
        setModelo,
        
    }=useDetalheConsolesData();
    

    return (
        <Container maxWidth="sm" sx={{ mt: 2 }}>
            <form>
                <Typography variant="h6" display="flex" justifyContent="center" gutterBottom>
                    Descrição do Console
                </Typography>
                <TextField
                    label="Tipo"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    disabled
                />
                <TextField
                    label="Descrição"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    disabled
                />
                <TextField
                    label="Valor"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    disabled
                />
                <TextField
                    label="Marca"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    disabled
                />
                <TextField
                    label="Modelo"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    disabled
                />
                {fotos.length > 0 && (
                    <Container sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>Imagens do Console</Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {fotos.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`Console ${idx}`}
                                style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }}
                                onClick={() => {
                                setImagemSelecionada(url);
                                setOpenModal(true);
                                }}
                            />
                            ))}

                        </div>
                    </Container>
                )}
            </form>
                    <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
                    <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
    )
}