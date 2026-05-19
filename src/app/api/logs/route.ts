import { getLogs } from "@/lib/store";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(getLogs(100));
}

export const dynamic = "force-dynamic";
