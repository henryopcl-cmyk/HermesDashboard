import { generateLogs } from "@/lib/mock-data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const allLogs = generateLogs(100);
  const agentLogs = allLogs.filter((l) => l.agentId === id);
  return NextResponse.json(agentLogs);
}
