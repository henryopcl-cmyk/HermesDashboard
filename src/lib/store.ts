import { Agent, LogEntry, SystemMetrics } from "./types";
import { agents as mockAgents, generateLogs, systemMetrics as mockMetrics } from "./mock-data";

// In-memory store — persists as long as the serverless function is warm.
// For production, replace with a database (Vercel KV, Supabase, etc.)

const agentMap = new Map<string, Agent>();
const logEntries: LogEntry[] = [];

// Initialize with mock data
for (const a of mockAgents) {
  agentMap.set(a.id, { ...a });
}
for (const l of generateLogs(50)) {
  logEntries.push(l);
}

// ── Agent operations ──

export function getAgents(): Agent[] {
  return Array.from(agentMap.values());
}

export function getAgent(id: string): Agent | undefined {
  return agentMap.get(id);
}

export function upsertAgent(data: Partial<Agent> & { id: string }): Agent {
  const existing = agentMap.get(data.id);
  const agent: Agent = existing
    ? { ...existing, ...data, lastActive: new Date().toISOString() }
    : {
        id: data.id,
        name: data.name || data.id,
        role: data.role || "General",
        description: data.description || "",
        status: data.status || "online",
        model: data.model || "nvidia/llama-3.1-nemotron-70b",
        uptime: data.uptime || "0d 0h 0m",
        tasksCompleted: data.tasksCompleted || 0,
        tasksRunning: data.tasksRunning || 0,
        avgResponseTime: data.avgResponseTime || 0,
        lastActive: new Date().toISOString(),
        systemPrompt: data.systemPrompt || "",
        config: data.config || {
          temperature: 0.7,
          maxTokens: 2048,
          endpoint: "",
          apiModel: "nvidia/llama-3.1-nemotron-70b",
          autoRestart: true,
        },
      };
  agentMap.set(data.id, agent);
  return agent;
}

export function updateAgentStatus(
  id: string,
  status: Agent["status"],
  extra?: Partial<Agent>
): Agent | null {
  const agent = agentMap.get(id);
  if (!agent) return null;
  const updated = {
    ...agent,
    ...extra,
    status,
    lastActive: new Date().toISOString(),
  };
  agentMap.set(id, updated);
  return updated;
}

// ── Log operations ──

export function getLogs(limit = 100, agentId?: string): LogEntry[] {
  let filtered = agentId
    ? logEntries.filter((l) => l.agentId === agentId)
    : logEntries;
  return filtered
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export function addLog(entry: Omit<LogEntry, "id">): LogEntry {
  const log: LogEntry = { ...entry, id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` };
  logEntries.push(log);
  // Keep last 500 logs in memory
  if (logEntries.length > 500) logEntries.splice(0, logEntries.length - 500);
  return log;
}

// ── Metrics ──

export function getMetrics(): SystemMetrics {
  const agents = getAgents();
  return {
    totalAgents: agents.length,
    onlineAgents: agents.filter((a) => a.status === "online" || a.status === "busy").length,
    totalTasksToday: agents.reduce((sum, a) => sum + a.tasksCompleted, 0),
    avgResponseTime: Math.round(
      agents.filter((a) => a.avgResponseTime > 0).reduce((sum, a) => sum + a.avgResponseTime, 0) /
        (agents.filter((a) => a.avgResponseTime > 0).length || 1)
    ),
    cpuUsage: mockMetrics.cpuUsage,
    memoryUsage: mockMetrics.memoryUsage,
    requestsPerMinute: mockMetrics.requestsPerMinute,
    uptime: mockMetrics.uptime,
  };
}
