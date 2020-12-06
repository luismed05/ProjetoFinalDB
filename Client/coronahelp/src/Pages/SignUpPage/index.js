import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Cadastro } from '../../Utils/api';
import { Form } from 'react-bootstrap';
import "./SignUp.css";

// import { Container } from './styles';

function SignUpPage() {
    const history = useHistory();

    const [ Nome, setNome ] = useState("");
    const [ Email, setEmail ] = useState("");
    const [ Password, setPassword ] = useState("");
    const [ ConfirmPassword, setConfirmPassword ] = useState("");


    const SignUp = async (event) => {
      event.preventDefault();
      console.log(Email, Password,Nome,ConfirmPassword);
      if(Password !== ConfirmPassword){
        alert("Senhas não coincidem");
        setConfirmPassword("");
        return false;
      }
      var user = {
        nome: Nome,
        email: Email,
        senha: Password
      }
      Cadastro(user)
        .then(res => {
          alert("Usuario cadastrado com sucesso");
          history.push("/")
        })
        .catch(err => {
          console.log(err.data);
          alert("Erro ao cadastrar usuarion tente novamente mais tarde");
          document.getElementsByClassName("form").reset();
        })
    }

    return (
      <>
        <div className="pageCad">
            <Form className="form" onSubmit={SignUp} >
                <Form.Label htmlFor="nome">Nome Completo:</Form.Label>
                <Form.Control 
                    required
                    autocomplete="off"
                    onChange={event => (setNome(event.target.value))} 
                    name="nome"
                />
                <Form.Label htmlFor="email">Email:</Form.Label>
                <Form.Control type="text"
                    required
                    autocomplete="off"
                    onChange={event => (setEmail(event.target.value))}
                    name="email"
                />
                <Form.Label htmlFor="senha">Senha:</Form.Label>
                <Form.Control type="password"
                    required
                    autocomplete="off"
                    onChange={event => (setPassword(event.target.value))}
                    name="senha"
                />
                <Form.Label htmlFor="Confirmsenha">Confirme sua senha:</Form.Label>
                <Form.Control type="password"
                    required
                    autocomplete="off"
                    onChange={event => (setConfirmPassword(event.target.value))}
                    isInvalid={ConfirmPassword !== Password}
                    value={ConfirmPassword}
                    name="Confirmsenha"
                    feedback="Senhas devem coincidir"
                />
                <button type="submit">Cadastrar</button>
            </Form>
        </div>
      </>
  );
}

export default SignUpPage;