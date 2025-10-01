import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";
import swaggerDocs from "./config/swagger.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/usuarios", usuarioRoutes);
app.use("/tarefas", tarefaRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Teste de banco (OPCIONAL - pode remover depois de testar)
app.get("/test-db", async (req, res) => {
  try {
    const { getConnection } = await import("./config/db.js");
    const conn = await getConnection();
    const [result] = await conn.query("SELECT 1 as test");
    await conn.end();
    res.json({ 
      status: "✅ Conexão com banco OK",
      result: result 
    });
  } catch (error) {
    res.status(500).json({ 
      status: "❌ Erro na conexão com banco",
      error: error.message 
    });
  }
});

// Documentação Swagger
swaggerDocs(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação: http://localhost:${PORT}/api-docs`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});