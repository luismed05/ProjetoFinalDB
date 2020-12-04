const sql = require('../../DataBase/db.js');

const Hospital = function(hospital){
    this.Cpf = hospital.id,
    this.nome = hospital.nome,
    this.localizacao = hospital.localizacao,
    this.endereco = hospital.endereco
};

var debug = true;

Hospital.create = async (req, result ) => {

    let novoHosp = req.body

    //fazer pesquisa no banco de proprietario pelo cpf
    await sql.query("INSERT INTO Hospital SET ?", novoHosp, (err,res) => {
        if(err) {
            if(debug == true) console.log(err)
            console.log("erro ao cadastrar Hospital");
            result.status(500)
            return
        }
        
        console.log("Hospital Cadastrado com sucesso");
        result.status(200).send({id: res.id, ...novoHosp});
    })
}

Hospital.index = (req,result) => {
    console.log("fazendo consulta na tabela");
    sql.query("SELECT * FROM Hospital", (err,res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
      
        result.status(200).send(res);
    });
};

Hospital.show = (req,result) => {
    let id = req.params.id
    sql.query(`SELECT * FROM Hospital WHERE id = "${id}"`, (err,res) => {
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


Hospital.update = async (req, result) => {
    const id = req.params.id;
    const hospital_params = req.body.hospital;
    
    await sql.query('UPDATE Hospital SET ? WHERE id = ?', [hospital_params, id], (err, res) =>{
        if(err){
            if(debug == true) console.log(err)
            console.log("[Hospital] - Erro na atualização");
            result.status(500).send({message: "[Hospital] - Erro na atualizaçãoe"});
        }
        else{
            console.log("[Hospital] - Atualizado com sucesso");
            result.status(200).send(res);
        }
    })
}

Hospital.delete = (req,result) => {
    const id = req.params.id;

    sql.query("DELETE FROM Hospital where id = ?",id, (err,res) => {
        if(err){
            console.log("[Hospital] - erro ao limpar tabela");
            result.status(500)
            return
        }

        console.log("[Hospital] Dado deletado com sucesso");
        result.status(200).send({message: "Dados Deletados"})
    })
}

module.exports = Hospital;