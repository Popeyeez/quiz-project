"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("Failed to save article");

      const data = await res.json();

      alert("Article saved successfully!");
      setTitle("");
      setContent("");

      console.log("Saved article:", data);
    } catch (err) {
      console.error(err);
      alert("Error saving article");
    }
  }

  return (
    <div className="flex justify-center items-center w-full bg-gray-100 h-screen">
      <div className="flex flex-col gap-5 bg-white w-[600px] h-[400px] p-8 rounded-xl shadow">
        <h1 className="text-2xl font-semibold text-center">
          Article Quiz Generator
        </h1>

        <label className="font-medium">Article Title</label>
        <Input
          placeholder="Enter your article title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="font-medium">Article Content</label>
        <Input
          placeholder="Paste your article here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button onClick={handleSubmit}>Save Article</Button>
      </div>
    </div>
  );
}
