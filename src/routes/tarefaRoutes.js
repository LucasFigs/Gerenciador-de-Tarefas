import express from "express";
import { tarefaController } from "../controllers/tarefaController.js";
import { autenticar } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * /tarefas:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Lista todas as tarefas
 *     tags: [Tarefas]
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarefa'
 *       401:
 *         description: Token de acesso necessário
 */
router.get("/", autenticar, tarefaController.listar);

/**
 * @swagger
 * /tarefas/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Busca tarefa por ID
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *       401:
 *         description: Token de acesso necessário
 *       404:
 *         description: Tarefa não encontrada
 */
router.get("/:id", autenticar, tarefaController.buscarPorId);

/**
 * @swagger
 * /tarefas/usuario/{id_usuario}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Lista tarefas por usuário
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de tarefas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarefa'
 *       401:
 *         description: Token de acesso necessário
 *       404:
 *         description: Nenhuma tarefa encontrada para este usuário
 */
router.get("/usuario/:id_usuario", autenticar, tarefaController.listarPorUsuario);

/**
 * @swagger
 * /tarefas:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarefa'
 *     responses:
 *       201:
 *         description: Tarefa cadastrada com sucesso
 *       401:
 *         description: Token de acesso necessário
 *       400:
 *         description: Erro ao cadastrar tarefa
 */
router.post("/", autenticar, tarefaController.criar);

/**
 * @swagger
 * /tarefas/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarefa'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       401:
 *         description: Token de acesso necessário
 *       403:
 *         description: Você não tem permissão para editar esta tarefa
 *       404:
 *         description: Tarefa não encontrada
 */
router.put("/:id", autenticar, tarefaController.atualizar);

/**
 * @swagger
 * /tarefas/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa excluída com sucesso
 *       401:
 *         description: Token de acesso necessário
 *       403:
 *         description: Você não tem permissão para excluir esta tarefa
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete("/:id", autenticar, tarefaController.deletar);

export default router;