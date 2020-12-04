const sql = require('../../DataBase/db.js');

const Usuario = function(usuario){
    this.email = usuario.email,
    this.senha = usuario.senha,
    this.nome = usuario.nome,
    this.token = usuario.tokenAcesso,
    this.admin = usuario.Ehadmin
};

var debug = false;

//Metodo da Contoller para trazer todos os usuarios cadastrados
Usuario.index = async (req, result) => {
    await sql.query("SELECT * FROM Usuario", (err,res) => {
        if(err){
            if(debug == true) console.log(err)
            console.log('[Usuário] - Erro ao realizar consulta');
            result.status(500).send({message: "[Usuário] - Erro ao realizar consulta"});
            return false;
        }
        console.log("[Usuário] - Consulta realizada com sucesso");
        result.status(200).send(res)
    })
}

//Metodo para autenticar usuario
Usuario.login = async (req,result) => {
    let body = req.body
    let email = body.email
    let senha = body.senha
    await sql.query(`SELECT * FROM Usuario WHERE email = "${email}"`, (err,res) => {
        if(err){
            if(debug == true) console.log(err)
            console.log("Erro ao consultar usuario");
            result.status(500).send({message: "erro ao consultar usuario"});
            return
        }
        if(res.length === 0){
            console.log("Usuario não existe");
            result.status(404).send({message: "Usuario nao existe"});
            return
        }
        if(debug == true) console.log(res)
        if(senha == res[0].senha){
            let token = Math.random() * (99999999 - 11111111) + 11111111;
            sql.query(`UPDATE Usuario SET tokenAcesso = "${token}" WHERE email = "${email}"`, (errToken,resToken) => {
                if(errToken){
                    if(debug == true) console.log(errToken);
                    console.log("Erro ao inserir token na tabela");
                    result.status(500).send({message: "Erro interno"});
                }
                result.status(202).send({token: String(token)});
            })
        }else{
            result.status(500).send({message: "Senha não corresponde ao email de usuario"})
        }        
    })
}

//Metodo para verificar autenticação do usuario
Usuario.auth = async (req,result) => {
    let body = req.body
    await sql.query(`SELECT tokenAcesso FROM Usuario WHERE email = "${body.email}"`, (err,res) => {
        if(err){
            if(debug == true) console.log(err)
            console.log("[Usuário] - Erro ao consultar");
            result.status(500).send({message: "[Usuário] - Erro ao consultar"});
        }

        if(debug == true) console.log(res)

        if(res.length === 0){
            console.log("Usuario não existe");
            result.status(404).send({message: "Usuario nao existe"});
            return
        }

        if(res[0].tokenAcesso == "NULL") {
            result.status(500).send({message: "Usuario não esta autenticado"});
        }

        if(body.token == res[0].tokenAcesso){
            result.status(200).send({ access: true })
        }else{
            Usuario.logout;
        }

    })
}

//Metodo para Deslogar usuario
Usuario.logout = async (req,result) => {
    let body = req.body
    await sql.query(`UPDATE Usuario SET tokenAcesso = "NULL" WHERE email = "${body.email}"`, (err,res) => {
        if(err){
            if(debug == true) console.log(err)
            console.log("[Usuário] - Erro ao atualizar tabela");
            result.status(500).send({message: "erro ao deslogar usuario"});
        }

        result.status(200).send({message: "[Usuário] - Desconectado com sucesso"})
    })
}

//Metodo da Controller para trazer dados de apenas um usuario
Usuario.show = async (req,result) => {
    let email = req.params.email

    await sql.query(`SELECT * FROM Usuario WHERE email = "${email}"`, (err,res) => {
        if(err){
            if(debug == true) console.log(err)
            console.log("[Usuário] - Erro ao realizar consulta");
            result.status(500).send({message: "[Usuário] - Erro ao realizar consulta"});
        }

        console.log("[Usuário] - Consulta realizada com sucesso");
        result.status(200).send(res);
    })
}

//Metodo da Controller para criar um novo usuario
Usuario.create = async (req, result) => {
    let novoProp = req.body.user
    //Comandos DML para fazer inserção do usuario na tabela
    await sql.query("INSERT INTO Usuario SET ?", novoProp, (err,res) => {
        if(err) {
            if(debug == true) console.log(err)
            console.log("[Usuário] - Erro ao cadastrar");
            result.status(500).send({message: "[Usuário] - Erro ao cadastrar"})
            return false;
        }
        
        console.log("[Usuário] - Cadastrado com sucesso");
        result.status(200).send({email: res.email, ...novoProp});
    })
}

//Metodo da Controller para deletar linha de usuario
Usuario.delete = async (req,result) => {
    let email = req.params.email;
    await sql.query(`DELETE FROM Usuario WHERE email = "${email}"`, (err,res) => {
        if(err) {
            if(debug == true) console.log(err)
            console.log("[Usuário] - Erro ao remover");
            result.status(500).send({message: "[Usuário] - Erro ao deletar"})
            return false;
        }

        console.log("[Usuário] - Removido com sucesso");
        result.status(200).send({message: "[Usuário] - Deletado com sucesso"});
    })
}

module.exports = Usuario;