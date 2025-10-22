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

const Chat = () => {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            $USERNAME's Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="h-60 p-0">
          <ScrollArea className="h-full w-full p-4 flex flex-col space-y-2">
            <ul className="space-y-2">
              <li>Sample Chat Message One</li>
              <li>Sample Chat Message Two</li>
              <li>Sample Chat Message Three</li>
            </ul>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form className="flex w-full space-x-2">
            <Input className="flex-1" placeholder="Type your message here..." />
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
