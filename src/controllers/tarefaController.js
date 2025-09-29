import { tarefaService } from "../services/tarefaService.js";

export const tarefaController = {
    async listar(req, res) {
        res.send(await tarefaService.listar());
    },
    async buscarPorId(req, res) {
        const tarefa = await tarefaService.buscarPorId(req.params.id);
        tarefa.length > 0 ? res.send(tarefa[0]) : res.send("Tarefa não encontrada");
    },
    async listarPorUsuario(req, res) {
    const tarefas = await tarefaService.listarPorUsuario(req.params.id_usuario);
    tarefas.length > 0 ? res.send(tarefas) : res.send("Nenhuma tarefa encontrada para este usuário");
    },
    async criar(req, res) {
        const result = await tarefaService.criar(req.body.titulo, req.body.descricao, req.body.id_usuario);
        result.affectedRows > 0 ? res.send("Tarefa cadastrada com sucesso!") : res.send("Erro ao cadastrar");
    },
    async atualizar(req, res) {
        const result = await tarefaService.atualizar(req.params.id, req.body.titulo, req.body.descricao, req.body.id_usuario);
        result.affectedRows > 0 ? res.send("Tarefa atualizada com sucesso!") : res.send("Erro ao atualizar");
    },
    async deletar(req, res) {
        const result = await tarefaService.deletar(req.params.id);
        result.affectedRows > 0 ? res.send("Tarefa excluída com sucesso!") : res.send("Erro ao excluir");
    }
};
