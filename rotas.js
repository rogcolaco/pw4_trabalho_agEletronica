var express = require('express');
var app = express();

const { body, validationResult } = require("express-validator");
const { read } = require("fs");

app.use(express.urlencoded({ extended: true }));

const banco = require("./conexao")


/*ROTAS TELA DE LOGIN*/

app.get("/", (req, res) => {

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

//admin recebe 0 ou 1
app.post("/adicionarUsuario", [
        body("nome", "O nome é obrigatório.").trim().isLength({ min: 3, max: 80 }),
        body("login", "O login é obrigatório.").trim().isLength({ min: 3, max: 45 }),
        body("senha", "A senha precisa ter pelo menos 3 dígitos.").trim().isLength({ min: 3, max: 45 }),
        body("admin").trim(),
    ],
    async (req, res) => {
        console.log("rota utilizada quando o usuário confirmar dados preenchidos em relação novo usuário");
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.send(erros.array())
        } else {
            const resultado = await banco.insereUsuario({
                nome: req.body.nome,
                login: req.body.login,
                senha: req.body.senha,
                admin: req.body.admin,
            });
            res.send(resultado);
        }
    });

app.put("/alteraUsuario", [
        body("id", "O id do usuário é obrigatório.").trim().isLength({ min: 1 }),
        body("nome", "O nome é obrigatório.").trim().isLength({ min: 3, max: 80 }),
        body("login", "O login é obrigatório.").trim().isLength({ min: 3, max: 45 }),
        body("senha", "A senha precisa ter pelo menos 3 dígitos.").trim().isLength({ min: 3, max: 45 }),
        body("admin").trim(),
    ],
    async (req, res) => {
    console.log("rota utilizada quando o usuário alterar dados preenchidos de um usuário");
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        res.send(erros.array())
    } else {
        const resultado = await banco.alteraUsuario({
            id: req.body.id,
            nome: req.body.nome,
            login: req.body.login,
            senha: req.body.senha,
            admin: req.body.admin,
        });
        res.send(resultado);
    }
});

app.delete("/excluiUsuario", [
        body("id", "O id do usuário é obrigatório.").trim().isLength({ min: 1 }),        
    ],
    async (req, res) => {
    console.log("rota utilizada quando o usuário excluir um usuário");
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        res.send(erros.array())
    } else {
        const resultado = await banco.excluiUsuario(req.body.id);
        res.send(resultado);
    }
});

app.get("/selecionaUsuario/:id?", async (req, res) => {
    console.log("rota utilizada quando o usuário selecionar um usuário");
    if (req.params.id) {
        const resultado = await banco.selecionaUsuario(req.params.id);
        res.send(resultado);
    } else {
        res.send("Favor informar um id de usuário!")
    }
});

app.get("/listaUsuarios", async (req, res) => {
    console.log("rota utilizada quando o usuário deseja listar todos os usuário.");
    const resultado = await banco.listaTodosUsuarios();
    res.send(resultado);
});

app.post("/minhaAgenda", (req, res) => {
    res.send("rota utilizada para login caso o usuário já possua cadastro ---- preencher a tela de login e pedir para logar");
});

app.get("/logout", (req, res) => {
    res.send("rota para que usuário logado possa sair do sistema");
});

/*ROTAS NAVEGAÇÃO ENTRE AGENDA DE CONTATOS E COMPROMISSO*/

app.get("/meusContatos/:id?", async (req, res) => {
    console.log("rota utilizada caso o usuário opte por acessar e listar sua agenda de contatos");
    if (req.params.id) {
        const resultado = await banco.listaTodosContatos(req.params.id);
        res.send(resultado);
    } else {
        res.send("Favor informar um id de usuário!")
    }
});

app.get("/meusCompromissos/:id?", async (req, res) => {
    console.log("rota utilizada caso o usuário opte por acessar e listar sua agenda de compromissos");
    if (req.params.id) {
        const resultado = await banco.listaTodosCompromissos(req.params.id);
        res.send(resultado);
    } else {
        res.send("Favor informar um id de usuário!")
    }
});

/*ROTAS CRUD COMPROMISSOS*/

app.get("/novoCompromisso", (req, res) => {
    res.send("rota utilizada caso o usuário opte por criar novo compromisso. Retorna tela com form.");
});

//exemplo de data '2011-12-18 13:17:17'
app.post("/adicionarCompromisso", [
        body("data", "A data é obrigatória)").trim().isLength({ min: 19 }),
        body("obs").trim(),
        body("participantes").trim(),
        body("endereco").trim(),
        body("status").trim(),
        body("user_id").trim().isLength({ min: 1 }),
    ],
    async (req, res) => {
        console.log("rota utilizada quando o usuário confirmar dados preenchidos em relação novo compromisso");
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.send(erros.array())
        } else {
            const resultado = await banco.insereCompromisso({
                data: req.body.data,
                obs: req.body.obs,
                participantes: req.body.participantes,
                endereco: req.body.endereco,
                status: req.body.status,
                user_id: req.body.user_id,
            });
            res.send(resultado);
        }
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