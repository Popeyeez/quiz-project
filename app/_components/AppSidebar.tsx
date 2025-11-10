"use client";
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

type Article = {
  id: number;
  title: string;
};

export function AppSidebar() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Sidebar className="mt-13">
      <SidebarHeader className="ml-4 font-bold text-[24px]">
        History
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {articles.length === 0 ? (
            <p className="text-gray-500 px-4 py-2">No articles yet</p>
          ) : (
            articles.map((article) => (
              <div
                key={article.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                <p className="text-sm font-medium">{article.title}</p>
                <p className="text-xs text-gray-500"></p>
              </div>
            ))
          )}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>End of History</SidebarFooter>
    </Sidebar>
  );
}
