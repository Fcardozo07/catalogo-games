import React, { createContext, useCallback, useContext, useState } from 'react';


interface IDrawerContextData {
    isDrawerOpen: boolean;
    drawerOptions: IDrawerOptions[];
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;

}

interface IDrawerOptions{
    label: string;
    icon: string;
    path: string;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
};

interface IAppThemeProviderProps {
    children: React.ReactNode;
}

export const DrawerProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
    const [isDrawerOpen, setisDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setisDrawerOpen(oldDrawerOpen => !oldDrawerOpen );
    }, []);
    
    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
        setDrawerOptions(newDrawerOptions);
    }, []);




    return (
        <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions :handleSetDrawerOptions }}>
            {children}
        </DrawerContext.Provider>
    );
};