// API's for Modifying the Todo List

export async function GET(){
    const userId = localStorage.getItem("userId");
    const user = await User.findById(userId);
    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(user.tasks), { status: 200 });
}