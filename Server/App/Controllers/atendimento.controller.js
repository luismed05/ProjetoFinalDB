const sql = require('../../DataBase/db.js');

const Atendimento = function(att){
    this.paciente_cpf = att.paciente_cpf,
    this.localizacao_paciente = att.localizacao_paciente,
    this.plano_saude_pacienteCod = att.plano_saude_pacienteCod,
    this.Urgencia = att.Urgencia,
    this.email_user = att.email_user,
    this.data_inicio = att.data_inicio,
    this.data_fim = att.data_fim
};

Atendimento.create = async (req,result) => {
    let createAtt = req.body.att
    let id_atendimento;

    await sql.query(`CALL Criar_Atendimento(
        ${createAtt.paciente_cpf},
        ${createAtt.localizacao_paciente},
        ${createAtt.plano_saude_pacienteCod},
        ${createAtt.Urgencia},
        ${createAtt.email_user},
        ${createAtt.data_inicio},
        ${createAtt.data_fim},${id_atendimento})`, (err,res) => {
            if(err){
                if(debug == true) console.log(err)
                console.log("erro na criação do atendimento");
                result.status(500).send({ message: "Erro na criação do atendimento"});
                return false;
            }

            //chamar VIEW para mostrar dados do atendimento
            sql.query('SELECT * FROM coronahelpy.atendimento_info WHERE `Codigo do atendimento` = ?;', 
                id_atendimento, 
                (err,resSelect)=>{
                    if(err){
                        if(debug == true) console.log(err)
                        console.log('Erro ao buscar atendimento');
                    }
                    result.status(200).send({data: resSelect});
            });
        })
}

module.exports = Atendimento;