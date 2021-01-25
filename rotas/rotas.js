const { body, validationResult } = require("express-validator");
const { read } = require("fs");
const banco = require("../database/conexao");
var path = require("path");

module.exports = (app) => {
  //*ROTAS - Login

  app.post("/login", app.config.auth.login);
  app.post("/validateToken", app.config.auth.validateToken);

  //*ROTAS - CRUD DE USUÁRIOS

  //admin recebe 0 ou 1
  app
    .route("/adicionarUsuario")
    .post(
      [
        body("nome", "O nome é obrigatório.")
          .trim()
          .isLength({ min: 3, max: 80 }),
        body("login", "O login é obrigatório.")
          .trim()
          .isLength({ min: 3, max: 45 }),
        body("senha", "A senha precisa ter no mínimo 3 dígitos e no máximo 45.")
          .trim()
          .isLength({ min: 3, max: 45 }),
        body("admin").trim(),
      ],
      async (req, res) => {
        console.log(
          "rota utilizada quando o usuário confirmar dados preenchidos em relação novo usuário"
        );
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
          res.status(409).send(erros.array());
        } else {
          const resultado = await banco.insereUsuario({
            nome: req.body.nome,
            login: req.body.login,
            senha: req.body.senha,
            admin: req.body.admin,
          });
          if (resultado == "Já existe um usuário com o login informado!") {
            res.status(409).send(resultado);
          }
          res.send(resultado);
        }
      }
    );

  app
    .route("/alterarUsuario")
    .all(app.config.passport.authenticate())
    .put(
      [
        body("id", "O id do usuário é obrigatório.")
          .trim()
          .isLength({ min: 1 }),
        body("nome", "O nome é obrigatório.")
          .trim()
          .isLength({ min: 3, max: 80 }),
        body("senha", "A senha precisa ter no mínimo 3 dígitos e no máximo 45.")
          .trim()
          .isLength({ min: 3, max: 45 }),
        body("admin").trim(),
      ],
      async (req, res) => {
        console.log(
          "rota utilizada quando o usuário alterar dados preenchidos de um usuário"
        );
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
          res.status(409).send(erros.array());
        } else {
          const resultado = await banco.alteraUsuario({
            id: req.body.id,
            nome: req.body.nome,
            senha: req.body.senha,
            admin: req.body.admin,
          });
          if (resultado == "Não existe usuário com o ID informado!") {
            res.status(409).send(resultado);
          }
          res.send(resultado);
        }
      }
    );

  app
    .route(`/excluirUsuario/:id?`)
    .all(app.config.passport.authenticate())
    .delete(async (req, res) => {
      console.log("rota utilizada quando o usuário excluir um usuário");
      const erros = validationResult(req);
      if (req.params.id) {
        const resultado = await banco.excluiUsuario(req.params.id);
        res.send(resultado);
      } else {
        res.status(409).send("Necessário informar um id para exclusão!");
      }
    });

  app
    .route("/selecionarUsuario/:id?")
    .all(app.config.passport.authenticate())
    .get(async (req, res) => {
      console.log("rota utilizada quando o usuário selecionar um usuário");
      if (req.params.id) {
        const resultado = await banco.selecionaUsuario(req.params.id);
        res.send(resultado);
      } else {
        res.status(409).send("Favor informar um id de usuário válida!");
      }
    });

  app
    .route("/listarUsuarios")
    .all(app.config.passport.authenticate())
    .get(async (req, res) => {
      console.log(
        "rota utilizada quando o usuário deseja listar todos os usuário."
      );
      const resultado = await banco.listaTodosUsuarios();
      res.send(resultado);
    });

  //*ROTAS - CRUD DE COMPROMISSOS

  //exemplo de data '2011-12-18 13:17:17'
  app
    .route("/adicionarCompromisso")
    .all(app.config.passport.authenticate())
    .post(
      [
        body("data", "A data é obrigatória)").trim().isLength({ min: 16 }),
        body("obs").trim(),
        body("participantes").trim(),
        body("endereco").trim(),
        body("status").trim(),
        body("user_id").trim().isLength({ min: 1 }),
      ],
      async (req, res) => {
        console.log(
          "rota utilizada quando o usuário confirmar dados preenchidos em relação novo compromisso"
        );
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
          res.status(409).send(erros.array());
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
      }
    );

  app
    .route("/alterarCompromisso")
    .all(app.config.passport.authenticate())
    .put(
      [
        body("id", "O id do compromisso é obrigatório!")
          .trim()
          .isLength({ min: 1 }),
        body("data", "A data é obrigatória!").trim().isLength({ min: 16 }),
        body("obs").trim(),
        body("participantes").trim(),
        body("endereco").trim(),
        body("status").trim(),
        body("user_id").trim().isLength({ min: 1 }),
      ],
      async (req, res) => {
        console.log(
          "rota utilizada caso o usuário opte por alterar os dados de um compromisso selecionado"
        );
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
          res.status(409).send(erros.array());
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
      }
    );

  app
    .route(`/excluirCompromisso/:id?`)
    .all(app.config.passport.authenticate())
    .delete(async (req, res) => {
      console.log("rota utilizada quando o usuário excluir um compromisso");
      const erros = validationResult(req);
      if (req.params.id) {
        const resultado = await banco.excluiCompromisso(req.params.id);
        res.send(resultado);
      } else {
        res.status(409).send("Necessário informar um id para exclusão!");
      }
    });

  app
    .route("/selecionarCompromisso/:id?")
    .all(app.config.passport.authenticate())
    .get(async (req, res) => {
      console.log("rota utilizada quando o usuário selecionar um compromisso");
      if (req.params.id) {
        const resultado = await banco.selecionaCompromisso(req.params.id);
        res.send(resultado);
      } else {
        res.status(409).send("Favor informar um id de compromisso válido!");
      }
    });

  app
    .route("/meusCompromissos/:id?")
    .all(app.config.passport.authenticate())
    .get(async (req, res) => {
      console.log(
        "rota utilizada caso o usuário opte por acessar e listar sua agenda de compromissos"
      );
      if (req.params.id) {
        const resultado = await banco.listaTodosCompromissos(req.params.id);
        res.send(resultado);
      } else {
        res.status(409).send("Favor informar um id de usuário válida!");
      }
    });

  //*ROTAS - CRUD DE CONTATOS

  app
    .route("/adicionarContato")
    .all(app.config.passport.authenticate())
    .post(
      [
        body("nome", "O nome é obrigatório.")
          .trim()
          .isLength({ min: 3, max: 80 }),
        body("telefone").trim(),
        body("endereco").trim(),
        body("user_id", "Necessário informar o Id do usuário!")
          .trim()
          .isLength({ min: 1 }),
      ],
      async (req, res) => {
        console.log(
          "rota utilizada quando o usuário confirmar dados preenchidos em relação novo contato"
        );
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
          res.status(409).send(erros.array());
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
      }
    );

  app
    .route("/alterarContato")
    .all(app.config.passport.authenticate())
    .put(
      [
        body("id", "O id do contato é obrigatório.")
          .trim()
          .isLength({ min: 1 }),
        body("nome", "O nome é obrigatório.")
          .trim()
          .isLength({ min: 3, max: 80 }),
        body("telefone").trim(),
        body("endereco").trim(),
        body("user_id", "Necessário informar o Id do usuário!")
          .trim()
          .isLength({ min: 1 }),
      ],
      async (req, res) => {
        console.log(
          "rota utilizada caso o usuário opte por alterar os dados de um contato selecionado"
        );
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
          res.status(409).send(erros.array());
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
      }
    );

  app
    .route("/excluirContato/:id?")
    .all(app.config.passport.authenticate())
    .delete(async (req, res) => {
      console.log(
        "rota utilizada caso o usuário opte por deletar um contato selecionado"
      );
      if (req.params.id) {
        const resultado = await banco.excluiContato(req.params.id);
        res.send(resultado);
      } else {
        res.status(409).send("Necessário informar um id para exclusão!");
      }
    });

  app
    .route("/selecionarContato/:id?")
    .all(app.config.passport.authenticate())
    .get(async (req, res) => {
      console.log("rota utilizada quando o usuário selecionar um contato");
      if (req.params.id) {
        const resultado = await banco.selecionaContato(req.params.id);
        res.send(resultado);
      } else {
        res.status(409).send("Favor informar o id de um contato válido!");
      }
    });

  app
    .route("/meusContatos/:id?")
    .all(app.config.passport.authenticate())
    .get(async (req, res) => {
      console.log(
        "rota utilizada caso o usuário opte por acessar e listar sua agenda de contatos"
      );
      if (req.params.id) {
        const resultado = await banco.listaTodosContatos(req.params.id);
        res.send(resultado);
      } else {
        res.status(409).send("Favor informar um id de usuário válido!");
      }
    });
};
