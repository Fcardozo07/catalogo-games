import { Avatar, Box, IconButton, Skeleton, useTheme, Icon } from "@mui/material";
import { useFotoUsuarioContext } from "../../contexts/FotoUsuarioContext";

interface FotoUsuarioProps {
  
  onDeleteFoto?: () => void;
}

export const FotoUsuario: React.FC<FotoUsuarioProps> = ({ onDeleteFoto }) => {
  const theme = useTheme();
  const { fotoUrl } = useFotoUsuarioContext();


  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      {fotoUrl ? (
        <>
          <Avatar sx={{ height: theme.spacing(15), width: theme.spacing(15) }} src={fotoUrl} />
          {onDeleteFoto && (
            <IconButton
              size="small"
              onClick={onDeleteFoto}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "red",
                color: "white",
                "&:hover": { backgroundColor: "darkred" },
                transform: "translate(40%, -40%)",
              }}
            >
              <Icon fontSize="small">close</Icon>
            </IconButton>
          )}
        </>
      ) : (
        <Skeleton variant="circular" width={theme.spacing(15)} height={theme.spacing(15)} />
      )}
    </Box>
  );
};
