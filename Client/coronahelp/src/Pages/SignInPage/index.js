import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../Utils/api';
import './SignIn.css';

// import { Container } from './styles';

export default function SignInPage() {

    let history = useHistory();

    const [ Email, setEmail ] = useState("");
    const [ Password, setPassword ] = useState("");


    const auth = async (event) => {
        event.preventDefault();
        console.log(Email, Password)
        await login(Email,Password)
        .then(res => {

            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userEmail', Email);
            

            history.push("/home")
        })
        .catch(err => {
            console.log(err.response.status)
            let statusCode = err.response.status;
            if( statusCode == 404 ) alert("Usuario não cadastrado");
        })
    }

    return (
      <>
        <div className="page">
            <form className="form" onSubmit={auth}>
                <label htmlFor="email">Email:</label>
                <input type="text"
                    onChange={event => (setEmail(event.target.value))} 
                    name="email"
                />
                <label htmlFor="senha">Senha:</label>
                <input type="password"
                    onChange={event => (setPassword(event.target.value))}
                    name="senha"
                />
                <button type="submit">Entrar</button>
                <span>Ainda não tem conta?</span>
                <Link to="/Cadastrar">
                    Clique aqui para se Cadastrar
                </Link>
            </form>
        </div>
      </>
  );
}