import { NextRequest, NextResponse } from "next/server";
import { getAgent, addChatMessage, getChatMessages, addLog } from "@/lib/store";

export const dynamic = "force-dynamic";

// GET — poll for chat messages (supports ?since=ISO timestamp for incremental)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const agent = getAgent(id);
  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const since = req.nextUrl.searchParams.get("since") || undefined;
  const messages = getChatMessages(id, since);
  return NextResponse.json(messages);
}

// POST — send a message and get an AI response via NVIDIA API
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const agent = getAgent(id);
  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const body = await req.json();
  const { message } = body;

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  // Store user message
  const userMsg = addChatMessage(id, {
    role: "user",
    content: message.trim(),
    timestamp: new Date().toISOString(),
    agentId: id,
  });

  // Get API key from env (supports NVIDIA_API_KEY or OPENROUTER_API_KEY)
  const apiKey = process.env.NVIDIA_API_KEY || process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ userMessage: userMsg, error: "NO_API_KEY", detail: "Set NVIDIA_API_KEY or OPENROUTER_API_KEY in Vercel env vars" });
  }

  // Build conversation history for context
  const history = getChatMessages(id);
  const conversationMessages: { role: string; content: string }[] = [];

  // System prompt if available
  if (agent.systemPrompt) {
    conversationMessages.push({ role: "system", content: agent.systemPrompt });
  } else {
    conversationMessages.push({
      role: "system",
      content: `Eres ${agent.name}, un agente de IA del sistema Hermes. Tu rol es: ${agent.role}. ${agent.description}. Responde de forma concisa y util.`,
    });
  }

  // Add last 20 messages for context
  const recentHistory = history.slice(-20);
  for (const msg of recentHistory) {
    conversationMessages.push({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content,
    });
  }

  try {
    const model = agent.config.apiModel || agent.model || process.env.NVIDIA_MODEL || "nvidia/nemotron-3-super-120b-a12b:free";
    const apiBase = process.env.AI_API_BASE || "https://openrouter.ai/api/v1/chat/completions";

    const nvidiaRes = await fetch(apiBase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: conversationMessages,
        temperature: agent.config.temperature || 0.7,
        max_tokens: agent.config.maxTokens || 2048,
      }),
    });

    if (!nvidiaRes.ok) {
      const errText = await nvidiaRes.text();
      addLog({
        agentId: id,
        agentName: agent.name,
        level: "error",
        message: `API error (${nvidiaRes.status}): ${errText.slice(0, 200)}`,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ userMessage: userMsg, error: "API_ERROR", status: nvidiaRes.status, detail: errText.slice(0, 500) });
    }

    const data = await nvidiaRes.json();
    const assistantContent = data.choices?.[0]?.message?.content || "Sin respuesta del modelo.";

    // Store assistant response
    const assistantMsg = addChatMessage(id, {
      role: "assistant",
      content: assistantContent,
      timestamp: new Date().toISOString(),
      agentId: id,
    });

    addLog({
      agentId: id,
      agentName: agent.name,
      level: "info",
      message: `Chat: respuesta generada via NVIDIA API`,
      timestamp: new Date().toISOString(),
    });

    // Return both messages so the UI can show them immediately
    return NextResponse.json({ userMessage: userMsg, assistantMessage: assistantMsg });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "unknown";
    addLog({
      agentId: id,
      agentName: agent.name,
      level: "error",
      message: `Chat error: ${errMsg}`,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ userMessage: userMsg, error: "EXCEPTION", detail: errMsg });
  }
}
