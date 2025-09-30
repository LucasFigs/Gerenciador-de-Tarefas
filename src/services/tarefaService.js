import { executarSQL } from "../utils/executarSQL.js";

export const tarefaService = {
    async listar() {
        return await executarSQL("SELECT * FROM tarefas");
    },
    async buscarPorId(id) {
        return await executarSQL(`SELECT * FROM tarefas WHERE id = ${id}`);
    },
    async listarPorUsuario(id_usuario) {
    return await executarSQL(`SELECT * FROM tarefas WHERE id_usuario = ${id_usuario}`);
    },
    async criar(titulo, descricao, id_usuario) {
        return await executarSQL(`INSERT INTO tarefas (titulo, descricao, id_usuario) VALUES ('${titulo}', '${descricao}', ${id_usuario})`);
    },
    async atualizar(id, titulo, descricao, id_usuario) {
        return await executarSQL(`UPDATE tarefas SET titulo = '${titulo}', descricao = '${descricao}', id_usuario = ${id_usuario} WHERE id = ${id}`);
    },
    async deletar(id) {
        return await executarSQL(`DELETE FROM tarefas WHERE id = ${id}`);
    }
};
