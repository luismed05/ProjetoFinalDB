var mysql = require('mysql');
var clientConfig = require("../Config/db.config.js");

//Faz a conexão do sistema ao banco
//---------------------------------------
const conexao = mysql.createConnection({
    host: clientConfig.host,
    user: clientConfig.user,
    password: clientConfig.password,
    database: clientConfig.database
})

conexao.connect((err) => {
    if(err) throw err;
    console.log("Conectado")
})

module.exports = conexao;