import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";
import swaggerDocs from "./swagger.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/usuarios", usuarioRoutes);
app.use("/tarefas", tarefaRoutes);

// Documentação Swagger
swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});