import { usuarioService } from "../services/usuarioService.js";

export const usuarioController = {
    async login(req, res) {
        const { email, senha } = req.body;
        const usuarios = await usuarioService.login(email, senha);
        if (usuarios.length > 0) {
            res.json({ 
                success: true,
                id: usuarios[0].id, 
                nome: usuarios[0].nome 
            });
        } else {
            res.status(401).json({ 
                success: false,
                message: "Email ou senha inválidos" 
            });
        }
    },
    async listar(req, res) {
        res.json(await usuarioService.listar());
    },
    async buscarPorId(req, res) {
        const user = await usuarioService.buscarPorId(req.params.id);
        user.length > 0 ? res.json(user[0]) : res.status(404).json({ 
            success: false, 
            message: "Usuário não encontrado" 
        });
    },
    async criar(req, res) {
        const result = await usuarioService.criar(req.body.nome, req.body.email, req.body.senha);
        result.affectedRows > 0 ? res.json({ 
            success: true, 
            message: "Usuário cadastrado com sucesso!" 
        }) : res.status(400).json({ 
            success: false, 
            message: "Erro ao cadastrar" 
        });
    },
    async atualizar(req, res) {
        const result = await usuarioService.atualizar(req.params.id, req.body.nome, req.body.email, req.body.senha);
        result.affectedRows > 0 ? res.json({ 
            success: true, 
            message: "Usuário atualizado com sucesso!" 
        }) : res.status(400).json({ 
            success: false, 
            message: "Erro ao atualizar" 
        });
    },
    async deletar(req, res) {
        const result = await usuarioService.deletar(req.params.id);
        result.affectedRows > 0 ? res.json({ 
            success: true, 
            message: "Usuário deletado com sucesso!" 
        }) : res.status(400).json({ 
            success: false, 
            message: "Erro ao deletar" 
        });
    }
};