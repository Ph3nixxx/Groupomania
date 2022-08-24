/* Dépendances */
import Axios from './caller.service';

function getOneUser(id) {
    return Axios.get('/api/auth/user/'+id)
}

function login(data) {
    return Axios.post('/api/auth/login', data)
}

function signup(data) {
    return Axios.post('/api/auth/signup', data, 
    { headers: {
        'Content-Type': 'multipart/form-data'
    }})
}

function updateProfil(id, data) {
    return Axios.put('/api/auth/update/'+id, data,
    { headers: {
        'Content-Type': 'multipart/form-data'
    }})
}

export const accountService = {
    getOneUser, login, signup, updateProfil
};