
import { Box } from "@mui/material";
import { fabricantes } from "./dashboardConstants";

export function renderizarFabricante(fabricante: string | undefined) {
  if (!fabricante) return null;

  const info = fabricantes[fabricante.toLowerCase()];
  if (!info) return null;

  return (
    <Box display="flex" justifyContent="center" sx={{ mt: 0.5, mb: 0.5 }}>
      <img
        src={info.icone}
        alt={info.nome}
        height={70}
        style={{
          maxWidth: 80,
          objectFit: "contain",
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.4))",
        }}
      />
    </Box>
  );
}
