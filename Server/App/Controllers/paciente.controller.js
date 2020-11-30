const sql = require('../../DataBase/db.js');

const Paciente = function(paciente){
    this.cpf = paciente.cpf,
    this.genero = paciente.genero,
    this.nome = paciente.nome,
    this.peso = paciente.peso,
    this.altura = paciente.altura
    this.sintomas = paciente.sintomas
};

var debug = true;

Paciente.create = async (req,result) => {
    let novoPaciente = req.body.paciente;
    //console.log(novoPaciente);

    await sql.query("INSERT INTO Paciente SET ?", novoPaciente, (err,res) => {
        if(err){
            if(debug == true) console.log(err);W
            console.log("Erro ao cadastrar paciente");
            result.status(500).send({ message: "Erro ao cadastrar paciente"});
            return false;
        }
        else {
            console.log("Paciente cadastrado com sucesso");
            result.status(200).send(res);
        }
    })
}

Paciente.show = async (req, result) => {
    const cpf = req.params.cpf;

    await sql.query(`SELECT * FROM Paciente where Cpf = "${cpf}"`, (err, res) =>{
        if(err){
            if(debug == true) console.log(err)
            console.log("Erro ao consultar paciente");
            result.status(500).send({message: "Erro ao consultar paciente"});
        } else{
            if(res.length === 0){
                console.log("Paciente não existe");
                result.status(404).send({message: "Paciente não existe"});
                return
            }
            else{
                console.log("Paciente consultado com sucesso");
                result.status(200).send(res);
            }
        }

    })
}

Paciente.update = async (req, result) => {
    const cpf = req.params.cpf;
    const paciente_params = req.body.paciente;
    
    await sql.query('UPDATE Paciente SET ? WHERE Cpf = ?', [paciente_params, cpf], (err, res) =>{
        if(err){
            if(debug == true) console.log(err)
            console.log("Erro ao atualizar paciente");
            result.status(500).send({message: "Erro ao atualizar paciente"});
        }
        else{
            console.log("Paciente atualizado com sucesso");
            result.status(200).send(res);
        }
    })
}

module.exports = Paciente;