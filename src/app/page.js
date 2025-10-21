import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-w-full min-h-full flex flex-col items-center justify-center gap-4">
        <div className="bg-card flex flex-col gap-4 items-center border-2 p-10 rounded-lg shadow-lg">
          <p className="text-lg font-medium"> Hello, may I have your name? </p>
          <form className="flex flex-col gap-4 items-center">
            <input
              type="text"
              placeholder="Your name"
              className="border border-border rounded-md p-3 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Link href="/home">
              <Button className="min-w-full max-w-[300px] shadow-lg">Sign-In</Button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
