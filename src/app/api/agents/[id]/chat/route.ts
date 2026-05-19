import { NextRequest, NextResponse } from "next/server";
import { getAgent, addChatMessage, getChatMessages } from "@/lib/store";

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

// POST — send a message from the dashboard user to an agent
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

  // Store as user message — goes into chat history AND pending queue for agent
  const chatMsg = addChatMessage(id, {
    role: "user",
    content: message.trim(),
    timestamp: new Date().toISOString(),
    agentId: id,
  });

  return NextResponse.json(chatMsg);
}
