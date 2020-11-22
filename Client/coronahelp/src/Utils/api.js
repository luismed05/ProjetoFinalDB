import axios from 'axios';

var api = axios.create({
    baseURL: 'http://localhost:3001',
}) 


export const login = (email,senha) => {
    return api.post('/Signin', { email, senha });
} 

export const Cadastro = (user) => {
    return api.post('/SignUp', { user });
}

export const Auth = (email, token) => {
    return api.post('/auth' , { email , token})
}

export const GetUser = (email) => {
    return api.get(`/user/${email}`);
}

export const GetAllUsers = () => {
    return api.get("/users");
}

export const DelUser = (email) => {
    return api.delete(`/user/${email}`);
}

export const Logout = (email) => {
    return api.post('/SignOut', { email });
}