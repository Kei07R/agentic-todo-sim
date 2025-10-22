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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCcw, SendHorizontal, SquarePlus } from "lucide-react";
import Todo from "@/customComponents/Todo";
import Chat from "@/customComponents/Chat";
import Logs from "@/customComponents/Logs";

const ChatPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Tabs defaultValue="To-Do's" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="To-Do's">To-Do's</TabsTrigger>
          <TabsTrigger value="Chat">Chat</TabsTrigger>
          <TabsTrigger value="Logs">Logs</TabsTrigger>
        </TabsList>

        {/* To-Do Tab */}
        <TabsContent value="To-Do's">
          <Todo />
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent value="Chat">
          <Chat />
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="Logs">
          <Logs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatPage;
