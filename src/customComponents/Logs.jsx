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
import { RefreshCcw } from "lucide-react";

const Logs = () => {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            $USERNAME's Logs
          </CardTitle>
        </CardHeader>
        <CardContent className="h-60 p-0">
          <ScrollArea className="h-full w-full p-4">
            <ul className="space-y-2 list-decimal list-inside">
              <li>Sample Log Entry One</li>
              <li>Sample Log Entry Two</li>
              <li>Sample Log Entry Three</li>
            </ul>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full justify-center">
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh Logs
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Logs;
