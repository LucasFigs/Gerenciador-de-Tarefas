# 📋 Gerenciador de Tarefas API

Uma API RESTful completa para gerenciamento de usuários e tarefas, desenvolvida em Node.js com Express e MySQL.

## 🚀 Características

- ✅ **CRUD Completo** de usuários e tarefas
- 🔐 **Sistema de autenticação** simples
- 📚 **Documentação interativa** com Swagger/OpenAPI
- 🗄️ **Banco de dados MySQL** com Aiven
- 🌐 **CORS habilitado** para integração frontend
- 🐳 **Pronta para produção** com deploy no Render

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução
- **Express.js** - Framework web
- **MySQL2** - Driver do banco de dados
- **Swagger/OpenAPI** - Documentação interativa
- **CORS** - Middleware para requisições cross-origin
- **Render** - Plataforma de deploy

## 📋 Endpoints da API

### 👥 Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/usuarios/login` | Autentica um usuário |
| `GET` | `/usuarios` | Lista todos os usuários |
| `GET` | `/usuarios/{id}` | Busca usuário por ID |
| `POST` | `/usuarios` | Cria um novo usuário |
| `PUT` | `/usuarios/{id}` | Atualiza um usuário |
| `DELETE` | `/usuarios/{id}` | Remove um usuário |

### 📝 Tarefas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/tarefas` | Lista todas as tarefas |
| `GET` | `/tarefas/{id}` | Busca tarefa por ID |
| `GET` | `/tarefas/usuario/{id_usuario}` | Lista tarefas por usuário |
| `POST` | `/tarefas` | Cria uma nova tarefa |
| `PUT` | `/tarefas/{id}` | Atualiza uma tarefa |
| `DELETE` | `/tarefas/{id}` | Remove uma tarefa |

## 🚀 Como Usar

### 1. Acesse a Documentação Interativa

A API possui documentação completa no Swagger UI:
```
https://gerenciador-de-tarefas-251v.onrender.com/api-docs
```

### 2. Exemplos de Uso

#### 🔐 Login de Usuário
```http
POST /usuarios/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "senha": "123456"
}
```

#### 👥 Criar Usuário
```http
POST /usuarios
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

#### 📝 Criar Tarefa
```http
POST /tarefas
Content-Type: application/json

{
  "titulo": "Estudar Node.js",
  "descricao": "Estudar conceitos avançados",
  "id_usuario": 1
}
```

#### 📋 Listar Tarefas por Usuário
```http
GET /tarefas/usuario/1
```

## 🗄️ Estrutura do Banco de Dados

### Tabela: `usuarios`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT AUTO_INCREMENT | ID único do usuário |
| `nome` | VARCHAR(100) | Nome do usuário |
| `email` | VARCHAR(100) | E-mail único do usuário |
| `senha` | VARCHAR(255) | Senha do usuário |

### Tabela: `tarefas`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT AUTO_INCREMENT | ID único da tarefa |
| `titulo` | VARCHAR(100) | Título da tarefa |
| `descricao` | TEXT | Descrição detalhada |
| `id_usuario` | INT | ID do usuário proprietário |

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 18+
- MySQL 5.7+
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/LucasFigs/Gerenciador-de-Tarefas.git
cd Gerenciador-de-Tarefas
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_PORT=3306
DB_NAME=Tarefas_DB
PORT=8000
```

4. **Execute em desenvolvimento**
```bash
npm run dev
```

### Estrutura do Projeto
```
src/
├── config/
│   ├── db.js          # Configuração do banco
│   └── swagger.js     # Configuração do Swagger
├── controllers/
│   ├── usuarioController.js
│   └── tarefaController.js
├── routes/
│   ├── usuarioRoutes.js
│   └── tarefaRoutes.js
├── services/
│   ├── usuarioService.js
│   └── tarefaService.js
├── utils/
│   └── executarSQL.js  # Utilitário de queries
└── app.js             # Arquivo principal
```

## 🌐 Deploy

### Deploy no Render

1. **Conecte seu repositório GitHub** no Render
2. **Configure as variáveis de ambiente** no painel do Render:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_PORT`
   - `DB_NAME`

3. **Deploy automático** a cada push para a branch main

### Variáveis de Ambiente para Produção
```env
DB_HOST=tarefas-unifordb-tarefas-dbunifor.j.aivencloud.com
DB_USER=avnadmin
DB_PASSWORD=sua_senha_aiven
DB_PORT=26949
DB_NAME=defaultdb
NODE_ENV=production
```

## 📊 Respostas da API

### Formato de Sucesso
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { ... }
}
```

### Formato de Erro
```json
{
  "success": false,
  "message": "Descrição do erro",
  "error": "Detalhes técnicos do erro"
}
```

## 🔒 Segurança

- **Queries parametrizadas** para prevenir SQL Injection
- **Validação de dados** nos controllers
- **SSL/HTTPS** em produção
- **CORS configurado** para controle de origens

## 🐛 Solução de Problemas

### Erros Comuns

1. **"Cannot connect to database"**
   - Verifique as variáveis de ambiente
   - Confirme se o banco está acessível

2. **"SSL certificate" errors**
   - Configure `rejectUnauthorized: false` para desenvolvimento

3. **Swagger não carrega**
   - Verifique o caminho dos arquivos de rota na configuração

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Lucas / Cauã / Marcio**
- GitHub: [@LucasFigs](https://github.com/LucasFigs)
- GitHub: [@cauamilfont](https://github.com/cauamilfont)
- GitHub: [@marciiojr](https://github.com/marciiojr)
- Projeto: [Gerenciador-de-Tarefas](https://github.com/LucasFigs/Gerenciador-de-Tarefas)

## 🙏 Agradecimentos

- Equipe da **Unifor** pelo suporte
- **Aiven** pelo serviço de banco de dados
- **Render** pela plataforma de deploy

---

**📞 Suporte**: Em caso de problemas, abra uma [issue](https://github.com/LucasFigs/Gerenciador-de-Tarefas/issues) no GitHub.

**⭐ Se este projeto foi útil, deixe uma estrela no repositório!**