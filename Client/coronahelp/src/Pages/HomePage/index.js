import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { GetUser, Logout, Auth, GetAllUsers, DelUser } from "../../Utils/api";
import { Modal, Table, Card, Form, Row, Button } from 'react-bootstrap';
import useForceUpdate from 'use-force-update';
import "./Lading.css";

// import { Container } from './styles';

export default function HomePage() {
    const forceUpdate = useForceUpdate();
    let history = useHistory();
    const [show, setShow] = useState(false);
    const [showCall, setshowCall] = useState(false);

    const [User,setUser] = useState({email: "",nome: "", admin: ""});
    const [Users,setUsers] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseCall = () => setshowCall(false);
    const handleShowCall = () => setshowCall(true);

    useEffect(() => {
        let email = localStorage.getItem("userEmail");
        let token = localStorage.getItem("token");
        Auth(email,token)
        .then(res => {
            if(res.data.access == true){
                GetUser(email)
                .then(res => {
                    setUser({
                        email: res.data[0].email,
                        nome: res.data[0].nome,
                        admin: res.data[0].Ehadmin.data[0]
                    })
                    GetAllUsers()
                        .then(ResUsers => {
                            let usuarios = ResUsers.data;
                            console.log(usuarios)
                            setUsers(usuarios);
                            console.log(Users)
                        })
                })
            }else{
                throw "error";
            }
        })
        .catch(err => {
            alert("Você precisa estar logado para acessar essa pagina");
            history.push("/")
        })
    },[])

    const DeletarUsuario = async(email) => {
        await DelUser(email)
        .then(res => {
            alert("usuario deletado com sucesso");
            window.location.reload();
        })
        .catch(err => {
            alert("erro ao deletar usuario");
        })
    }

    const Sair = async(event) => {
        await Logout(User.email)
            .then(
                history.push("/")
            )
    }
  return(
      <div>
          <Modal className="ModalCallEmergency" size="lg" show={showCall} onHide={handleCloseCall}>
              <Card className="cardFormCall">
                  <Card.Title>Informe o Paciente:</Card.Title>
                <Form>
                    <Form.Group>
                        <Form.Label>Cpf:</Form.Label>
                        <Form.Control type="number" placeholder="Ex. xxx.xxx.xxx-xx"></Form.Control>
                        <Form.Label>Nome do Paciente:</Form.Label>
                        <Form.Control></Form.Control>
                        <Form.Group>
                            <Form.Label>Genero:</Form.Label>
                            <div style={{marginLeft: '1vw',display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Form.Check inline name="Genero" type="radio" label="Masculino" />
                                <Form.Check inline name="Genero" type="radio" label="Feminino" />
                                <Form.Check inline name="Genero" type="radio" label="Não desejo informar" />
                            </div>
                        </Form.Group>
                        <Form.Label>Data de Nascimento:</Form.Label>
                        <Form.Control></Form.Control>
                        <div className="PesoAltura">
                            <Form.Group>
                                <Form.Label>Peso:</Form.Label>
                                <Form.Control type="number" placeholder="ex. 98,5"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Altura:</Form.Label>
                                <Form.Control type="number" placeholder="ex. 1,87" ></Form.Control>
                            </Form.Group>
                        </div>
                        <Form.Label>Selecione os sintomas:</Form.Label>
                        <div style={{marginLeft: '1vw'}}>
                            <Form.Check label="Febre" />
                            <Form.Check label="Tosse Seca" />
                            <Form.Check label="Cansaço" />
                            <Form.Check label="Dificuldade de Respirar ou falta de ar" />
                            <Form.Check label="Dor ou pressão no peito" />
                            <Form.Check label="Perda de fala ou movimento" />
                        </div>
                    </Form.Group>
                    <Button type="submit">Fazer Chamado</Button>
                </Form>
              </Card>
          </Modal>
          <Modal size="lg" show={show} onHide={handleClose}>
              <Table style={{maxWidth: "70vw"}}>
                  <thead>
                      <tr>
                          <th>Nome</th>
                          <th>Email</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      {Users.map(user => (
                            <tr key={user.email}>
                              <td>{user.nome}</td>
                              <td>{user.email}</td>
                              <td>
                                  {User.email !== user.email ? (
                                      <button onClick={() => DeletarUsuario(user.email)}>Deletar</button>
                                  ) : (
                                      <button disabled >Deletar</button>
                                  )}
                                  
                              </td>
                            </tr>
                          )
                      )}
                  </tbody>
              </Table>
              <button style={{margin: '1vw 1vw',width: '30%'}} onClick={handleClose} >Fechar</button>
          </Modal>
        <div className="header">
            <div>
                CoronaHelpy
            </div>
            <div>
                <Button variant="link" onClick={Sair} >Sair</Button>
            </div>
        </div>
        <div className="FakeCard">
            <div>
                Bem Vindo {User.nome}
            </div>
            <div>
                {User.admin == 1 && (
                    <Button onClick={handleShow} >Painel de Administrador</Button>
                )}
            </div>
        </div>
        <div className="Conteudo" >
            <div className="BigButton" onClick={handleShowCall}>
                <span>Fazer Chamado</span>
            </div>
        </div>
      </div>
  );
}

