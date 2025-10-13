import { usuarioService } from "../services/usuarioService.js";
import { gerarToken } from "../config/jwt.js";

export const usuarioController = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            
            if (!email || !senha) {
                return res.status(400).json({
                    success: false,
                    message: "Email e senha são obrigatórios"
                });
            }

            const usuario = await usuarioService.login(email, senha);
            
            const token = gerarToken({
                id: usuario.id,
                email: usuario.email,
                nome: usuario.nome
            });

            res.json({
                success: true,
                message: "Login realizado com sucesso",
                token: token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    },

    async listar(req, res) {
        try {
            const usuarios = await usuarioService.listar();
            res.json({
                success: true,
                data: usuarios
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro ao listar usuários"
            });
        }
    },

    async buscarPorId(req, res) {
        try {
            const user = await usuarioService.buscarPorId(req.params.id);
            
            if (user.length > 0) {
                res.json({
                    success: true,
                    data: user[0]
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro ao buscar usuário"
            });
        }
    },

    async criar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    success: false,
                    message: "Nome, email e senha são obrigatórios"
                });
            }

            const result = await usuarioService.criar(nome, email, senha);
            
            if (result.affectedRows > 0) {
                res.status(201).json({
                    success: true,
                    message: "Usuário cadastrado com sucesso!"
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Erro ao cadastrar usuário"
                });
            }
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).json({
                    success: false,
                    message: "Email já cadastrado"
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Erro interno do servidor"
                });
            }
        }
    },

    async atualizar(req, res) {
        try {
            const result = await usuarioService.atualizar(
                req.params.id, 
                req.body.nome, 
                req.body.email, 
                req.body.senha
            );
            
            if (result.affectedRows > 0) {
                res.json({
                    success: true,
                    message: "Usuário atualizado com sucesso!"
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro ao atualizar usuário"
            });
        }
    },

    async deletar(req, res) {
        try {
            const result = await usuarioService.deletar(req.params.id);
            
            if (result.affectedRows > 0) {
                res.json({
                    success: true,
                    message: "Usuário deletado com sucesso!"
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro ao deletar usuário"
            });
        }
    }
};