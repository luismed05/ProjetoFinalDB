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
            console.log("Erro ao consultar Planos");
            result.status(500).send({message: "erro ao consultar planos"})
            return false;
        }

        result.status(200).send({res});
    })
}

module.exports = PlanoSaude;