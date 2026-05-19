import { Agent, ChatMessage, LogEntry, SystemMetrics } from "./types";

// In-memory store — persists as long as the serverless function is warm.
// For production, replace with a database (Vercel KV, Supabase, etc.)

const agentMap = new Map<string, Agent>();
const logEntries: LogEntry[] = [];
const chatMessages = new Map<string, ChatMessage[]>(); // agentId -> messages
const pendingMessages = new Map<string, ChatMessage[]>(); // agentId -> undelivered user msgs

// No mock agents — only real agents connected via MCP will appear.

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

export function deleteAgent(id: string): boolean {
  return agentMap.delete(id);
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
  const filtered = agentId
    ? logEntries.filter((l) => l.agentId === agentId)
    : logEntries;
  return filtered
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export function addLog(entry: Omit<LogEntry, "id">): LogEntry {
  const log: LogEntry = { ...entry, id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` };
  logEntries.push(log);
  if (logEntries.length > 500) logEntries.splice(0, logEntries.length - 500);
  return log;
}

// ── Chat operations ──

export function addChatMessage(agentId: string, msg: Omit<ChatMessage, "id">): ChatMessage {
  const message: ChatMessage = { ...msg, id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` };
  const list = chatMessages.get(agentId) || [];
  list.push(message);
  if (list.length > 200) list.splice(0, list.length - 200);
  chatMessages.set(agentId, list);

  // If it's a user message, also add to pending queue for the agent to pick up
  if (msg.role === "user") {
    const pending = pendingMessages.get(agentId) || [];
    pending.push(message);
    pendingMessages.set(agentId, pending);
  }
  return message;
}

export function getChatMessages(agentId: string, since?: string): ChatMessage[] {
  const list = chatMessages.get(agentId) || [];
  if (!since) return list;
  const sinceTime = new Date(since).getTime();
  return list.filter((m) => new Date(m.timestamp).getTime() > sinceTime);
}

export function getPendingMessages(agentId: string): ChatMessage[] {
  const pending = pendingMessages.get(agentId) || [];
  // Clear after reading
  pendingMessages.set(agentId, []);
  return pending;
}

export function getAllPendingMessages(): { agentId: string; messages: ChatMessage[] }[] {
  const result: { agentId: string; messages: ChatMessage[] }[] = [];
  pendingMessages.forEach((msgs, agentId) => {
    if (msgs.length > 0) {
      result.push({ agentId, messages: [...msgs] });
      pendingMessages.set(agentId, []);
    }
  });
  return result;
}

// ── Metrics ──

export function getMetrics(): SystemMetrics {
  const agents = getAgents();
  const withResponse = agents.filter((a) => a.avgResponseTime > 0);
  return {
    totalAgents: agents.length,
    onlineAgents: agents.filter((a) => a.status === "online" || a.status === "busy").length,
    totalTasksToday: agents.reduce((sum, a) => sum + a.tasksCompleted, 0),
    avgResponseTime: withResponse.length
      ? Math.round(withResponse.reduce((sum, a) => sum + a.avgResponseTime, 0) / withResponse.length)
      : 0,
    cpuUsage: 0,
    memoryUsage: 0,
    requestsPerMinute: 0,
    uptime: agents.length > 0 ? "Activo" : "Sin agentes",
  };
}
