//Informações para acesso ao banco
//------------------------------------------------

const os = require('os');

if(os.platform == "win32"){
    dbConfig = {
        host: "localhost",
        user: "administrador",
        password: "Luisfelipe9&",
        database: "CoronaHelpy"
    }
}else{
    dbConfig = {
        host: "localhost",
        user: "root",
        password: "password",
        database: "CoronaHelpy"
    }
}


module.exports = dbConfig;
