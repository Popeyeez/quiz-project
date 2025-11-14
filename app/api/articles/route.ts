import { NextResponse } from "next/server";
import { getArticles, createArticle } from "@/lib/connectDb";

export async function GET() {
  try {
    const articles = await getArticles();
    return NextResponse.json(articles);
  } catch (err) {
    console.error("GET /api/articles error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content required" },
        { status: 400 }
      );
    }

    const article = await createArticle(title, content);
    return NextResponse.json(article);
  } catch (err) {
    console.error("POST /api/articles error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
