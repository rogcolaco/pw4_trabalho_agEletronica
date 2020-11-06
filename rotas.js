var express = require('express');
var app = express();

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

app.listen(8080, function () {
    console.log("Rodando na porta 8080");
});