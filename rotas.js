var express = require('express');
var app = express();

/*ROTAS TELA DE LOGIN*/

app.get("/", (req, res) => {
    res.send("rota para a página de login");
});

app.get("/cadastrarUsuário", (req, res) => {
    res.send("rota para a página de cadastro de novo usuário");
});

app.post("/minhaAgenda", (req, res) => {
    res.send("rota utilizada para login caso o usuário já possua cadastro ---- preencher a tela de login e pedir para logar");
});

app.get("/logout", (req, res) => {
    res.send("rota para que usuário logado possa sair do sistema");
});

/*ROTAS NAVEGAÇÃO ENTRE AGENDA DE CONTATOS E COMPROMISSO*/

app.get("/meusCotatos", (req, res) => {
    res.send("rota utilizada caso o usuário opte por acessar sua agenda de contatos");
});

app.get("/meusCompromissos", (req, res) => {
    res.send("rota utilizada caso o usuário opte por acessar sua agenda de compromissos");
});

/*ROTAS CRUD COMPROMISSOS*/


/*ROTAS CRUD CONTATOS DE AGENDA*/

app.listen(8080, function () {
    console.log("Rodando na porta 8080");
});