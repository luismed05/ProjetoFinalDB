const sql = require('../../DataBase/db.js');

const PlanoSaude = function(plano){
    this.codigo = plano.codigo,
    this.nome = plano.nome
};

var debug = false;

PlanoSaude.index = async (req,result) => {
    await sql.query('SELECT * FROM PlanoDeSaude;' , (err,res) => {
        if(err) {
            if(debug == true) console.log(err)
            console.log("[Planos de Saúde]  - Erro ao realizar consulta");
            result.status(500).send({message: "[Planos de Saúde]  - Erro ao realizar consulta"})
            return false;
        }
        result.status(200).send({res});
    })
}

PlanoSaude.create = async (req, result ) => {
    const novoPlano = req.body

    await sql.query("INSERT INTO PlanoDeSaude SET ?", novoPlano, (err,res) => {
        if(err) {
            if(debug == true) console.log(err)
            console.log("erro ao cadastrar Plano de Saúde");
            result.status(500)
            return
        }
        console.log("Plano de Saúde cadastrado com sucesso");
        result.status(200).send({id: res.id, ...novoHosp});
    })
}

PlanoSaude.show = (req,result) => {
    const codigo = req.params.codigo
    sql.query(`SELECT * FROM PlanoSaude WHERE codigo = "${codigo}"`, (err,res) => {
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

PlanoSaude.update = async (req, result) => {
    const codigo = req.params.codigo;
    const plano_params = req.body.plano;
    
    await sql.query('UPDATE PlanoDeSaude SET ? WHERE codigo = ?', [plano_params, codigo], (err, res) =>{
        if(err){
            if(debug == true) console.log(err)
            console.log("[Plano de Saúde] - Erro na atualização");
            result.status(500).send({message: "[Plano de Saúde] - Erro na atualizaçãoe"});
        }
        else{
            console.log("[Plano de Saúde] - Atualizado com sucesso");
            result.status(200).send(res);
        }
    })
}

PlanoSaude.delete = (req,result) => {
    const codigo = req.params.codigo;

    sql.query("DELETE FROM PlanoDeSaude WHERE codigo = ?",codigo, (err,res) => {
        if(err){
            console.log("[Plano de Saúde] - erro ao limpar tabela");
            result.status(500)
            return
        }

        console.log("[Plano de Saúde] Dado deletado com sucesso");
        result.status(200).send({message: "Dados Deletados"})
    })
}

module.exports = PlanoSaude;