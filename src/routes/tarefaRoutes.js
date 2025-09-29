import express from "express";
import { tarefaController } from "../controllers/tarefaController.js";

const router = express.Router();

router.get("/", tarefaController.listar);
router.get("/:id", tarefaController.buscarPorId);
router.get("/usuario/:id_usuario", tarefaController.listarPorUsuario);
router.post("/", tarefaController.criar);
router.put("/:id", tarefaController.atualizar);
router.delete("/:id", tarefaController.deletar);

export default router;
