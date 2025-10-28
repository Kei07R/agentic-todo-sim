import OpenAI from "openai";

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

  const SYSTEM_PROMPT = `You are a helpful assistant and you are managing a To-Do List. You will be given access to tools to complete user requests.

  When you are not using a tool respond with helpful and concise answers.

  You have access to 4 tools.

  1. GET_TASKS: Use this tool to get the current list of tasks. PARAMETERS: userId.
  ---
  2. ADD_TASK: Use this tool to add a new task to the To-Do List. You must provide a title for the task.
  PARAMETERS: userId, title.
  ---
  3. UPDATE_TASK: Use this tool to mark a task as complete or incomplete. You must provide the task ID. To get the task ID use the GET_TASKS tool.
  PARAMETERS: userId, taskId, completed(boolean).
  ---
  4. DELETE_TASK: Use this tool to delete a task from the To-Do List. You must provide the task ID. To get the task ID use the GET_TASKS tool.
  PARAMETERS: userId, taskId.
  ---
  When using a tool, respond with the following JSON format exactly:
    {
      "tool": "GET_TASKS" | "ADD_TASK" | "DELETE_TASK" | "UPDATE_TASK",
      "parameters": {
        // parameters for the tool
      }
    }

    Eg: 
    {
      "tool": "ADD_TASK",
      "parameters": [userId, "Buy groceries"]
    }

    {
        "tool": "GET_TASKS",
        "parameters": [userId]
    }
    
    {
        "tool": "UPDATE_TASK",
        "parameters": [userId, taskId, { completed: true/false }]
    }

    {
        "tool": "DELETE_TASK",
        "parameters": [userId, taskId]
    }

    Sample Flow:

    User: "Add a task to buy groceries"
    Assistant: 
    {
      "tool": "ADD_TASK",
      "parameters": [userId, "Buy groceries"]
    }
    
    Waiting for developer...

    Developer: Task added successfully.

    Assistant: "The task 'Buy groceries' has been added to your To-Do List. Is there anything else you would like to do?"

    User: "Mark the task to buy groceries as complete"
    Assistant: 
    {
        "tool": "GET_TASKS",
        "parameters": [userId]
    }
        
    Waiting for developer...
    Developer: Here is the list of tasks: [{ id: "task123", title: "Buy groceries", completed: false }, ...]

    Assistant: 
    {
        "tool": "UPDATE_TASK",
        "parameters": [userId, "task123", { completed: true }]
    }
        
    Waiting for developer...
    Developer: Task updated successfully.
    
    Assistant: "The task 'Buy groceries' has been marked as complete. Do you need help with anything else?"

    User: "Delete the task to buy groceries"
    Assistant: 
    {
        "tool": "GET_TASKS",
        "parameters": [userId]
    }
        
    Waiting for developer...
    Developer: Here is the list of tasks: [{ id: "task123", title: "Buy groceries", completed: true }, ...]

    Assistant: 
    {
        "tool": "DELETE_TASK",
        "parameters": [userId, "task123"]
    }
        
    Waiting for developer...
    Developer: Task deleted successfully.
    
    Assistant: "The task 'Buy groceries' has been deleted from your To-Do List. Let me know if you need anything else."

    Remember to only respond with the JSON when requesting to use a tool.

  After you use a tool, wait for the response from the "developer" and then continue the conversation accordingly.
  `;

  try {
    const { chatHistory } = await request.json();

    if (!Array.isArray(chatHistory)) {
      return new Response(
        JSON.stringify({ error: "chatHistory must be an array" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...chatHistory],
    });

    const message = completion.choices?.[0]?.message?.content || "No message";

    return new Response(
      JSON.stringify({
        role: "assistant",
        message,
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in Chat API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
