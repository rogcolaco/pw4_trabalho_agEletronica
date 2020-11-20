var express = require('express');
var app = express();
//app = require("view");

/*ROTAS TELA DE LOGIN*/

app.get("/", (req, res) => {
    //res.send(/view/login.html);
    res.send(`
        <!DOCTYPE html>
        <html lang="PT_BR">
        
        <head>
            <meta charset="UTF-8">
            <title>Bem vindo a sua agenda eletrônica</title>
        </head>
        <body>
            <h1>Acesse sua agenda eletrônica</h1>
            <form method=post action=#>
                <p> Login:<input type=text name=login /> </p> 
                <p> Senha:<input type=password name=password /> </p> 
                <p> <input type=submit value="Login"> </p> 
                <p><a href="/cadastrarUsuario">Cadastre-se</a></p>
            </form>
        </body>
        </html>
    `);
});

app.get("/cadastrarUsuario", (req, res) => {
    res.send(`
    <!DOCTYPE html>
        <html lang="PT_BR">
        <head>
            <meta charset="UTF-8">
            <title>Bem vindo a sua agenda eletrônica</title>
        </head>
        <body>
            <h1>Por favor preencha os campos abaixo</h1>
            <form method=post action=registerUser>
                <p> Login:<input type=text name=login /> </p> 
                <p> Senha:<input type=password name=password /> </p> 
                <p> <input type=submit value="Salvar novo usuário"> </p> 
            </form>
        </body>
        </html>
    `);
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