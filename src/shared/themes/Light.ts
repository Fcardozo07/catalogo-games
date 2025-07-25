import { createTheme} from '@mui/material';
import { cyan, green } from '@mui/material/colors';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: green[700],
            dark: green[800],
            light: green[500],
            contrastText: '#fff',
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#fff',
        },
        background: {
            default: '#f7f6f3',
            paper: '#ffffff',
        },
    },
});