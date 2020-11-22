module.exports = app => {

    const Usuarios = require("../App/Controllers/usuario.controller.js");

    const Proprietarios = require("../App/Controllers/proprietario.controller.js");

    app.get('/users', Usuarios.index)
    app.post('/SignUp', Usuarios.create)
    app.get('/user/:email', Usuarios.show)
    app.delete('/user/:email', Usuarios.delete)

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