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
        url: "http://localhost:8000",
        description: "Servidor de Desenvolvimento"
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
  apis: ["./src/routes/*.js"] // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📚 Swagger docs available at http://localhost:8000/api-docs");
};

export default swaggerDocs;