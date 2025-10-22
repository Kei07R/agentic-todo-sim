"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Chat = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <Tabs defaultValue="To-Do's" className="items-center w-[400px]">
          <TabsList>
            <TabsTrigger value="To-Do's">To-Do's</TabsTrigger>
            <TabsTrigger value="Chat">Chat</TabsTrigger>
            <TabsTrigger value="Logs">Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="To-Do's">
            Make changes to your To-Do's here.
          </TabsContent>
          <TabsContent value="Chat">
            Chat here
          </TabsContent>
          <TabsContent value="Logs">
            View your logs here.
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Chat;
