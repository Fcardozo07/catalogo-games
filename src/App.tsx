import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { ToastContainer } from 'react-toastify';
import { MenuLateral } from './shared/components';
import { AuthProvider } from './shared/contexts/AuthContext';
import { FotoUsuarioProvider } from './shared/contexts/FotoUsuarioContext';

export const AppContent = () => {
  const location = useLocation();
  const noMenuRoutes = ['/tela-login', "/cadastro-user"];

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
          <AuthProvider>
            <FotoUsuarioProvider>
              <AppContent />
              <ToastContainer position="top-right" autoClose={3000} />
            </FotoUsuarioProvider>
          </AuthProvider>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
