import mysql from "mysql2/promise";

export async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST, // REMOVIDO localhost - usa só a variável de ambiente
    user: process.env.DB_USER, // REMOVIDO "root"
    password: process.env.DB_PASSWORD, // REMOVIDO ""
    port: process.env.DB_PORT || "3306", // Mantém a porta padrão se não especificada
    database: process.env.DB_NAME, // REMOVIDO "Tarefas_DB"
    // Configurações para produção
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
  });
}