
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/axios";

export const useAuth = () => {
    const navigate = useNavigate();
    
    const login  = async (email: string, password: string) => {
        try {
            const response = await api.post("/tokens",{email, password});
            const {token} = response.data;
            localStorage.setItem("token", token);
            toast.success("Login realizado com sucesso!")
            navigate("/pagina-inicial");
            
        } catch (error) {
            console.log("Erro no login: ",error);
            toast.error("Email ou senha inválidos");
        }
    }
    
    const logout = () => {
        localStorage.removeItem("token");
        toast.info("Sessão finalizada");
        navigate("/tela-login");
    
    }
    return {login, logout};

      
}
export default useAuth;