import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tarefas com Usuários",
      version: "1.0.0",
      description: "API para gerenciamento de usuários e tarefas",
      contact: {
        name: "Equipe de Desenvolvimento",
        email: "equipe@exemplo.com"
      }
    },
    servers: [
      {
        url: "https://gerenciador-de-tarefas-251v.onrender.com", // ✅ URL do Render
        description: "Servidor de Produção"
      },
      {
        url: "http://localhost:8000",
        description: "Servidor de Desenvolvimento"
      }
    ],
    // ... resto do código igual
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📚 Swagger docs available at https://gerenciador-de-tarefas-251v.onrender.com/api-docs");
};

export default swaggerDocs;