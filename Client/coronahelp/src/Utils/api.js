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
    return api.get('/planos');
}

export const showPlano = (codigo) => {
    return api.get(`/planos/${codigo}`);
}

export const updatePlano = (codigo, plano) => {
    return api.put(`/planos/${codigo}`, {plano});
}

export const deletePlano = (codigo) => {
    return api.delete(`/planos/${codigo}`);
}

export const createPlano = (plano) => {
    return api.post('/planos', {plano});
}

export const makethecall = (call) => {
    return api.post('/atendimentos', {call});
}

export const finalizarAtt = (id) => {
    return api.delete(`/atendimentos/${id}`);
}

export const checkAtendimento = (email) => {
    return api.get(`/atendimentos/${email}`);
}

export const getAtendimentos = () => {
    return api.get('atendimentos');
}