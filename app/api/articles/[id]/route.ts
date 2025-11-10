import { NextResponse } from "next/server";
import { query } from "@/lib/connectDb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await query(`SELECT * FROM articles WHERE id=${params.id};`);
    if (result.rows.length === 0)
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
