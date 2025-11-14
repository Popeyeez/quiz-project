import { NextResponse } from "next/server";
import { getArticleById } from "@/lib/connectDb";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get("articleId");
    if (!articleId)
      return NextResponse.json(
        { error: "No articleId provided" },
        { status: 400 }
      );

    const article = await getArticleById(articleId);
    if (!article)
      return NextResponse.json({ error: "Article not found" }, { status: 404 });

    // AI prompt
    const prompt = `
Create 3 multiple-choice questions from the following article.
Each question should have 1 correct answer and 3 plausible wrong answers.
Article title: ${article.title}
Article content: ${article.content}
Output ONLY valid JSON like:
{
  "title": "${article.title}",
  "content": "${article.content}",
  "questions": [
    {"text": "Question 1?", "options": ["Correct", "Wrong1", "Wrong2", "Wrong3"]},
    {"text": "Question 2?", "options": ["Correct", "Wrong1", "Wrong2", "Wrong3"]},
    {"text": "Question 3?", "options": ["Correct", "Wrong1", "Wrong2", "Wrong3"]}
  ]
}
Do not include any extra text.
`;

    let quiz = {
      title: article.title,
      content: article.content,
      questions: [],
    };

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });

      const aiText = completion.choices[0].message?.content || "{}";
      const parsed = JSON.parse(aiText);

      // AI-с ирсэн JSON зөв бол үүнийг ашиглана
      if (parsed.questions && Array.isArray(parsed.questions)) {
        quiz = parsed;
      }
    } catch (aiErr) {
      console.error("OpenAI quiz generation error:", aiErr);
      // AI алдаа гарсан ч fallback-тай quiz өгнө
    }

    return NextResponse.json(quiz);
  } catch (err) {
    console.error("GET /api/quiz error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
