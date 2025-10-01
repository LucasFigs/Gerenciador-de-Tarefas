import { executarSQL } from "../utils/executarSQL.js";

export const usuarioService = {
    async login(email, senha) {
        return await executarSQL("SELECT * FROM usuarios WHERE email = ? AND senha = ?", [email, senha]);
    },
    async listar() {
        return await executarSQL("SELECT * FROM usuarios");
    },
    async buscarPorId(id) {
        return await executarSQL("SELECT * FROM usuarios WHERE id = ?", [id]);
    },
    async criar(nome, email, senha) {
        return await executarSQL("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senha]);
    },
    async atualizar(id, nome, email, senha) {
        return await executarSQL("UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?", [nome, email, senha, id]);
    },
    async deletar(id) {
        return await executarSQL("DELETE FROM usuarios WHERE id = ?", [id]);
    }
};