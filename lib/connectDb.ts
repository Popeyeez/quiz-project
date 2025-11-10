import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function query(text: string) {
  try {
    const res = await pool.query(text);
    return res;
  } catch (err) {
    console.error("❌ Database query error:", err);
    throw err;
  }
}
