async function conecta() {
    const banco = require("mysql2/promise");
    const con = await banco.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "pw4_agenda"
    });
    console.log("Banco de dados conectado");
    return con;
}

//usuarios
async function listaTodosUsuarios() {
    console.log("Listando todos usuários");
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM usuario");
    return resultado;
}

async function selecionaUsuario(id) {
    console.log(`Selecionado o usuário com id: ${id}`);
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM usuario WHERE id=?;", [id]);
    return resultado;
}

async function insereUsuario(usuario) {
    console.log("Inserindo usuário: " +  usuario.nome);
    const conexaoAtiva = await conecta();
    const sql = "INSERT INTO usuario(nome, login, senha, admin) VALUES (?,?,?,?);";
    const parametros = [usuario.nome, usuario.login, usuario.senha, usuario.admin];
    return await conexaoAtiva.query(sql, parametros);
}

async function excluiUsuario(id) {
    console.log(`Apagando o usuário com id:${id}`);
    const conexaoAtiva = await conecta();
    return await conexaoAtiva.query("DELETE FROM usuario WHERE id=?", [id]);
}

async function alteraUsuario(usuario) {
    console.log("Alterando usuário: " +  usuario.nome);
    const conexaoAtiva = await conecta();
    const sql = "UPDATE usuario SET nome = ?, login = ?, senha = ?, admin = ? WHERE id = ?;";
    const parametros = [usuario.nome, usuario.login, usuario.senha, usuario.admin, usuario.id];
    return await conexaoAtiva.query(sql, parametros);
}

//contato
async function listaTodosContatos(user_id) {
    console.log("Listando todos os contatos do usuário com id: " + user_id);
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM contato WHERE user_id=?;", [user_id]);
    return resultado;
}

async function selecionaContato(id) {
    console.log(`Selecionado o contato com id: ${id}`);
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM contato WHERE id=?;", [id]);
    return resultado;
}

async function insereContato(contato) {
    console.log("Inserindo contato " +  contato.nome);
    const conexaoAtiva = await conecta();
    const sql = "INSERT INTO contato(nome, email, telefone, endereco, user_id) VALUES (?,?,?,?,?);";
    const parametros = [contato.nome, contato.email, contato.telefone, contato.endereco, contato.user_id];
    return await conexaoAtiva.query(sql, parametros);
}

async function excluiContato(id) {
    console.log(`Apagando o contato com id:${id}`);
    const conexaoAtiva = await conecta();
    return await conexaoAtiva.query("DELETE FROM contato WHERE id=?", [id]);
}

async function alteraContato(contato) {
    console.log("Alterando usuário: " + contato.nome);
    const conexaoAtiva = await conecta();
    const sql = "UPDATE contato SET nome = ?, email = ?, telefone = ?, endereco = ?, user_id = ? WHERE id = ?;";
    const parametros = [contato.nome, contato.email, contato.telefone, contato.endereco, contato.user_id, contato.id];
    return await conexaoAtiva.query(sql, parametros);
}

//compromisso
async function listaTodosCompromissos(user_id) {
    console.log("Listando todos os compromissos do usuário com id: " + user_id);
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM compromisso WHERE user_id=?;", [user_id]);
    return resultado;
}

async function selecionaCompromisso(id) {
    console.log(`Selecionado o compromisso com id: ${id}`);
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM compromisso WHERE id=?;", [id]);
    return resultado;
}

async function insereCompromisso(compromisso) {
    console.log("Inserindo compromisso: " +  compromisso.nome);
    const conexaoAtiva = await conecta();
    const sql = "INSERT INTO compromisso(data, obs, participantes, endereco, status, user_id) VALUES (?,?,?,?,?,?);";
    const parametros = [compromisso.data, compromisso.obs, compromisso.participantes, compromisso.endereco, compromisso.status, compromisso.user_id];
    return await conexaoAtiva.query(sql, parametros);
}

async function excluiCompromisso(id) {
    console.log(`Apagando o compromisso com id:${id}`);
    const conexaoAtiva = await conecta();
    return await conexaoAtiva.query("DELETE FROM compromisso WHERE id=?", [id]);
}

async function alteraCompromisso(compromisso) {
    console.log("Alterando compromisso: " +  compromisso.id);
    const conexaoAtiva = await conecta();
    const sql = "UPDATE compromisso SET data = ?, obs = ?, participantes = ?, endereco = ?,  status = ?, user_id = ? WHERE id = ?;";
    const parametros = [compromisso.data, compromisso.obs, compromisso.participantes, compromisso.endereco, compromisso.status, compromisso.user_id, compromisso.id];
    return await conexaoAtiva.query(sql, parametros);
}

module.exports = {
    listaTodosUsuarios, selecionaUsuario, insereUsuario, excluiUsuario, alteraUsuario,
    listaTodosContatos, selecionaContato, insereContato, excluiContato, alteraContato,
    listaTodosCompromissos, selecionaCompromisso, insereCompromisso, excluiCompromisso, alteraCompromisso,
}