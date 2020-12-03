const sql = require('../../DataBase/db.js');
const debug = true;

const Atendimento = function(att){
    this.paciente_cpf = att.paciente_cpf,
    this.localizacao_paciente = att.localizacao_paciente,
    this.endereco_paciente = att.endereco_paciente,
    this.plano_saude_pacienteCod = att.plano_saude_pacienteCod,
    this.Urgencia = att.Urgencia,
    this.email_user = att.email_user,
    this.data_inicio = att.data_inicio
};

Atendimento.show = async (req,result) => {
    let email = req.params.email;
    sql.query('SELECT * FROM Atendimento WHERE usuario_email= ?;',email, (err,res) => {
        if(err){
            if (debug=true) console.log(err)
            console.log("[Atendimento] - Erro ao realizar consulta");
            result.status(500).send({ message: "[Atendimento] - Erro ao realizar consulta" });
        }
        let openID;
        for( let i = 0; i < res.length;i ++){
            console.log(res[i].data_fim == null)
            if(res[i].data_fim == null){
                openID = res[i].id;
            }
        }
        if(openID){
            sql.query(`SELECT * FROM atendimento_info WHERE Codigo_do_atendimento = ?;`,openID, (errSelect,resSelect) => {
                if(errSelect){
                    console.log('[Atendimento] - Erro na busca do atendimento');
                    result.status(500).send({message: "[Atendimento] - Erro na busca do atendimento"})
                }
                else{
                    console.log('[Atendimento] - Busca realizada com sucesso');
                    result.status(200).send({resSelect});
                }
            })
        } else{
            result.status(404).send({ message: "[Atendimento] - Nenhum atendimento em andamento foi encontrado" });
        }
    })
}

Atendimento.create = async (req,result) => {
    let createAtt = req.body.call;

    sql.query('SET @id_atendimento = NULL')
    await sql.query("CALL Criar_Atendimento(?,?,?,?,?,?,?, @id_atendimento)",
    [   createAtt.paciente_cpf,
        createAtt.localizacao_paciente,
        createAtt.plano_saude_pacienteCod,
        createAtt.Urgencia,
        createAtt.email_user,
        createAtt.data_inicio,
        createAtt.endereco_paciente], (err,res) => {
            if(err){
                if(debug === true) console.log(err);
                console.log("[Atendimento] - Erro na criação");
                result.status(500).send({ message: "[Atendimento] - Erro na criação"});
                return false;
            }
            //chamar VIEW para mostrar dados do atendimento
            sql.query('SELECT * FROM atendimento_info WHERE `Codigo_do_atendimento` = @id_atendimento;',
                (err,resSelect)=>{
                    if(err){
                        if(debug == true) console.log(err)
                        console.log('[Atendimento] - Erro na busca');
                    }
                    console.log(resSelect)
                    console.log("[Atendimento] - Criado com sucesso!");
                    result.status(200).send({resSelect});
            });
        })
}

Atendimento.delete = async (req,result) => {
    let id = req.params.id;
    await sql.query(`CALL final_atendimento(${id})`, (req,res) => {
        if(err){
            if(debug = true) console.log(err)
            console.log('[Atendimento] - Erro na finalização');
            result.status(500).send({message: "[Atendimento] - Erro na finalização"})
        }
        result.status(200).send({Message: "[Atendimento] -  finalizado com sucesso"})
    })
}

module.exports = Atendimento;