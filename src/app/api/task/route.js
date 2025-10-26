// API's for Modifying the Todo List
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function GET(request) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
    });
  }

  try {
    await connectDB();

    const user = await User.findOne({ userId }).select("tasks");
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ tasks: user.tasks }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
