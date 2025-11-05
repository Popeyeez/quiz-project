import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full bg-gray-100 h-screen">
      <div className="flex flex-col gap-5 bg-white w-[600px] h-[400px] p-8 rounded-xl shadow">
        <h1 className="text-2xl font-semibold text-center">
          Article Quiz Generator
        </h1>
        <p className="text-gray-600 text-sm text-center">
          Paste your article below to generate a summary and quiz questions.
          Your articles will be saved in the sidebar for future reference.
        </p>

        <label className="font-medium">Article Title</label>
        <Input placeholder="Enter your article title..." />

        <label className="font-medium">Article Content</label>
        <Input placeholder="Paste your article here..." />
      </div>
    </div>
  );
}
