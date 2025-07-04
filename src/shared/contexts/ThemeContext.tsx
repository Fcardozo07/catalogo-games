import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '../themes/Dark';
import { lightTheme } from '../themes';

import { Box } from '@mui/system';


interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
};

interface IAppThemeProviderProps {
    children: React.ReactNode;
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('dark');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);

    const theme = useMemo(() => {
        return themeName === 'light' ? lightTheme : darkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default} color="text.primary">
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};