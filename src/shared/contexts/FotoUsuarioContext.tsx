import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/axios';
import { useAuthContext } from './AuthContext';

interface FotoUsuarioContextData {
  fotoUrl: string | null;
  fotoId: number | null;
  setFotoUrl: (url: string | null) => void;
  reloadFoto: () => void;
}


const FotoUsuarioContext = createContext({} as FotoUsuarioContextData);

export const useFotoUsuarioContext = () => {
  return useContext(FotoUsuarioContext);
};

export const FotoUsuarioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [fotoId, setFotoId] = useState<number | null>(null);
  const { user } = useAuthContext();

  const reloadFoto = useCallback(async () => {
  const usuarioId = user?.id;
  if (!usuarioId) {
    return;
  }

  try {
    const response = await api.get(`/fotos/${usuarioId}`);
    const data = response.data;
    if (data.length > 0) {
      setFotoUrl(`http://localhost:3003/uploads/${data[0].filename}`);
      setFotoId(data[0].id); // 👈 pega o ID
    } else {
      setFotoUrl(null);
      setFotoId(null);
    }
  } catch (error) {
    console.error("Erro ao buscar foto:", error);
    setFotoUrl(null);
    setFotoId(null);
  }
}, [user]);



  // 🔥 Chama reloadFoto assim que montar
  useEffect(() => {
    reloadFoto();
  }, [reloadFoto]);

  return (
    <FotoUsuarioContext.Provider value={{ fotoUrl, fotoId, setFotoUrl, reloadFoto }}>
      {children}
    </FotoUsuarioContext.Provider>

  );
};
