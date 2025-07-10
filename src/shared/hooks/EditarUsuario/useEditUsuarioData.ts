// src/shared/hooks/EditarUsuario/useEditUsuarioData.ts

import { useState, useEffect } from "react";
import api from "../../services/axios";
import { toast } from "react-toastify";
import { useFotoUsuarioUpload } from "../../hooks/FotoUsuario/useFotoUsuarioUpload";
import { useFotoUsuarioContext } from "../../contexts/FotoUsuarioContext";
import { useAuthContext } from "../../contexts/AuthContext";

const useEditUsuarioData = () => {
  const { user } = useAuthContext();
  const usuarioId = user?.id
  const { fotoUrl, fotoId, reloadFoto } = useFotoUsuarioContext();

  


  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepetida, setSenhaRepetida] = useState("");
  const [erro, setErro] = useState("");

  const [imagem, setImagem] = useState<File | null>(null);

  const { uploadFoto } = useFotoUsuarioUpload();

 
  useEffect(() => {
    const fetchUsuario = async () => {
      if (!usuarioId) return;
      try {
        const res = await api.get(`/users/${usuarioId}`);
        setNome(res.data.nome);
        setEmail(res.data.email);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setErro("Erro ao buscar usuário.");
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  const handleEditar = async () => {
    setErro("");
    if (senha && senha !== senhaRepetida) {
      setErro("As senhas não coincidem.");
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const payload: any = { nome, email };
      if (senha) payload.senha = senha;

      await api.put(`/users/${usuarioId}`, payload);

      if (imagem) {
        await uploadFoto(usuarioId!, imagem);
        await reloadFoto();  // 👈 força atualizar contexto e refazer re-render
        setImagem(null);
      }
      
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      toast.error("Erro ao editar usuário");
    }
  };

  const handleDeleteFoto = async () => {
    if (!fotoId) return;
    try {
      await api.delete(`/fotos/${fotoId}`);
      await reloadFoto();
      toast.success("Foto excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir foto:", error);
      toast.error("Erro ao excluir foto");
    }
  };

  return {
    nome,
    setNome,
    email,
    setEmail,
    senha,
    setSenha,
    senhaRepetida,
    setSenhaRepetida,
    erro,
    setErro,
    imagem,
    setImagem,
    handleEditar,
    fotoUrl,
    handleDeleteFoto,
  };
};

export default useEditUsuarioData;
