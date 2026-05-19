import { NextRequest, NextResponse } from "next/server";
import { getAgent, addChatMessage, addLog } from "@/lib/store";

export const dynamic = "force-dynamic";

/**
 * Webhook endpoint for external systems (Telegram, Slack, etc.) to relay
 * messages into the Mission Control chat.
 *
 * POST /api/webhook/chat
 * Body: { agent_id, message, role?, source? }
 *
 * - role "user"      → message FROM the user, queued for agent pickup
 * - role "assistant"  → message FROM the agent (e.g. relayed from Telegram)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agent_id, message, role, source } = body;

    if (!agent_id || !message) {
      return NextResponse.json(
        { error: "agent_id and message are required" },
        { status: 400 }
      );
    }

    const agent = getAgent(agent_id);
    if (!agent) {
      return NextResponse.json(
        { error: `Agent '${agent_id}' not found` },
        { status: 404 }
      );
    }

    const msgRole = role === "assistant" ? "assistant" : "user";

    const chatMsg = addChatMessage(agent_id, {
      role: msgRole,
      content: message,
      timestamp: new Date().toISOString(),
      agentId: agent_id,
    });

    addLog({
      agentId: agent_id,
      agentName: agent.name,
      level: "info",
      message: `Webhook chat (${source || "external"}): ${msgRole === "user" ? "mensaje recibido" : "respuesta del agente"}`,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message_id: chatMsg.id,
      agent_id,
      role: msgRole,
      source: source || "webhook",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
