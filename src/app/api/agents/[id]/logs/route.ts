import { getLogs } from "@/lib/store";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json(getLogs(100, id));
}

export const dynamic = "force-dynamic";
