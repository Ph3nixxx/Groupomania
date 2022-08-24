/* Dépendances */
import Axios from './caller.service';

function getAllPosts() {
    return Axios.get('api/posts')
}

function getOnePost(id) {
    return Axios.get('api/posts/'+id)
}

function createPost(data) {
    return Axios.post('/api/posts', data, 
    { headers: {
        'Content-Type': 'multipart/form-data'
    }})
}

function updatePost(id, data) {
    return Axios.put('/api/posts/'+id, data,
    { headers: {
        'Content-Type': 'multipart/form-data'
    }})
}

function deletePost(id) {
    return Axios.delete('/api/posts/'+id)
}

function likePost(id, data) {
    return Axios.post('/api/posts/'+id+'/like', data)
}

export const postsService = { 
    getAllPosts, getOnePost, createPost, updatePost, deletePost, likePost
};