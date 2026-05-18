export type AgentStatus = "online" | "offline" | "busy" | "error";

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  model: string;
  uptime: string;
  tasksCompleted: number;
  tasksRunning: number;
  avgResponseTime: number; // ms
  lastActive: string;
  systemPrompt: string;
  config: AgentConfig;
}

export interface AgentConfig {
  temperature: number;
  maxTokens: number;
  endpoint: string;
  apiModel: string;
  autoRestart: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  agentId: string;
}

export interface LogEntry {
  id: string;
  agentId: string;
  agentName: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  timestamp: string;
}

export interface SystemMetrics {
  totalAgents: number;
  onlineAgents: number;
  totalTasksToday: number;
  avgResponseTime: number;
  cpuUsage: number;
  memoryUsage: number;
  requestsPerMinute: number;
  uptime: string;
}
