import OpenAI from "openai";

export async function GET(request) {

  const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

  const SYSTEM_PROMPT = `You are a helpful assistant.`;  

  try {
    const completion = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: "Hello, how are you?" },
      ],
    });

    const message = completion.choices?.[0]?.message?.content || "No message";

    return new Response(
      JSON.stringify({
        message: "Chat API is working ✅",
        modelResponse: message,
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
