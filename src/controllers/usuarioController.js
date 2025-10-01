import { usuarioService } from "../services/usuarioService.js";

export const usuarioController = {
    async login(req, res) {
        const { email, senha } = req.body;
        const usuarios = await usuarioService.login(email, senha);
        if (usuarios.length > 0) {
            res.json({ id: usuarios[0].id, nome: usuarios[0].nome });
        } else {
            res.status(401).send("Email ou senha inválidos");
        }
    },
    async listar(req, res) {
        res.send(await usuarioService.listar());
    },
    async buscarPorId(req, res) {
        const user = await usuarioService.buscarPorId(req.params.id);
        user.length > 0 ? res.send(user[0]) : res.status(404).send("Usuário não encontrado");
    },
    async criar(req, res) {
        try {
            const result = await usuarioService.criar(req.body.nome, req.body.email, req.body.senha);
            result.length > 0 ? res.send("Usuário cadastrado com sucesso!") : res.status(400).send("Erro ao cadastrar");
        } catch (error) {
            res.status(400).send("Erro ao cadastrar usuário");
        }
    },
    async atualizar(req, res) {
        const result = await usuarioService.atualizar(req.params.id, req.body.nome, req.body.email, req.body.senha);
        result.length > 0 ? res.send("Usuário atualizado com sucesso!") : res.status(400).send("Erro ao atualizar");
    },
    async deletar(req, res) {
        const result = await usuarioService.deletar(req.params.id);
        result.length > 0 ? res.send("Usuário deletado com sucesso!") : res.status(400).send("Erro ao deletar");
    }
};