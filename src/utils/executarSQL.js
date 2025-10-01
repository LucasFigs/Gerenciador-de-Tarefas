import { getConnection } from "../config/db.js";

export async function executarSQL(query, params = []) {
  let conn;
  try {
    conn = await getConnection();
    const [result] = await conn.query(query, params); // ✅ Passa os parâmetros aqui
    return result;
  } catch (error) {
    console.error("Erro ao executar SQL:", error);
    throw error;
  } finally {
    if (conn) {
      await conn.end();
    }
  }
}