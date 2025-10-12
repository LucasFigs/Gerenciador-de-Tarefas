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
        url: "https://gerenciador-de-tarefas-251v.onrender.com",
        description: "Servidor de Produção"
      },
      {
        url: "http://localhost:8000",
        description: "Servidor de Desenvolvimento"
      }
    ],
    components: {
      securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
      schemas: {
        Usuario: {
          type: "object",
          required: ["nome", "email", "senha"],
          properties: {
            id: {
              type: "integer",
              description: "ID do usuário",
              example: 1
            },
            nome: {
              type: "string",
              description: "Nome do usuário",
              example: "João Silva"
            },
            email: {
              type: "string",
              description: "E-mail do usuário",
              example: "joao@email.com"
            },
            senha: {
              type: "string",
              description: "Senha do usuário",
              example: "123456"
            }
          },
          example: {
            nome: "João Silva",
            email: "joao@email.com",
            senha: "123456"
          }
        },
        Tarefa: {
          type: "object",
          required: ["titulo", "descricao", "id_usuario"],
          properties: {
            id: {
              type: "integer",
              description: "ID da tarefa",
              example: 1
            },
            titulo: {
              type: "string",
              description: "Título da tarefa",
              example: "Estudar Node.js"
            },
            descricao: {
              type: "string",
              description: "Descrição da tarefa",
              example: "Estudar conceitos avançados de Node.js"
            },
            id_usuario: {
              type: "integer",
              description: "ID do usuário proprietário da tarefa",
              example: 1
            }
          },
          example: {
            titulo: "Estudar Node.js",
            descricao: "Estudar conceitos avançados de Node.js",
            id_usuario: 1
          }
        },
        Login: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: {
              type: "string",
              description: "E-mail do usuário",
              example: "joao@email.com"
            },
            senha: {
              type: "string",
              description: "Senha do usuário",
              example: "123456"
            }
          },
          example: {
            email: "joao@email.com",
            senha: "123456"
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
      persistAuthorization: true,
    }
  }));
  console.log("📚 Swagger docs available at https://gerenciador-de-tarefas-251v.onrender.com/api-docs");
};

export default swaggerDocs;