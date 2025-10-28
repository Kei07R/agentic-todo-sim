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
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Load persisted name
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);

    // Load persisted chat history (if available)
    try {
      const raw = localStorage.getItem("chatHistory");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setChatHistory(parsed);
        }
      }
    } catch (e) {
      // ignore malformed storage; keep default greeting
    }
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage = { sender: "user", content: message.trim() };
    // Optimistically render the user's message
    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    setMessage("");

    // Send to Chat API with the expected { role, content } shape
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatHistory: updatedHistory.map((m) => ({
            role: m.role || m.sender, // keep UI shape but send role for API
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      const assistantMessage = {
        sender: "assistant",
        content: data?.message || "No message",
      };
      setChatHistory((prevHistory) => [...prevHistory, assistantMessage]);
    } catch (err) {
      const errorMessage = {
        sender: "assistant",
        content: "Sorry, I couldn't get a response right now.",
      };
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
      // Optionally log error for debugging
      // console.error(err);
    }
  };

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Persist chat history whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    } catch (e) {
      // storage might be full/blocked; fail silently
    }
  }, [chatHistory]);

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {name ? `${name}'s Chat` : "Loading..."}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-60 p-0">
          <ScrollArea className="h-full w-full">
            <div className="flex flex-col gap-3 p-4">
              {chatHistory.map((msg, idx) => {
                const role = msg.role || msg.sender;
                const isUser = (role || "").toLowerCase() === "user";
                const label = isUser ? "User" : "Assistant";
                return (
                  <div
                    key={idx}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="max-w-[75%]">
                      <div
                        className={`text-[10px] uppercase tracking-wide mb-1 ${
                          isUser
                            ? "text-right text-muted-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {label}
                      </div>
                      <div
                        className={`rounded-2xl px-3 py-2 shadow-sm whitespace-pre-wrap break-words ${
                          isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form className="flex w-full space-x-2" onSubmit={handleSendMessage}>
            <Input
              className="flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <Button type="submit" variant="outline">
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chat;
