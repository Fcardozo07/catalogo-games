import { Box, Button, Divider, Icon, Paper, TextField, useTheme } from "@mui/material";
import { Environment } from "../../environment";


interface IFerramentasDaListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca = "",
    mostrarInputBusca = false,
    aoMudarTextoDeBusca,
    textoBotaoNovo = "Novo",
    mostrarBotaoNovo = true,
    mostrarBotaoVoltar,
    aoClicarEmNovo,
    aoClicarEmVoltar,
}) => {
   const theme = useTheme();
   
    return(
        <Box
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            gap={1}
            component={Paper}
            alignItems="center">
            
            {mostrarInputBusca && (
               <TextField
               size="small"
               placeholder={Environment.INPUT_BUSCA}
               value={textoDaBusca}
               onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
               />
            )}

            <Box flex={1} display="flex" justifyContent="end">
            {mostrarBotaoNovo && (
                <Button
                color="primary"
                variant="contained"
                disableElevation
                endIcon={<Icon>add</Icon>}
                onClick={aoClicarEmNovo}
                >{textoBotaoNovo}</Button>
            )}
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box flex={0} display="flex" justifyContent="end">
            {mostrarBotaoVoltar && (
                <Button
                color="primary"
                variant="outlined"
                disableElevation
                startIcon={<Icon>arrow_back</Icon>}  
                onClick={aoClicarEmVoltar}
                >Voltar</Button>
            )}
            </Box>
                       
           

        </Box>
    );
}
