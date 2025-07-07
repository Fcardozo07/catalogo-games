import { useState, useEffect, useCallback } from "react";
import api from "../../../services/axios";

const useFotoUsuario = () => {

    const[fotoUrl, setFotoUrl] = useState<string | null>(null);
    const[fotoId, setFotoId] = useState<number | null>(null);

    const fetchFoto =  useCallback(async() => {
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) return;

        try {
      const response = await api.get(`/foto-usuario/usuario/${usuarioId}`);
      if (response.data.length > 0) {
        const foto = response.data[0];
        setFotoUrl(`http://localhost:3003/uploads/${foto.filename}`);
        setFotoId(foto.id);
      } else {
        setFotoUrl(null);
        setFotoId(null);
      }
    } catch (error) {
      console.error("Erro ao buscar foto:", error);
    }
  }, []);

  useEffect(() => {
    fetchFoto();
  }, [fetchFoto]);

  return { fotoUrl, fotoId, setFotoUrl, setFotoId, fetchFoto };
};

export default useFotoUsuario;