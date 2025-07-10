import {Navigate, Outlet} from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';



const ProtectedRoute = () =>{
    const { user} = useAuthContext();

    const isAdmin = user?.perfil === 'adm';

    return isAdmin ? <Outlet/> : <Navigate to="tela-login"/>

}

export default ProtectedRoute;