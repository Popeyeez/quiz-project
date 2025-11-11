"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type QuizQuestion = {
  text: string;
  options: string[];
};

type QuizData = {
  title: string;
  questions: QuizQuestion[];
};

export default function QuizPage() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get("articleId");
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  useEffect(() => {
    if (articleId) {
      const fetchQuiz = async () => {
        try {
          const res = await fetch(`/api/quiz?articleId=${articleId}`);
          const data = await res.json();
          setQuizData(data);
        } catch (err) {
          console.error("Error fetching quiz:", err);
        }
      };
      fetchQuiz();
    }
  }, [articleId]);

  if (!quizData) return <p className="p-4 text-gray-500">Loading quiz...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{quizData.title}</h1>
      <div>
        {quizData.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <p className="font-medium mb-2">{question.text}</p>
            <ul>
              {question.options.map((option, idx) => (
                <li key={idx} className="py-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded">
        Submit
      </button>
    </div>
  );
}
