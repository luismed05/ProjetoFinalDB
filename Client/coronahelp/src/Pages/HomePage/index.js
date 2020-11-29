import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GetUser, 
        Logout, 
        Auth, 
        GetAllUsers, 
        getPlanos, 
        DelUser,
        makethecall 
    } from "../../Utils/api";
import { Modal, Table, Card, Form, Row, Button } from 'react-bootstrap';
import useForceUpdate from 'use-force-update';
import "./Lading.css";

// import { Container } from './styles';

export default function HomePage() {
    const forceUpdate = useForceUpdate();
    let history = useHistory();

    //States de controle de modals
    const [show, setShow] = useState(false);
    const [showCall, setshowCall] = useState(false);

    const [User,setUser] = useState({email: "",nome: "", admin: ""});
    const [Users,setUsers] = useState([]);
    const [Planos, setPlanos] = useState([]);

    //State de Paciente
    const [Genero, setGenero] = useState("");
    const [Cpf, setCpf] = useState("");
    const [Nome, setNome] = useState("");
    const [Data, setData] = useState("");
    const [Peso, setPeso] = useState("");
    const [Altura, setAltura] = useState("");
    const [Sintomas, setSintomas] = useState("");
    const [Urgencia, setUrgencia] = useState("");
    const [Localizacao, setLocalizacao] = useState("");

    //State para criação de atendimento
    const [PlanoSaude, setPlanoSaude] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseCall = () => {
        setNome("");
        setData("");
        setPeso("");
        setAltura("");
        setSintomas("");
        setUrgencia("");
        setshowCall(false);
    };
    const handleShowCall = () => setshowCall(true);

    useEffect(() => {
        let email = localStorage.getItem("userEmail");
        let token = localStorage.getItem("token");
        Auth(email,token)
        .then(res => {
            navigator.geolocation.getCurrentPosition( (pos) => {
                setLocalizacao(`${pos.coords.latitude}#${pos.coords.latitude}`)
            });
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
                            setUsers(usuarios);
                        })
                    getPlanos()
                        .then(resPlanos => {
                          let planos = resPlanos.data.res;
                          setPlanos(planos); 
                          
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

    const GetGenero = (event) => {
        setGenero(event.target.value);
    }

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

    const checked = async(event) => {
        if(event.target.checked){
            setSintomas(`${Sintomas}#${event.target.value}`);
        }else{
            let arr = (Sintomas.split(`#${event.target.value}`));
            setSintomas([]);
            let sintomas = "";
            for (let i = 0;i < arr.length; i++){
                sintomas = `${sintomas}${arr[i]}`
            }
            setSintomas(sintomas);
        }
    }

    const CadPaciente = async() => {

    }

    const SendAtendimento = async(event) => {
        event.preventDefault();
        console.log(Sintomas);
        console.log(Urgencia);
        console.log(PlanoSaude);
        await CadPaciente;

        var call = {
            paciente_cpf: Cpf,
            localizacao_paciente: Localizacao,
            plano_saude_pacienteCod: PlanoSaude,
            Urgencia: Urgencia,
            email_user: User.email,
            data_inicio: new Date
        }
        makethecall()
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
                <Form onSubmit={SendAtendimento}>
                    <Form.Group>
                        <Form.Label>Cpf:</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Ex. 11111111111"
                            onChange={(event => setCpf(event.target.value))}
                        ></Form.Control>
                        <Form.Label>Nome do Paciente:</Form.Label>
                        <Form.Control
                            onChange={(event => setNome(event.target.value))}
                        ></Form.Control>
                        <Form.Group>
                            <Form.Label>Genero:</Form.Label>
                            <div onChange={GetGenero} style={{marginLeft: '1vw',display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Form.Check inline name="Genero" type="radio" value="Masculino" label="Masculino" />
                                <Form.Check inline name="Genero" type="radio" value="Feminino" label="Feminino" />
                                <Form.Check inline name="Genero" type="radio" value="Não desejo informar" label="Não desejo informar" />
                            </div>
                        </Form.Group>
                        <Form.Label>Data de Nascimento:</Form.Label>
                        <Form.Control onChange={(event => setData(event.target.value))} type="date"></Form.Control>
                        <div className="PesoAltura">
                            <Form.Group>
                                <Form.Label>Peso:</Form.Label>
                                <Form.Control 
                                    step="0.01" 
                                    type="number" 
                                    placeholder="ex. 98,5"
                                    onChange={(event => setPeso(event.target.value))}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Altura:</Form.Label>
                                <Form.Control 
                                    step="0.01" 
                                    type="number" 
                                    placeholder="ex. 1,87" 
                                    onChange={(event => setAltura(event.target.value))}    
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <Form.Label>Urgencia:</Form.Label>
                        <Form.Control as='select' onChange={(event => setUrgencia(event.target.value))}>
                            <option value="baixa">Baixa</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </Form.Control>
                        <Form.Label>Selecione os sintomas:</Form.Label>
                        <div style={{marginLeft: '1vw'}}>
                            <Form.Check 
                                label="Febre" 
                                value="Febre" 
                                onChange={(event => checked(event))}
                            />
                            <Form.Check 
                                label="Tosse Seca" 
                                value="Tosse Seca" 
                                onChange={(event => checked(event))}
                            />
                            <Form.Check 
                                label="Cansaço" 
                                value="Cansaço" 
                                onChange={(event => checked(event))}
                            />
                            <Form.Check 
                                label="Dificuldade de Respirar ou falta de ar" 
                                value="Dificuldade de Respirar ou falta de ar" 
                                onChange={(event => checked(event))}
                            />
                            <Form.Check 
                                label="Dor ou pressão no peito" 
                                value="Dor ou pressão no peito" 
                                onChange={(event => checked(event))}
                            />
                            <Form.Check 
                                label="Perda de fala ou movimento" 
                                value="Perda de fala ou movimento" 
                                onChange={(event => checked(event))}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><strong>Escolha o plano de saude</strong></Form.Label>
                        <Form.Control as='select' onChange={(event => setPlanoSaude(event.target.value))} style={{width: '30%'}}>
                            {Planos.map(plano => (
                                <option key={plano.codigo} value={plano.codigo}>{plano.nome}</option>
                            ))}
                        </Form.Control>
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
                CoronaHelp
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

