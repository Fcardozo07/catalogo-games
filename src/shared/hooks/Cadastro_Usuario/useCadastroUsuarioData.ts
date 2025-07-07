import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import useFotoUsuarioUpload from "./FotoUsuario/useFotoUsuarioUpload";
import { toast } from "react-toastify";



export const useCadastroUsuarioData = (usuarioId: number | string) => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaRepetida, setSenhaRepetida] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { uploadFoto } = useFotoUsuarioUpload();

  const handleCadastrar = async (fotofile?: File | null) => {

    setErro('');
    if (!nome || !email || !senha || !senhaRepetida) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }
    if (senha !== senhaRepetida) {
      setErro('As senhas não coincidem.');
      toast.error('As senhas não coincidem.');
      return;
    }
    try {
        const payload = {      
        nome,
        email,
        password: senha,
        perfil: 'user',
        };

        
        console.log('Payload do cadastro:', payload);
        const response = await api.post(`/users`, payload);

        const usuarioId = response.data.id;

        if (fotofile) {
            await uploadFoto(usuarioId, fotofile);
        }
        
        toast.success('Usuário cadastrado com sucesso!');
        console.log('Usuário cadastrado com sucesso id:', usuarioId);
        navigate('/tela-login');              
        setNome('');
        setEmail('');
        setSenha('');
        setSenhaRepetida('');
        return usuarioId;


    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
    }

    
}

return {
    nome,
    email,
    senha,
    senhaRepetida,
    erro,
    setErro,
    setNome,
    setEmail,
    setSenha,
    setSenhaRepetida,
    handleCadastrar
};   

}