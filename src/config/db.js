import mysql from "mysql2/promise";

export async function getConnection() {
  // Valida se as variáveis de ambiente existem
  if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD) {
    throw new Error("Variáveis de ambiente do banco não configuradas");
  }

  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || "26949",
    database: process.env.DB_NAME || "defaultdb",
    ssl: {
      rejectUnauthorized: true // Aiven exige SSL
    },
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
  });
}