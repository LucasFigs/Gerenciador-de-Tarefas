import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Olá mundo!");
});

app.use("/usuarios", usuarioRoutes);
app.use("/tarefas", tarefaRoutes);

app.listen(port, () => {
    console.log(`🦠 Servidor rodando: http://localhost:${port}`);
});
