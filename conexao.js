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

async function listaTodosUsuarios() {
    console.log("Listando todos usuários");
    const conexaoAtiva = await conecta();
    const [resultado] = await conexaoAtiva.query("SELECT * FROM usuarios");
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

module.exports = { listaTodosUsuarios, selecionaUsuario, insereUsuario, excluiUsuario, alteraUsuario }