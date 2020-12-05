# README

## Alguns comandos para iniciar o projeto

### Precisamos instalar algumas dependencia na maquina para rodar o programa
#### o primeiro que precisamos é o NodeJS
[Instalar NodeJS](https://nodejs.org/en/download/)

### Antes de Rodar o servidor precisa instalar um dependencia local na maquina
> npm install -g nodemon

### Deve-se tambem alterar o arquivo db.config.js
> cd Server/Config/db.config.js
```
    dbConfig = {
        host: "Host para acesso",
        user: "usuario para acesso",
        password: "senha para acesso",
        database: "CoronaHelpy"
    }
```

### Precisamos agora instalar todas as dependencias do projeto com o simples comando
> npm run install-all

### Com todas as dependencia do projeto instaladas basta rodar
> npm run start


