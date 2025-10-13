import { executarSQL } from "../utils/executarSQL.js";
import bcrypt from 'bcryptjs';

export const usuarioService = {
    async login(email, senha) {
        const usuarios = await executarSQL(
            "SELECT * FROM usuarios WHERE email = ?", 
            [email]
        );
        
        if (usuarios.length === 0) {
            throw new Error('Usuário não encontrado');
        }

        const usuario = usuarios[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        
        
        if (!senhaValida) {
            throw new Error('Senha incorreta');
        }

        return usuario;
    },

    async listar() {
        return await executarSQL("SELECT id, nome, email FROM usuarios"); 
    },

    async buscarPorId(id) {
        return await executarSQL(
            "SELECT id, nome, email FROM usuarios WHERE id = ?", 
            [id]
        );
    },

    async criar(nome, email, senha) {
        const senhaHash = await bcrypt.hash(senha, 10);
    
        
        return await executarSQL(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", 
            [nome, email, senhaHash]
        );
    },

    async atualizar(id, nome, email, senha) {
        const senhaHash = await bcrypt.hash(senha, 10);

        return await executarSQL(
            "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?", 
            [nome, email, senha, id]
        );
    },

    async deletar(id) {
        return await executarSQL("DELETE FROM usuarios WHERE id = ?", [id]);
    }
};