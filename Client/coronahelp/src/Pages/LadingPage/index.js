import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { GetUser, Logout, Auth, GetAllUsers, DelUser } from "../../Utils/api";
import { Modal, Table } from 'react-bootstrap';
import useForceUpdate from 'use-force-update';
import "./Lading.css";

// import { Container } from './styles';

export default function LadingPage() {
    const forceUpdate = useForceUpdate();
    let history = useHistory();
    const [show, setShow] = useState(false);

    const [User,setUser] = useState({email: "",nome: "", admin: ""});
    const [Users,setUsers] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let email = localStorage.getItem("userEmail");
        let token = localStorage.getItem("token")
        Auth(email,token)
        .then(res => {
            if(res.data.access == true){
                console.log(res)
                GetUser(email)
                .then(res => {
                    console.log(res)
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
            console.log(res)
            alert("usuario deletado com sucesso");
            window.location.reload();
        })
        .catch(err => {
            console.log(err.data)
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
      <div className="container">
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
              <button onClick={handleClose} >Fechar</button>
          </Modal>
          {User.email}
          {User.nome}
          {User.admin == 1 && (
              <button onClick={handleShow} >Painel de Administrador</button>
          )}
          
          <button onClick={Sair} >Sair</button>
      </div>
  );
}

