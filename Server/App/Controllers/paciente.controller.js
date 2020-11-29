const sql = require('../../DataBase/db.js');

const Paciente = function(paciente){
    this.cpf = paciente.cpf,
    this.genero = paciente.genero,
    this.nome = paciente.nome,
    this.peso = paciente.peso,
    this.altura = paciente.altura
    this.sintomas = paciente.sintomas
};

Paciente.create = async (req,result) => {
    let novoPaciente = req.body.paciente

    await sql.query("INSERT INTO Paciente SET ?", novoPaciente, (err,res) => {
        if(err){
            if(debug == true) console.log(err)
            console("erro ao cadastrar paciente");
            result.status(500).send({ message: "erro ao cadastrar paciente"});
            return false;
        }

        console.log("Usuario Cadastrado com sucesso");
        result.status(200).send({cpf: novoPaciente.cpf});
    })
}

module.exports = Paciente;