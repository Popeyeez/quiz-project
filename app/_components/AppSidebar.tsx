"use client";
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

type Article = {
  id: number;
  title: string;
};

export function AppSidebar() {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    };
    fetchArticles();
  }, []);

  return (
    <Sidebar className="mt-13">
      <SidebarHeader className="ml-4 font-bold text-[24px]">
        History
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {Array.isArray(articles) && articles.length > 0 ? (
            articles.map((article) => (
              <div
                key={article.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md"
                onClick={() => router.push(`/quiz?articleId=${article.id}`)}
              >
                <p className="text-sm font-medium">{article.title}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 px-4 py-2">No articles yet</p>
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-center text-gray-500 text-sm py-2">
        End of History
      </SidebarFooter>
    </Sidebar>
  );
}
