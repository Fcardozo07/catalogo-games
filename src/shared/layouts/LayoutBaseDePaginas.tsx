import { Box, CssBaseline, GlobalStyles, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../contexts";
import { useAppThemeContext } from "../contexts/ThemeContext"; // <- aqui você importa seu hook de tema

type LayoutBaseDePaginasProps = {
  children?: React.ReactNode;
  titulo: string;
  barraDeFerramentas: React.ReactNode;
};

export const LayoutBaseDePaginas: React.FC<LayoutBaseDePaginasProps> = ({ children, titulo, barraDeFerramentas }) => {
  const theme = useTheme();
  const smdown = useMediaQuery(theme.breakpoints.down("sm"));
  const mddown = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleDrawerOpen } = useDrawerContext();
  const { themeName } = useAppThemeContext(); // <- pega o nome do tema atual

  const logoSrc = themeName === "dark"
    ? "/assets/images/_bannerEscuro.gif"
    : "/assets/images/_BannerClaro2.gif";

  const backgroundSrc = themeName === "dark"
    ? "/assets/images/fundoRetro2.jpg"
    : "/assets/images/fundoRetroClaro2.jpg";

  return (
    <>
      <CssBaseline />
        <GlobalStyles
          styles={{
            "html, body, #root": {
              height: "100%",
              margin: 0,
              padding: 0,
              overflow: "hidden", // evita todos os scrolls no body
              boxSizing: "border-box",
            },
            "*": {
              boxSizing: "inherit",
            },
          }}
        />
    <Box
    height="100%" display="flex" flexDirection="column" gap={1}
    sx={{
      backgroundImage: `url(${backgroundSrc})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
    
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height={theme.spacing(smdown ? 6 : mddown ? 8 : 12)}
      >
        {/* Lado esquerdo: ícone e logo */}
<Box display="flex" alignItems="center" gap={1}>
  {smdown && (
    <IconButton onClick={toggleDrawerOpen}>
      <Icon>menu</Icon>
    </IconButton>
  )}

  {/* Primeira imagem - redimensiona quando mddown */}
          <Box
                component="img"
                src={logoSrc}
                alt="Logo Principal"
                sx={{
                    height: {
                    xs: 20,  // celulares pequenos
                    sm: 30,  // celulares maiores
                    md: 60,  // tablets (iPad etc.)
                    lg: 100,  // notebooks
                    xl: 200, // telas grandes
                    },
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: "contain",
                    transition: "height 0.3s ease",
                    marginBottom: 2
                }}
                />      
            </Box>

        </Box>     
       {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>} 
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
    </>
  );
};
