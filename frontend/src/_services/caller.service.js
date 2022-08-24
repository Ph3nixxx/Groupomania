/* Module */
import axios from 'axios';

/* Dépendances */
import Logout from '../components/Logout';

const Axios = axios.create({
    baseURL: 'http://localhost:4200',
    headers: {
        Authorization : `Bearer ${localStorage.getItem("token")}`
}})

/* Interceptor si token expiré */

Axios.interceptors.response.use(response => {
    return response
}, error => {
    console.log(error);
    if(error.response.status === 401){
        Logout()
        window.location = "/login"
    } else {
        return Promise.reject(error)
    }
})

export default Axios;