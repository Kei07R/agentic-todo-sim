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
import { SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";

const Todo = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, [])

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {(name) ? `${name}'s To-Do List` : "Loading..."}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-60 p-0">
          <ScrollArea className="h-full w-full p-4">
            <ul className="space-y-2 list-decimal list-inside">
              <li>Sample To-Do Item One</li>
              <li>Sample To-Do Item Two</li>
              <li>Sample To-Do Item Three</li>
            </ul>
          </ScrollArea>
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
