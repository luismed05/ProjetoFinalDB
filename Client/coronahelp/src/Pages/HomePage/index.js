import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GetUser, 
        Logout, 
        Auth, 
        GetAllUsers, 
        getPlanos, 
        DelUser,
        makethecall,
        getPaciente,
        updatePaciente,
        cadPaciente,
        checkAtendimento,
        getHospitais,
        DelHospital,
        getAtendimentos,
        finalizarAtt
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
    const [showPanel, setShowPanel] = useState(false);
    const [showListAtt, setShowListAtt] = useState(false);
    const [showHospitais, setShowHospitais] = useState(false);

    const [User,setUser] = useState({email: "",nome: "", admin: ""});
    const [Users,setUsers] = useState([]);
    const [Hospitais,setHospitais] = useState([]);
    const [Planos, setPlanos] = useState([]);
    const [Atendimentos, setAtendimentos] = useState([]);

    //State de Paciente
    const [Genero, setGenero] = useState("");
    const [Cpf, setCpf] = useState("");
    const [Nome, setNome] = useState("");
    const [Data, setData] = useState("");
    const [Peso, setPeso] = useState("");
    const [Altura, setAltura] = useState("");
    const [Sintomas, setSintomas] = useState("");
    const [Urgencia, setUrgencia] = useState("baixa");
    const [Localizacao, setLocalizacao] = useState("");
    const [Endereco, setEndereco] = useState("");

    //State change component
    const [ShowAtt, setShowAtt] = useState(false);

    //State de Atendimento
    const [CodigoAtt, setCodigoAtt] = useState("");
    const [MedicoRes, setMedicoRes] = useState("");
    const [PlacaAmb, setPlacaAmb] = useState("");
    const [UrgenciaAtt, setUrgenciaAtt] = useState("");

    //State para criação de atendimento
    const [PlanoSaude, setPlanoSaude] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseHospitais = () => setShowHospitais(false);
    const handleShowHospitais = () => setShowHospitais(true);

    const handleCloseListAtt = () => setShowListAtt(false);
    const handleShowListAtt = () => setShowListAtt(true);

    const handleClosePanel = () => setShowPanel(false);
    const handleShowPanel = () => setShowPanel(true);

    const handleCloseCall = () => {
        setNome("");
        setData(null);
        setPeso("");
        setAltura("");
        setSintomas("");
        setUrgencia("");
        setEndereco("");
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
            if(res.data.access === true){
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
                    checkAtendimento(email)
                        .then(resAtt => {
                            console.log(resAtt);
                            setShowAtt(true);
                            setshowCall(false);
                            let att = resAtt.data.resSelect[0];
                            setCodigoAtt(att.Codigo_do_atendimento);
                            setPlacaAmb(att.Placa_da_Ambulancia);
                            setMedicoRes(att.Medico_Responsavel);
                            setUrgenciaAtt(att.Urgencia_de_Atendimento); 
                        })
                        .catch(err => console.log(err));
                    getHospitais()
                        .then(resHospi => {
                            let hospitais = resHospi.data;
                            setHospitais(hospitais);
                        })
                    getAtendimentos()
                        .then(resAtendimentos => {
                            let atendimentos = resAtendimentos.data.res;
                            console.log(atendimentos)
                            setAtendimentos(atendimentos);
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

    const CadPaciente = async(event) => {
        const paciente = {
            cpf: Cpf,
            nome: Nome,
            genero: Genero,
            data_de_nascimento: Data,
            peso: Peso,
            altura: Altura, 
            sintomas: Sintomas
        }
        //console.log(paciente);
        await getPaciente(Cpf).then(res=>{
            console.log(res);
            updatePaciente(Cpf, paciente);
        }).catch(err => {
            if(err.response.status === 404){
                cadPaciente(paciente).then(res=>{
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
            }
            else{
                console.log(err);
            }
        })
    }

    const FinalizarAtt = async(id) => {
        finalizarAtt(id)
            .then(res => {alert('Atendimento Finalizado')})
            .catch(err => console.log(err))
    }

    const DeletarHospital = async(id) => {
        DelHospital(id)
            .then(res=> 
                {alert("Hospital deletado")})
            .catch(err => 
                {alert("Erro ao deletar")})
    }

    const SendAtendimento = async(event) => {
        event.preventDefault();
       CadPaciente(event)
        .then(res=>{
            const call = {
                paciente_cpf: Cpf,
                localizacao_paciente: Localizacao,
                plano_saude_pacienteCod: PlanoSaude,
                Urgencia: Urgencia,
                email_user: User.email,
                endereco_paciente: Endereco,
                data_inicio: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }
            makethecall(call)
            .then(resCall => {
                setShowAtt(true);
                setshowCall(false);
                console.log(resCall);
                let att = resCall.data.resSelect[0];
                setCodigoAtt(att.Codigo_do_atendimento);
                setPlacaAmb(att.Placa_da_Ambulancia);
                setMedicoRes(att.Medico_Responsavel);
                setUrgenciaAtt(att.Urgencia_de_Atendimento); 
            } )
        });
    }

    const Sair = async(event) => {
        await Logout(User.email)
            .then(
                history.push("/")
            )
    }
  return(
      <div>
          <Modal id="FazerChamado" className="ModalCallEmergency" size="lg" show={showCall} onHide={handleCloseCall}>
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
                        <Form.Label>Endereço do Paciente:</Form.Label>
                        <Form.Control
                            onChange={(event => setEndereco(event.target.value))}
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
                            <option></option>
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
          <Modal id="Listar Usuarios" size="lg" show={show} onHide={handleClose}>
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
                                      <Button onClick={() => DeletarUsuario(user.email)}>Deletar</Button>
                                  ) : (
                                      <Button disabled >Deletar</Button>
                                  )}
                                  
                              </td>
                            </tr>
                          )
                      )}
                  </tbody>
              </Table>
              <Button style={{width: "fit-content", margin: "6px"}} onClick={handleClose} >Fechar</Button>
          </Modal>
          <Modal id="PaineldoAdministrador" show={showPanel} onHide={handleClosePanel}>
            <button onClick={handleShow}>Lista de Usuarios</button>
            <button onClick={handleShowListAtt}>Lista de Atendimentos</button>
            <button onClick={handleShowHospitais}>Lista de Hospitais</button>
          </Modal>
          <Modal id="ListarHospitais" size="lg" show={showHospitais} onHide={handleCloseHospitais}>
            <Table style={{maxWidth: "70vw"}}>
                  <thead>
                      <tr>
                          <th>Nome</th>
                          <th>Endereço</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      {Hospitais.map(hospital => (
                            <tr key={hospital.id}>
                              <td>{hospital.nome}</td>
                              <td>{hospital.endereco}</td>
                              <td>
                                <Button onClick={() => DeletarHospital(hospital.id)}>Deletar</Button>
                              </td>
                            </tr>
                          )
                      )}
                  </tbody>
              </Table>
          </Modal>
          <Modal id="ListarAtendimentos" size="lg" show={showListAtt} onHide={handleCloseListAtt}>
            <Table style={{maxWidth: "70vw"}}>
                  <thead>
                      <tr>
                          <th>Codigo</th>
                          <th>Urgencia</th>
                          <th>Email do Usuario</th>
                          <th>Data de Inicio</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      {Atendimentos.map(att => (
                          <tr key={att.id}>
                          <td>{att.id}</td>
                          <td>{att.Urgencia}</td>
                          <td>{att.usuario_email}</td>
                          <td>{att.data_inicio.substr(0,10)}</td>
                          <td>
                            <Button onClick={() => FinalizarAtt(att.id)}>Finalizar</Button> 
                          </td>
                        </tr> 
                          )
                      )}
                  </tbody>
              </Table>
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
                Bem-vindx, {User.nome}!
            </div>
            <div>
                {User.admin === 1 && (
                    <Button onClick={handleShowPanel} >Painel de Administrador</Button>
                )}
            </div>
        </div>
        <div className="Conteudo" >
            {ShowAtt == false ? (
                <div className="BigButton" onClick={handleShowCall}>
                <span>Fazer Chamado</span>
            </div>
            ) : (
                <Card>
                    <Card.Title>Detalhes de Atendimento</Card.Title>
                    <Card.Body>
                        <Form>
                            <Form.Label>Codigo do Atendimento</Form.Label>
                            <Form.Control disabled value={CodigoAtt}/>
                            <Form.Label>Placa da Ambulancia</Form.Label>
                            <Form.Control disabled value={PlacaAmb}/>
                            <Form.Label>Medico Responsavel pelo Atendimento</Form.Label>
                            <Form.Control disabled value={MedicoRes}/>
                            <Form.Label>Urgencia do atendimento</Form.Label>
                            <Form.Control disabled value={UrgenciaAtt}/>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </div>
      </div>
  );
}

