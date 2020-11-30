var express = require('express');
var app = express();

const { body, validationResult } = require("express-validator");
const { read } = require("fs");

app.use(express.urlencoded({ extended: true }));

const banco = require("./conexao")


/*ROTAS DE TELAS*/

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

app.post("/minhaAgenda", (req, res) => {
    res.send(`
    <!DOCTYPE html>
        <html lang="PT_BR">
        <head>
            <meta charset="UTF-8">
            <title>Bem vindo a sua agenda eletrônica</title>
        </head>
        <body>
            <!-- Indicar o nome do usuário -->
            <p> Seja bem vindo, #### | <a href=logout>Sair</a>	</p>
            <h1>Menu Principal</h1>
            <p> <a href=meusContatos>Meus Contatos</a> </p>
            <p> <a href=meusCompromissos>Meus Compromissos</a> </p>
            <hr>
            <p> <a href=novoContato>Adicionar Novo Contato</a> </p>
            <p> <a href=novoCompromisso>Adicionar Novo Compromisso</a> </p>
        </body>
        </html>
    `);
});

app.get("/novoContato", (req, res) => {
    res.send(`
    <!DOCTYPE html>
        <html lang="PT_BR">
        <head>
            <meta charset="UTF-8">
            <title>Bem vindo a sua agenda eletrônica</title>
        </head>
        <body>
            <!-- Indicar o nome do usuário -->
            <p> Bem vindo: #### | <a href=minhaAgenda>Voltar</a>  |  <a href=logout>Sair</a> <p>
            <h1>Informe os dados do Novo contato</h1>
            <form method=post action=adicionarContato>
                <p> Nome: <input type=text name=name /> </p> 
                <p> Endereço: <input type=text name=adress /> </p>  
                <p> Telefone: <input type=text name=phone /> </p> 
                <p> E-mail: <input type=text name=email /> </p> 
                <p> <input type=submit value="Salvar novo contato"> </p> 
            </form>
        </body>
        </html>
    `);
});

app.get("/novoCompromisso", (req, res) => {
    res.send("rota utilizada caso o usuário opte por criar novo compromisso. Retorna tela com form.");
});

app.get("/logout", (req, res) => {
    res.send("rota utilizada para logout");
});

//*ROTAS - CRUD DE USUÁRIOS

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

app.put("/alterarUsuario", [
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

app.delete("/excluirUsuario", [
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

app.get("/selecionarUsuario/:id?", async (req, res) => {
    console.log("rota utilizada quando o usuário selecionar um usuário");
    if (req.params.id) {
        const resultado = await banco.selecionaUsuario(req.params.id);
        res.send(resultado);
    } else {
        res.send("Favor informar um id de usuário!")
    }
});

app.get("/listarUsuarios", async (req, res) => {
    console.log("rota utilizada quando o usuário deseja listar todos os usuário.");
    const resultado = await banco.listaTodosUsuarios();
    res.send(resultado);
});


//*ROTAS - CRUD DE COMPROMISSOS

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

app.put("/alterarCompromisso", [
        body("id", "O id do compromisso é obrigatório!").trim().isLength({ min: 1 }),
        body("data", "A data é obrigatória!").trim().isLength({ min: 19 }),
        body("obs").trim(),
        body("participantes").trim(),
        body("endereco").trim(),
        body("status").trim(),
        body("user_id").trim().isLength({ min: 1 }),
    ],
    async (req, res) => {
        console.log("rota utilizada caso o usuário opte por alterar os dados de um compromisso selecionado");
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.send(erros.array())
        } else {
            const resultado = await banco.alteraCompromisso({
                id: req.body.id,
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

app.delete("/excluirCompromisso", [
        body("id", "O id do compromisso é obrigatório.").trim().isLength({ min: 1 }),        
    ],
    async (req, res) => {
    console.log("rota utilizada quando o usuário excluir um compromisso");
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        res.send(erros.array())
    } else {
        const resultado = await banco.excluiCompromisso(req.body.id);
        res.send(resultado);
    }
});

app.get("/selecionarCompromisso/:id?", async (req, res) => {
    console.log("rota utilizada quando o usuário selecionar um compromisso");
    if (req.params.id) {
        const resultado = await banco.selecionaCompromisso(req.params.id);
        res.send(resultado);
    } else {
        res.send("Favor informar um id de compromisso!")
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


//*ROTAS - CRUD DE CONTATOS

app.post("/adicionarContato", [
        body("nome", "O nome é obrigatório.").trim().isLength({ min: 3, max: 80 }),
        body("telefone").trim(),
        body("endereco").trim(),
        body("user_id").trim().isLength({ min: 1 }),
    ],
    async (req, res) => {
        console.log("rota utilizada quando o usuário confirmar dados preenchidos em relação novo contato");
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.send(erros.array())
        } else {
            const resultado = await banco.insereContato({
                nome: req.body.nome,
                email: req.body.email,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
                user_id: req.body.user_id,
            });
            res.send(resultado);
        }
});

app.put("/alterarContato", [
        body("id", "O id do contato é obrigatório.").trim().isLength({ min: 1 }),
        body("nome", "O nome é obrigatório.").trim().isLength({ min: 3, max: 80 }),
        body("telefone").trim(),
        body("endereco").trim(),
        body("user_id").trim().isLength({ min: 1 }),
    ],
    async (req, res) => {
        console.log("rota utilizada caso o usuário opte por alterar os dados de um contato selecionado");
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            res.send(erros.array())
        } else {
            const resultado = await banco.alteraContato({
                id: req.body.id,
                nome: req.body.nome,
                email: req.body.email,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
                user_id: req.body.user_id,
            });
            res.send(resultado);
        }
});

app.delete("/excluirContato", [
        body("id", "O id do compromisso é obrigatório.").trim().isLength({ min: 1 }),        
    ],
    async (req, res) => {
    console.log("rota utilizada caso o usuário opte por deletar um contato selecionado");
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        res.send(erros.array())
    } else {
        const resultado = await banco.excluiContato(req.body.id);
        res.send(resultado);
    }
});

app.get("/selecionarContato/:id?", async (req, res) => {
    console.log("rota utilizada quando o usuário selecionar um contato");
    if (req.params.id) {
        const resultado = await banco.selecionaContato(req.params.id);
        res.send(resultado);
    } else {
        res.send("Favor informar o id de um contato!")
    }
});

app.get("/meusContatos/:id?", async (req, res) => {
    console.log("rota utilizada caso o usuário opte por acessar e listar sua agenda de contatos");
    if (req.params.id) {
        const resultado = await banco.listaTodosContatos(req.params.id);
        res.send(resultado);
    } else {
        res.send("Favor informar um id de usuário!")
    }
});

/*LISTEN DO EXPRESS*/

app.listen(8080, function () {
    console.log("Rodando na porta 8080");
});