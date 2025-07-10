import api from "../../services/axios";
import { toast } from "react-toastify";

export const useFotoUsuarioUpload = () => {
  const uploadFoto = async (usuarioId: number | string, file: File) => {
    try {
      const formData = new FormData();
      formData.append("id_usuario", String(usuarioId));
      formData.append("foto", file);

      await api.post("/fotos", formData);
      toast.success("Foto enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar foto:", error);
      toast.error("Erro ao enviar foto");
    }
  };

  return { uploadFoto };
};
