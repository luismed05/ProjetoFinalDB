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

export const cadPaciente = (paciente) => {
    return api.post('/paciente', {paciente});
}

export const updatePaciente = (cpf, paciente) => {
    return api.put(`/paciente/${cpf}` , {paciente});
}

export const getPaciente = (cpf) => {
    return api.get(`/paciente/${cpf}`);
}

export const getPlanos = () => {
    return api.get('/getPlanos');
}

export const makethecall = (call) => {
    return api.post('/callAmbulance', {call});
}

export const finalizarAtt = (id) => {
    return api.delete(`/finalizarAtt/${id}`);
}