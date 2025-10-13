import { tarefaService } from "../services/tarefaService.js";

export const tarefaController = {
    async listar(req, res) {
        try {
            const tarefas = await tarefaService.listar();
            res.json({
                success: true,
                data: tarefas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro ao listar tarefas"
            });
        }
    },

    async buscarPorId(req, res) {
        try {
            const tarefa = await tarefaService.buscarPorId(req.params.id);
            
            if (tarefa.length > 0) {
                res.json({
                    success: true,
                    data: tarefa[0]
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Tarefa não encontrada"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro ao buscar tarefa"
            });
        }
    },

    async listarPorUsuario(req, res) {
        try {
            const idUsuarioLogado = req.usuario.id;
            const tarefas = await tarefaService.listarPorUsuario(idUsuarioLogado);
            
            res.json({
                success: true,
                data: tarefas
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro ao listar tarefas do usuário"
            });
        }
    },

    async criar(req, res) {
        try {
            const idUsuarioLogado = req.usuario.id;
            const result = await tarefaService.criar(
                req.body.titulo, 
                req.body.descricao, 
                idUsuarioLogado 
            );
            
            if (result.affectedRows > 0) {
                res.status(201).json({
                    success: true,
                    message: "Tarefa cadastrada com sucesso!"
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Erro ao cadastrar tarefa"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro ao criar tarefa"
            });
        }
    },

    async atualizar(req, res) {
        try {
            const idUsuarioLogado = req.usuario.id;
            const idTarefa = req.params.id;
            
            // Verificar se a tarefa pertence ao usuário
            const tarefa = await tarefaService.buscarPorId(idTarefa);
            if (tarefa.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Tarefa não encontrada"
                });
            }
            
            if (tarefa[0].id_usuario !== idUsuarioLogado) {
                return res.status(403).json({
                    success: false,
                    message: "Você não tem permissão para editar esta tarefa"
                });
            }

            const result = await tarefaService.atualizar(
                idTarefa, 
                req.body.titulo, 
                req.body.descricao, 
                idUsuarioLogado
            );
            
            if (result.affectedRows > 0) {
                res.json({
                    success: true,
                    message: "Tarefa atualizada com sucesso!"
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Erro ao atualizar tarefa"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro ao atualizar tarefa"
            });
        }
    },

    async deletar(req, res) {
        try {
            const idUsuarioLogado = req.usuario.id;
            const idTarefa = req.params.id;
            
            const tarefa = await tarefaService.buscarPorId(idTarefa);
            if (tarefa.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Tarefa não encontrada"
                });
            }
            
            if (tarefa[0].id_usuario !== idUsuarioLogado) {
                return res.status(403).json({
                    success: false,
                    message: "Você não tem permissão para excluir esta tarefa"
                });
            }

            const result = await tarefaService.deletar(idTarefa);
            
            if (result.affectedRows > 0) {
                res.json({
                    success: true,
                    message: "Tarefa excluída com sucesso!"
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Erro ao excluir tarefa"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro ao excluir tarefa"
            });
        }
    }
};