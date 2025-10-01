import { tarefaService } from "../services/tarefaService.js";

export const tarefaController = {
    async listar(req, res) {
        res.json(await tarefaService.listar());
    },
    async buscarPorId(req, res) {
        const tarefa = await tarefaService.buscarPorId(req.params.id);
        tarefa.length > 0 ? res.json(tarefa[0]) : res.status(404).json({ 
            success: false, 
            message: "Tarefa não encontrada" 
        });
    },
    async listarPorUsuario(req, res) {
        const tarefas = await tarefaService.listarPorUsuario(req.params.id_usuario);
        tarefas.length > 0 ? res.json(tarefas) : res.status(404).json({ 
            success: false, 
            message: "Nenhuma tarefa encontrada para este usuário" 
        });
    },
    async criar(req, res) {
        const result = await tarefaService.criar(req.body.titulo, req.body.descricao, req.body.id_usuario);
        result.affectedRows > 0 ? res.json({ 
            success: true, 
            message: "Tarefa cadastrada com sucesso!" 
        }) : res.status(400).json({ 
            success: false, 
            message: "Erro ao cadastrar" 
        });
    },
    async atualizar(req, res) {
        const result = await tarefaService.atualizar(req.params.id, req.body.titulo, req.body.descricao, req.body.id_usuario);
        result.affectedRows > 0 ? res.json({ 
            success: true, 
            message: "Tarefa atualizada com sucesso!" 
        }) : res.status(400).json({ 
            success: false, 
            message: "Erro ao atualizar" 
        });
    },
    async deletar(req, res) {
        const result = await tarefaService.deletar(req.params.id);
        result.affectedRows > 0 ? res.json({ 
            success: true, 
            message: "Tarefa excluída com sucesso!" 
        }) : res.status(400).json({ 
            success: false, 
            message: "Erro ao excluir" 
        });
    }
};