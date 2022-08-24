/* Modules */
import {Navigate} from 'react-router-dom';

export default function AuthGuard({children}) {
    let isLogged = false;
    let token = localStorage.getItem("token");

    if(token) {
        isLogged = true;
    }

    if(!isLogged) {
        return <Navigate to="/login" />
    }

    return children
};