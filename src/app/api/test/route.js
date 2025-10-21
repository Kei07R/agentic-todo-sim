import { connectDB } from "@/lib/mongodb";

export async function GET() {
    try {
        await connectDB();
        return Response.json({ message: "Database connected successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Database connection failed", error: error.message }, { status: 500 });
    }
}