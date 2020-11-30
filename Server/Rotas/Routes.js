module.exports = app => {

    const Usuarios = require("../App/Controllers/usuario.controller.js");

    const Pacientes = require("../App/Controllers/paciente.controller");

    const Atendimentos = require("../App/Controllers/atendimento.controller.js");

    const PlanoSaude = require("../App/Controllers/planodesaude.controller.js");



    //Rotas padrões de Usuarios
    app.get('/users', Usuarios.index)
    app.post('/SignUp', Usuarios.create)
    app.get('/user/:email', Usuarios.show)
    app.delete('/user/:email', Usuarios.delete)
    // app.put('/user/:email', Usuarios.update)

    //Rotas padrões de Pacientes
    app.post('/paciente', Pacientes.create);
    app.put('/paciente/:cpf', Pacientes.update)
    app.get('/paciente/:cpf', Pacientes.show);

    //Rotas para plano de saude
    app.get('/getPlanos',PlanoSaude.index);

    //Rotas de Atendimento
    app.post('/callAmbulance', Atendimentos.create);
    app.delete('/finalizarAtt/:id', Atendimentos.delete);

    //Rotas para autenticação de usuario
    app.post('/Signin', Usuarios.login)
    app.post('/auth', Usuarios.auth)
    app.post('/SignOut', Usuarios.logout)




    // Antigo Trabalho de DB
    //------------------------------------------------
    // app.post("/proprietario", Proprietarios.create);
    // app.get("/proprietarios", Proprietarios.index);
    // app.get(`/proprietarios/:cpf`, Proprietarios.show);
    // app.delete('/proprietarios', Proprietarios.deleteAll);
}