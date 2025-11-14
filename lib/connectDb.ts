import { sql } from "@vercel/postgres";

export async function getArticles() {
  try {
    const result = await sql`SELECT * FROM articles ORDER BY id DESC;`;
    return result.rows;
  } catch (err) {
    console.error("getArticles error:", err);
    throw err;
  }
}

export async function getArticleById(id: string) {
  try {
    const result = await sql`SELECT * FROM articles WHERE id = ${id};`;
    return result.rows[0];
  } catch (err) {
    console.error("getArticleById error:", err);
    throw err;
  }
}
