"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RefreshCcw, SquarePlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

const Todo = () => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  //Fetch Todo list API Call
  const fetchTodos = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await fetch(`/api/task?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("[fetchTodos] fetched tasks:", data?.tasks);
        setTodos(Array.isArray(data?.tasks) ? data.tasks : []);
      } else {
        console.error("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Log when todos state actually changes (after setTodos resolves in a render)
  useEffect(() => {
    console.log("[useEffect] todos updated:", todos);
  }, [todos]);

  // Helpers to group tasks by date buckets: today, yesterday, day before yesterday
  const startOfDay = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const grouped = (() => {
    const todayStart = startOfDay(new Date());
    const buckets = { today: [], yesterday: [], twoDaysAgo: [] };
    const byRecent = (a, b) => new Date(b?.date || 0) - new Date(a?.date || 0);

    for (const t of todos || []) {
      if (!t?.date) continue;
      const tStart = startOfDay(new Date(t.date));
      const diffDays = Math.round(
        (todayStart - tStart) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === 0) buckets.today.push(t);
      else if (diffDays === 1) buckets.yesterday.push(t);
      else if (diffDays === 2) buckets.twoDaysAgo.push(t);
    }
    buckets.today.sort(byRecent);
    buckets.yesterday.sort(byRecent);
    buckets.twoDaysAgo.sort(byRecent);
    return buckets;
  })();

  return (
    <div>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {name ? `${name}'s To-Do List` : "Loading..."}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchTodos}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col h-64 sm:h-72 md:h-80 max-h-[70vh]">
            <Tabs defaultValue="today" className="flex h-full w-full flex-col">
              <div className="px-3 pt-3 md:px-4">
                <TabsList className="flex w-full gap-2 overflow-x-auto md:grid md:grid-cols-3 md:gap-0 md:overflow-visible">
                  <TabsTrigger value="today">
                    Today{` (${grouped.today.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="yesterday">
                    Yesterday{` (${grouped.yesterday.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="twoDaysAgo">
                    Day Before{` (${grouped.twoDaysAgo.length})`}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="today"
                className="flex-1 overflow-hidden px-3 pb-3 md:px-4 md:pb-4"
              >
                <ScrollArea className="h-full w-full">
                  {grouped.today.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                      No tasks for today.
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {grouped.today.map((t) => {
                        const dateStr = t?.date
                          ? new Date(t.date).toLocaleString()
                          : "";
                        return (
                          <li
                            key={t.id}
                            className="flex items-center justify-between rounded-md border p-3"
                          >
                            <div className="min-w-0">
                              <div
                                className={`truncate ${
                                  t.completed
                                    ? "line-through text-muted-foreground"
                                    : ""
                                }`}
                                title={t.title}
                              >
                                {t.title}
                              </div>
                              {dateStr && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {dateStr}
                                </div>
                              )}
                            </div>
                            <Button variant="outline" size="sm" disabled>
                              {t.completed ? "Completed" : "Pending"}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent
                value="yesterday"
                className="flex-1 overflow-hidden px-3 pb-3 md:px-4 md:pb-4"
              >
                <ScrollArea className="h-full w-full">
                  {grouped.yesterday.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                      No tasks for yesterday.
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {grouped.yesterday.map((t) => {
                        const dateStr = t?.date
                          ? new Date(t.date).toLocaleString()
                          : "";
                        return (
                          <li
                            key={t.id}
                            className="flex items-center justify-between rounded-md border p-3"
                          >
                            <div className="min-w-0">
                              <div
                                className={`truncate ${
                                  t.completed
                                    ? "line-through text-muted-foreground"
                                    : ""
                                }`}
                                title={t.title}
                              >
                                {t.title}
                              </div>
                              {dateStr && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {dateStr}
                                </div>
                              )}
                            </div>
                            <Button variant="outline" size="sm" disabled>
                              {t.completed ? "Completed" : "Pending"}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent
                value="twoDaysAgo"
                className="flex-1 overflow-hidden px-3 pb-3 md:px-4 md:pb-4"
              >
                <ScrollArea className="h-full w-full">
                  {grouped.twoDaysAgo.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                      No tasks for the day before yesterday.
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {grouped.twoDaysAgo.map((t) => {
                        const dateStr = t?.date
                          ? new Date(t.date).toLocaleString()
                          : "";
                        return (
                          <li
                            key={t.id}
                            className="flex items-center justify-between rounded-md border p-3"
                          >
                            <div className="min-w-0">
                              <div
                                className={`truncate ${
                                  t.completed
                                    ? "line-through text-muted-foreground"
                                    : ""
                                }`}
                                title={t.title}
                              >
                                {t.title}
                              </div>
                              {dateStr && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {dateStr}
                                </div>
                              )}
                            </div>
                            <Button variant="outline" size="sm" disabled>
                              {t.completed ? "Completed" : "Pending"}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full justify-center">
            <SquarePlus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Todo;
