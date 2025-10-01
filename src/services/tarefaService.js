import { executarSQL } from "../utils/executarSQL.js";

export const tarefaService = {
    async listar() {
        return await executarSQL("SELECT * FROM tarefas");
    },
    async buscarPorId(id) {
        return await executarSQL('SELECT * FROM tarefas WHERE id = $1', [id]);
    },
    async listarPorUsuario(id_usuario) {
        return await executarSQL('SELECT * FROM tarefas WHERE id_usuario = $1', [id_usuario]);
    },
    async criar(titulo, descricao, id_usuario) {
        return await executarSQL(
            'INSERT INTO tarefas (titulo, descricao, id_usuario) VALUES ($1, $2, $3) RETURNING *',
            [titulo, descricao, id_usuario]
        );
    },
    async atualizar(id, titulo, descricao, id_usuario) {
        return await executarSQL(
            'UPDATE tarefas SET titulo = $1, descricao = $2, id_usuario = $3 WHERE id = $4 RETURNING *',
            [titulo, descricao, id_usuario, id]
        );
    },
    async deletar(id) {
        return await executarSQL('DELETE FROM tarefas WHERE id = $1 RETURNING *', [id]);
    }
};