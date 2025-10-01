// tarefaController.js
import { tarefaService } from "../services/tarefaService.js";

export const tarefaController = {
    async listar(req, res) {
        try {
            const tarefas = await tarefaService.listar();
            res.send(tarefas);
        } catch (error) {
            res.status(500).send("Erro ao listar tarefas");
        }
    },
    async buscarPorId(req, res) {
        try {
            const tarefa = await tarefaService.buscarPorId(req.params.id);
            tarefa.length > 0 ? res.send(tarefa[0]) : res.status(404).send("Tarefa não encontrada");
        } catch (error) {
            res.status(500).send("Erro ao buscar tarefa");
        }
    },
    async listarPorUsuario(req, res) {
        try {
            const tarefas = await tarefaService.listarPorUsuario(req.params.id_usuario);
            tarefas.length > 0 ? res.send(tarefas) : res.status(404).send("Nenhuma tarefa encontrada para este usuário");
        } catch (error) {
            res.status(500).send("Erro ao listar tarefas do usuário");
        }
    },
    async criar(req, res) {
        try {
            const result = await tarefaService.criar(req.body.titulo, req.body.descricao, req.body.id_usuario);
            result.length > 0 ? res.send("Tarefa cadastrada com sucesso!") : res.status(400).send("Erro ao cadastrar");
        } catch (error) {
            res.status(400).send("Erro ao cadastrar tarefa");
        }
    },
    async atualizar(req, res) {
        try {
            const result = await tarefaService.atualizar(req.params.id, req.body.titulo, req.body.descricao, req.body.id_usuario);
            result.length > 0 ? res.send("Tarefa atualizada com sucesso!") : res.status(400).send("Erro ao atualizar");
        } catch (error) {
            res.status(400).send("Erro ao atualizar tarefa");
        }
    },
    async deletar(req, res) {
        try {
            const result = await tarefaService.deletar(req.params.id);
            result.length > 0 ? res.send("Tarefa excluída com sucesso!") : res.status(400).send("Erro ao excluir");
        } catch (error) {
            res.status(400).send("Erro ao excluir tarefa");
        }
    }
};