import { createHermesMcpServer } from "@/lib/mcp-server";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { NextRequest } from "next/server";

async function handleMcpRequest(req: Request): Promise<Response> {
  const server = createHermesMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined });

  await server.connect(transport);

  const response = await transport.handleRequest(req);
  return response;
}

export async function POST(req: NextRequest) {
  const response = await handleMcpRequest(req);
  return response;
}

export async function GET(req: NextRequest) {
  // SSE endpoint or info
  try {
    const response = await handleMcpRequest(req);
    return response;
  } catch {
    return new Response(JSON.stringify({
      name: "hermes-mission-control",
      version: "1.0.0",
      protocol: "MCP Streamable HTTP",
      description: "Hermes Mission Control MCP Server - Conecta tus agentes aqui",
      endpoint: "/api/mcp",
      tools: [
        "register_agent - Registra un agente en Mission Control",
        "report_status - Reporta estado de un agente",
        "send_log - Envia un log",
        "get_dashboard_status - Obtiene metricas y estado",
        "get_agent_logs - Obtiene logs de un agente",
        "complete_task - Reporta tarea completada",
      ],
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

export async function DELETE(req: NextRequest) {
  const response = await handleMcpRequest(req);
  return response;
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, mcp-session-id",
    },
  });
}

export const dynamic = "force-dynamic";
