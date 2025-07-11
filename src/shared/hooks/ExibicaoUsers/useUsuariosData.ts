import { useEffect, useState} from "react"
import {Usuario} from "../../types/Cadastro_Usuario/types";
import api from "../../services/axios";

export const useUsuariosData = () =>{

const [users, setUsers] = useState<Usuario[]>([])
  
useEffect(()=>{
async function fetchUsers(){
    try {
        const response = await api.get('/users')
        setUsers(response.data)
        console.log(response.data)
        
    } catch (error) {
        console.log(error)
    }
}
fetchUsers()
},[])

const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este usuário?')
    if (!confirmDelete) {
        return;
    }

    try {
        await api.delete(`/users/${id}`);
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
    } catch (error) {
        console.log("Erro ao excluir usuário",error);
    }
    
}


return {users, setUsers, handleDelete}
}


export default useUsuariosData


