const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
   res.json({ message: "on root_path" });
});

require("./Rotas/Routes.js")(app)

app.listen(3001, () => {
    console.log("Rodando na porta 3001")
})