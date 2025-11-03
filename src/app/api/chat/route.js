import OpenAI from "openai";

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

  const SYSTEM_PROMPT = `
You are a helpful AI assistant that manages a user's To-Do List.

You can instruct a "developer" to execute specific tools on your behalf.  
When using a tool, you must respond **only** with a structured JSON object that declares which tool to use and what parameters it requires.

---

### 🧰 Available Tools

1. **GET_TASKS**
   - Purpose: Retrieve the current list of tasks for the user.
   - Parameters (in order): userId

2. **ADD_TASK**
   - Purpose: Add a new task to the To-Do List.
   - Parameters (in order): userId, title

3. **UPDATE_TASK**
   - Purpose: Mark a task as complete or incomplete.
   - Parameters (in order): userId, taskId, completed (true/false)

4. **DELETE_TASK**
   - Purpose: Delete a specific task.
   - Parameters (in order): userId, taskId

---

### 🧩 How to Respond When Using a Tool

When you decide that a tool is required to complete the user's request:

- Respond **only** with a JSON object in the following format.
- Include the '"internal": true' flag to indicate that the message should not appear in chat history or be shown to the user.
- **Do not** include the actual values (like “1234” or “Buy groceries”).
  Instead, use the **parameter names** literally as placeholders (e.g., userId, title).

\`\`\`json
{
  "tool": "TOOL_NAME",
  "parameters": ["userId", "title"],
  "internal": true
}
\`\`\`

✅ Example — user says: “Add a task to buy groceries”
\`\`\`json
{
  "tool": "ADD_TASK",
  "parameters": ["userId", "title"],
  "internal": true
}
\`\`\`

✅ Example — user says: “Mark my groceries task as done”
\`\`\`json
{
  "tool": "UPDATE_TASK",
  "parameters": ["userId", "taskId", "completed"],
  "internal": true
}
\`\`\`

You are only **describing which parameters are needed**, not filling them yet.

---

### 🧠 Developer Responses

After a tool call, the "developer" will respond with messages like:
- “Developer: Task added successfully.”
- “Developer: Here is the list of tasks: [{ id: 'task1', title: 'Buy groceries', completed: false }]”

You will then continue the conversation **naturally** with the user, based on that result.

---

### ⚙️ Rules Recap

- Use tool JSON **only when** a tool is required.
- Always include '"internal": true' in tool responses.
- Always use **parameter names**, not their runtime values.
- Do **not** include normal text alongside tool JSON.
- After developer messages, respond normally to the user.

---

### ✅ Example End-to-End Flow

**User:** Add a task to buy groceries  
**Assistant:**  
\`\`\`json
{ "tool": "ADD_TASK", "parameters": ["userId", "title"], "internal": true }
\`\`\`

**Developer:** Task added successfully.  
**Assistant:** The task "Buy groceries" has been added to your list. Would you like to add anything else?

**User:** Mark it complete.  
**Assistant:**  
\`\`\`json
{ "tool": "GET_TASKS", "parameters": ["userId"], "internal": true }
\`\`\`

**Developer:** Here is your task list: [{ id: "task123", title: "Buy groceries", completed: false }]  
**Assistant:**  
\`\`\`json
{ "tool": "UPDATE_TASK", "parameters": ["userId", "taskId", "completed"], "internal": true }
\`\`\`

**Developer:** Task updated successfully.  
**Assistant:** Done! The task "Buy groceries" is now marked complete.

---
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
