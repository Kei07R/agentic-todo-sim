"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Something went wrong");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log(data);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("name", data.name);
      setLoading(false);

      router.push("/chat");
    } catch (err) {
      setError(`Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-[300px] justify-center m-auto pt-40">
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <p>Hi, please enter your name to get started!</p>
              <Input
                placeholder="Your Name"
                className="mb-4 mt-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error && (
                <p className="text-destructive mt-[-10px] pb-3">{error}</p>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing In..." : "Sign-In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
