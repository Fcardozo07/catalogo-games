import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

const cores = ["#1976d2", "#388e3c", "#d32f2f"]; // azul, verde, vermelho

interface Props {
  dados: {
    nome: string;
    valor: number;
  }[];
}

const renderCustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};


export const GraficoPizzaItens = ({ dados }: Props) => {
  const total = dados.reduce((soma, item) => soma + item.valor, 0);
  const dadosComPorcentagem = dados.map((item) => ({
    ...item,
    porcentagem: ((item.valor / total) * 100).toFixed(1) + "%",
  }));

  return (
   <Box display="flex" flexDirection="row" sx={{ width: 400, height: 300 }}>
  <ResponsiveContainer width={200} height="100%">
    <PieChart>
      <Pie
        data={dadosComPorcentagem}
        dataKey="valor"
        nameKey="nome"
        outerRadius={100}
        label={renderCustomLabel}
        labelLine={false}
      >
        {dados.map((_, index) => (
          <Cell key={index} fill={cores[index % cores.length]} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value: any) =>
          `R$ ${value.toFixed(2).replace(".", ",")}`
        }
        contentStyle={{
          backgroundColor: "#333",
          color: "#fff",
          borderRadius: 8,
        }}
      />
    </PieChart>
  </ResponsiveContainer>

  {/* Legenda lateral */}
  <Box sx={{ ml: 2 }}>
    {dados.map((item, index) => (
      <Box key={index} display="flex" alignItems="center" mb={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: cores[index % cores.length],
            borderRadius: 2,
            mr: 1,
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {item.nome}
        </Typography>
      </Box>
    ))}
  </Box>
</Box>

  );
};
