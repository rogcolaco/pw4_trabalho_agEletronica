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
    res.send("rota utilizada caso o usuário opte por acessar e listar sua agenda de contatos");
});

app.get("/meusCompromissos", (req, res) => {
    res.send("rota utilizada caso o usuário opte por acessar e listar sua agenda de compromissos");
});

/*ROTAS CRUD COMPROMISSOS*/

app.get("/novoCompromisso", (req, res) => {
    res.send("rota utilizada caso o usuário opte por criar novo compromisso");
});

app.post("/adicionarCompromisso", (req, res) => {
    res.send("rota utilizada quando o usuário confirmar dados preenchidos em relação novo compromisso");
});

app.get("/selecionaCompromisso", (req, res) => {
    res.send("rota utilizada caso o usuário opte por selecionar os dados de um compromisso");
});

app.get("/cancelaCompromisso", (req, res) => {
    res.send("rota utilizada caso o usuário opte por cancelar um compromisso selecionado");
});

app.get("/alteraCompromisso", (req, res) => {
    res.send("rota utilizada caso o usuário opte por alterar os dados de um compromisso selecionado");
});

/*ROTAS CRUD CONTATOS DE AGENDA*/

app.get("/novoContato", (req, res) => {
    res.send("rota utilizada caso o usuário opte por criar novo contato");
});

app.post("/adicionarContato", (req, res) => {
    res.send("rota utilizada quando o usuário confirmar dados preenchidos em relação novo contato");
});

app.get("/selecionaContato", (req, res) => {
    res.send("rota utilizada caso o usuário opte por selecionar os dados de um contato");
});

app.get("/deletaContato", (req, res) => {
    res.send("rota utilizada caso o usuário opte por deletar um contato selecionado");
});

app.get("/alteraContato", (req, res) => {
    res.send("rota utilizada caso o usuário opte por alterar os dados de um contato selecionado");
});

/*LISTEN DO EXPRESS*/

app.listen(8080, function () {
    console.log("Rodando na porta 8080");
});