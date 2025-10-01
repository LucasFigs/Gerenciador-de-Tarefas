// swagger.js
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
        url: "/", // URL relativa - vai usar a mesma URL da sua API
        description: "Servidor atual"
      }
    ],
    components: {
      schemas: {
        Usuario: {
          type: "object",
          required: ["nome", "email", "senha"],
          properties: {
            id: {
              type: "integer",
              description: "ID do usuário"
            },
            nome: {
              type: "string",
              description: "Nome do usuário"
            },
            email: {
              type: "string",
              description: "E-mail do usuário"
            },
            senha: {
              type: "string",
              description: "Senha do usuário"
            }
          }
        },
        Tarefa: {
          type: "object",
          required: ["titulo", "descricao", "id_usuario"],
          properties: {
            id: {
              type: "integer",
              description: "ID da tarefa"
            },
            titulo: {
              type: "string",
              description: "Título da tarefa"
            },
            descricao: {
              type: "string",
              description: "Descrição da tarefa"
            },
            id_usuario: {
              type: "integer",
              description: "ID do usuário proprietário da tarefa"
            }
          }
        },
        Login: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: {
              type: "string",
              description: "E-mail do usuário"
            },
            senha: {
              type: "string",
              description: "Senha do usuário"
            }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: "/api-docs.json" // Endpoint para o JSON do Swagger
    }
  }));
  
  // Endpoint para o JSON do Swagger
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  
  console.log("📚 Swagger docs available at /api-docs");
};

export default swaggerDocs;