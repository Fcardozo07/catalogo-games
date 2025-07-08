// src/shared/hooks/FotoUsuario/useFotoUsuario.ts

import { useState, useEffect, useCallback } from "react";
import api from "../../services/axios";
import { useAuthContext } from "../../contexts/AuthContext";

const useFotoUsuario = () => {
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [fotoId, setFotoId] = useState<number | null>(null);
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


useEffect(() => {
  reloadFoto();
}, [reloadFoto]);

  return { fotoUrl, fotoId, setFotoUrl, setFotoId, reloadFoto };
};

export default useFotoUsuario;
