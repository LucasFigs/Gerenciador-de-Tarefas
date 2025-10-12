import express from "express";
import { usuarioController } from "../controllers/usuarioController.js";
import { autenticar } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Email ou senha inválidos
 */
router.post("/login", usuarioController.login);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Erro ao cadastrar usuário
 */
router.post("/", usuarioController.criar);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Token de acesso necessário
 */
router.get("/", autenticar, usuarioController.listar);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Busca usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Token de acesso necessário
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", autenticar, usuarioController.buscarPorId);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       401:
 *         description: Token de acesso necessário
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:id", autenticar, usuarioController.atualizar);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Token de acesso necessário
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", autenticar, usuarioController.deletar);

export default router;