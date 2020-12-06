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
            console.log("[Paciente] - Erro no cadastro");
            result.status(500).send({ message: "[Paciente] - Erro no cadastro"});
            return false;
        }
        else {
            console.log("[Paciente] - Cadastrado com sucesso");
            result.status(200).send(res);
        }
    })
}

Paciente.show = async (req, result) => {
    const cpf = req.params.cpf;

    await sql.query(`SELECT * FROM Paciente where Cpf = "${cpf}"`, (err, res) =>{
        if(err){
            if(debug == true) console.log(err)
            console.log("[Paciente] - Erro ao realizar consulta");
            result.status(500).send({message: "[Paciente] - Erro ao realizar consulta"});
        } else{
            if(res.length === 0){
                console.log("[Paciente] - Não existe");
                result.status(404).send({message: "[Paciente] - Não existe"});
                return
            }
            else{
                console.log("[Paciente] - Consulta realizada com sucesso");
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
            console.log("[Paciente] - Erro na atualização");
            result.status(500).send({message: "[Paciente] - Erro na atualizaçãoe"});
        }
        else{
            console.log("[Paciente] - Atualizado com sucesso");
            result.status(200).send(res);
        }
    })
}

module.exports = Paciente;