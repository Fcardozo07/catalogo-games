import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/axios';
import { useAuthContext } from './AuthContext';

interface FotoUsuarioContextData {
  fotoUrl: string | null;
  setFotoUrl: (url: string | null) => void;
  reloadFoto: () => void;
}

const FotoUsuarioContext = createContext({} as FotoUsuarioContextData);

export const useFotoUsuarioContext = () => {
  return useContext(FotoUsuarioContext);
};

export const FotoUsuarioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const { user } = useAuthContext();

  const reloadFoto = useCallback(async () => {
  const usuarioId = user?.id;
  if (!usuarioId) return;

  try {
    const response = await api.get(`/fotos/${usuarioId}`);
    const data = response.data;
    if (data.length > 0) {
      setFotoUrl(`http://localhost:3003/uploads/${data[0].filename}`);
    } else {
      setFotoUrl(null);
    }
  } catch (error) {
    console.error("Erro ao buscar foto:", error);
    setFotoUrl(null);
  }
}, [user]); // <-- ADICIONE user AQUI


  // 🔥 Chama reloadFoto assim que montar
  useEffect(() => {
    reloadFoto();
  }, [reloadFoto]);

  return (
    <FotoUsuarioContext.Provider value={{ fotoUrl, setFotoUrl, reloadFoto }}>
      {children}
    </FotoUsuarioContext.Provider>
  );
};
