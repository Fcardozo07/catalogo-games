import { createContext, useCallback, useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import api from "../services/axios";

interface IUser{
  id: number;
  nome: string;
  email: string;
  perfil: string
}

interface IAuthContextData{
    user: IUser | null;
    login: (email: string, senha: string) => Promise<void>;
    logout: () => void
    isAuthenticated: boolean;
}


const AuthContext = createContext({} as IAuthContextData);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post("/tokens", { email, password });

      const { token } = response.data;

      // Salvar token
      localStorage.setItem("token", token);

      // Buscar dados do usuário logado
      const userResponse = await api.get("/users/me"); // <-- vamos configurar no backend
      const { id, nome, email: userEmail, perfil } = userResponse.data;

      setUser({ id, nome, email: userEmail, perfil });

      toast.success("Login realizado com sucesso!");
      navigate("/pagina-inicial");
    } catch (error: any) {
      console.error("Erro no login:", error);
      toast.error("Email ou senha inválidos");
    }
  }, [navigate]);


    const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("Sessão encerrada");
    navigate("/tela-login");
  }, [navigate]);

 useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Recuperar dados ao recarregar a página
      api.get("/users/me")
        .then((response) => {
          const { id, nome, email, perfil } = response.data;
          setUser({ id, nome, email, perfil });
        })
        .catch(() => {
          logout();
        });
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);


