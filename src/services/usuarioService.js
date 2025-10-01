import { executarSQL } from "../utils/executarSQL.js";

export const usuarioService = {
    async login(email, senha) {
        return await executarSQL('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);
    },
    async listar() {
        return await executarSQL("SELECT * FROM usuarios");
    },
    async buscarPorId(id) {
        return await executarSQL('SELECT * FROM usuarios WHERE id = $1', [id]);
    },
    async criar(nome, email, senha) {
        return await executarSQL(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, senha]
        );
    },
    async atualizar(id, nome, email, senha) {
        return await executarSQL(
            'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
            [nome, email, senha, id]
        );
    },
    async deletar(id) {
        return await executarSQL('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    }
};