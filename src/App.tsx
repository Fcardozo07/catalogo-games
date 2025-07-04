import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { MenuLateral } from './shared/components';

export const AppContent = () => {
  const location = useLocation();
  const noMenuRoutes = ['/tela-login', "/cadastro-user" ]; // ajuste para sua rota de login

  const showMenu = !noMenuRoutes.includes(location.pathname);

  return showMenu ? (
    <MenuLateral>
      <AppRoutes />
    </MenuLateral>
  ) : (
    <AppRoutes />
  );
};

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
