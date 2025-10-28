import OpenAI from "openai";

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

  const SYSTEM_PROMPT = "You are a helpful assistant.";

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
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...chatHistory,
      ],
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
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
