import { NextResponse } from "next/server";
import { query } from "@/lib/connectDb";

export async function GET() {
  try {
    const result = await query("SELECT * FROM articles ORDER BY id DESC;");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();
    if (!title || !content)
      return NextResponse.json(
        { error: "Title and content required" },
        { status: 400 }
      );

    const result = await query(`
      INSERT INTO articles (title, content)
      VALUES ('${title}', '${content}')
      RETURNING *;
    `);

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting article:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
