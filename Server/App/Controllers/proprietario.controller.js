const sql = require('../../DataBase/db.js');

const Proprietario = function(proprietario){
    this.Cpf = proprietario.Cpf,
    this.nome = proprietario.nome,
    this.endereco = proprietario.endereco,
    this.bairro = proprietario.bairro,
    this.cidade = proprietario.cidade,
    this.estado = proprietario.estado,
    this.telefone = proprietario.telefone,
    this.sexo = proprietario.sexo,
    this.date = proprietario.date,
    this.age = proprietario.age
};

var debug = true;

Proprietario.create = async (req, result ) => {

    let novoProp = req.body

    //fazer pesquisa no banco de proprietario pelo cpf
    await sql.query("INSERT INTO proprietario SET ?", novoProp, (err,res) => {
        if(err) {
            if(debug == true) console.log(err)
            console.log("erro ao cadastrar Proprietario");
            result.status(500)
            return
        }
        
        console.log("Proprietario Cadastrado com sucesso");
        result.status(200).send({Cpf: res.Cpf, ...novoProp});
    })
}

Proprietario.index = (req,result) => {
    console.log("fazendo consulta na tabela");
    sql.query("SELECT * FROM proprietario", (err,res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
      
        result.status(200).send(res);
    });
};

Proprietario.show = (req,result) => {
    let placa = req.params.placa
    sql.query(`SELECT * FROM proprietario WHERE Cpf = "${Cpf}"`, (err,res) => {
        if(err){
            console.log("error: ", err);
            result.status(500).send(err);
            return
        }

        console.log("Consulta realizada com sucesso")

        if(res.length){
            result.status(200).send(res[0]);
            return
        }

        result.status(404).send({message: "Nao encontrado"});
        
    })
}

Proprietario.deleteAll = (req,result) => {
    sql.query("DELETE FROM proprietario", (err,res) => {
        if(err){
            console.log("erro ao limpar tabela");
            result.status(500)
            return
        }

        console.log("Limpeza da tabela de proprietarios concluida")
        result.status(200).send({message: "Dados Deletados"})
    })
}

module.exports = Proprietario;