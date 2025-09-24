import { getConnection } from "../config/db.js";

export async function executarSQL(query) {
    const conn = await getConnection();
    const [result] = await conn.query(query);
    conn.end();
    return result;
}
