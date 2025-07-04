import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

interface Props {
  dados: {
    nome: string;
    valor: number;
  }[];
}

export const GraficoResumo = ({ dados }: Props) => {
  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Valor total por categoria
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
