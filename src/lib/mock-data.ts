import { Agent, LogEntry, SystemMetrics } from "./types";

export const agents: Agent[] = [
  {
    id: "mercury",
    name: "Mercury",
    role: "Comunicaciones",
    description:
      "Agente especializado en comunicaciones, mensajeria y notificaciones entre sistemas.",
    status: "online",
    model: "nvidia/llama-3.1-nemotron-70b",
    uptime: "14d 7h 23m",
    tasksCompleted: 1847,
    tasksRunning: 3,
    avgResponseTime: 245,
    lastActive: "Hace 2 min",
    systemPrompt:
      "Eres Mercury, agente de comunicaciones de Hermes. Gestionas mensajes, notificaciones y coordinacion entre sistemas.",
    config: {
      temperature: 0.7,
      maxTokens: 2048,
      endpoint: "http://192.168.1.100:8080/v1",
      apiModel: "nvidia/llama-3.1-nemotron-70b",
      autoRestart: true,
    },
  },
  {
    id: "apollo",
    name: "Apollo",
    role: "Analisis de Datos",
    description:
      "Agente de analisis de datos, reportes y visualizacion de metricas del sistema.",
    status: "online",
    model: "nvidia/llama-3.1-nemotron-70b",
    uptime: "14d 7h 23m",
    tasksCompleted: 923,
    tasksRunning: 1,
    avgResponseTime: 312,
    lastActive: "Hace 5 min",
    systemPrompt:
      "Eres Apollo, agente de analisis de datos de Hermes. Generas reportes, analizas metricas y produces insights.",
    config: {
      temperature: 0.3,
      maxTokens: 4096,
      endpoint: "http://192.168.1.100:8081/v1",
      apiModel: "nvidia/llama-3.1-nemotron-70b",
      autoRestart: true,
    },
  },
  {
    id: "athena",
    name: "Athena",
    role: "Investigacion",
    description:
      "Agente de investigacion web, recopilacion de informacion y generacion de resumenes.",
    status: "busy",
    model: "nvidia/llama-3.1-nemotron-70b",
    uptime: "12d 3h 45m",
    tasksCompleted: 654,
    tasksRunning: 5,
    avgResponseTime: 1520,
    lastActive: "Ahora",
    systemPrompt:
      "Eres Athena, agente de investigacion de Hermes. Buscas, recopilas y sintetizas informacion de multiples fuentes.",
    config: {
      temperature: 0.5,
      maxTokens: 8192,
      endpoint: "http://192.168.1.100:8082/v1",
      apiModel: "nvidia/llama-3.1-nemotron-70b",
      autoRestart: true,
    },
  },
  {
    id: "prometheus",
    name: "Prometheus",
    role: "Automatizacion",
    description:
      "Agente de automatizacion de tareas, workflows y procesos del servidor.",
    status: "online",
    model: "nvidia/llama-3.1-nemotron-70b",
    uptime: "14d 7h 23m",
    tasksCompleted: 2103,
    tasksRunning: 7,
    avgResponseTime: 189,
    lastActive: "Hace 1 min",
    systemPrompt:
      "Eres Prometheus, agente de automatizacion de Hermes. Ejecutas workflows, scripts y automatizas procesos.",
    config: {
      temperature: 0.2,
      maxTokens: 2048,
      endpoint: "http://192.168.1.100:8083/v1",
      apiModel: "nvidia/llama-3.1-nemotron-70b",
      autoRestart: true,
    },
  },
  {
    id: "iris",
    name: "Iris",
    role: "Soporte",
    description:
      "Agente de soporte al usuario, resolucion de tickets y asistencia tecnica.",
    status: "online",
    model: "nvidia/llama-3.1-nemotron-70b",
    uptime: "10d 22h 15m",
    tasksCompleted: 1456,
    tasksRunning: 2,
    avgResponseTime: 278,
    lastActive: "Hace 8 min",
    systemPrompt:
      "Eres Iris, agente de soporte de Hermes. Ayudas a usuarios, resuelves tickets y proporcionas asistencia tecnica.",
    config: {
      temperature: 0.6,
      maxTokens: 2048,
      endpoint: "http://192.168.1.100:8084/v1",
      apiModel: "nvidia/llama-3.1-nemotron-70b",
      autoRestart: true,
    },
  },
  {
    id: "atlas",
    name: "Atlas",
    role: "Infraestructura",
    description:
      "Agente de monitoreo de infraestructura, health checks y alertas del servidor.",
    status: "error",
    model: "nvidia/llama-3.1-nemotron-70b",
    uptime: "0d 0h 0m",
    tasksCompleted: 789,
    tasksRunning: 0,
    avgResponseTime: 0,
    lastActive: "Hace 2h",
    systemPrompt:
      "Eres Atlas, agente de infraestructura de Hermes. Monitoreas servidores, ejecutas health checks y gestionas alertas.",
    config: {
      temperature: 0.1,
      maxTokens: 1024,
      endpoint: "http://192.168.1.100:8085/v1",
      apiModel: "nvidia/llama-3.1-nemotron-70b",
      autoRestart: true,
    },
  },
];

export function generateLogs(count: number = 50): LogEntry[] {
  const levels: LogEntry["level"][] = ["info", "warn", "error", "debug"];
  const messages: Record<LogEntry["level"], string[]> = {
    info: [
      "Tarea completada exitosamente",
      "Conexion establecida con endpoint",
      "Agente iniciado correctamente",
      "Respuesta enviada al cliente",
      "Modelo cargado en memoria",
      "Health check: OK",
      "Nuevo request procesado",
    ],
    warn: [
      "Tiempo de respuesta elevado: >2000ms",
      "Uso de memoria al 85%",
      "Rate limit cercano al maximo",
      "Reintento de conexion #3",
      "Token limit alcanzado, truncando respuesta",
    ],
    error: [
      "Conexion perdida con endpoint",
      "Error de autenticacion con API de NVIDIA",
      "Timeout en request despues de 30s",
      "Modelo no disponible, fallback activado",
      "Error critico: agente detenido",
    ],
    debug: [
      "Parsing de input completado en 12ms",
      "Cache hit para query similar",
      "Tokens usados: 1234/4096",
      "Latencia de red: 45ms",
    ],
  };

  const logs: LogEntry[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)];
    const agent = agents[Math.floor(Math.random() * agents.length)];
    const msgList = messages[level];
    const msg = msgList[Math.floor(Math.random() * msgList.length)];
    const timestamp = new Date(
      now - i * 60000 * Math.random() * 10
    ).toISOString();

    logs.push({
      id: `log-${i}`,
      agentId: agent.id,
      agentName: agent.name,
      level,
      message: msg,
      timestamp,
    });
  }

  return logs.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export const systemMetrics: SystemMetrics = {
  totalAgents: agents.length,
  onlineAgents: agents.filter(
    (a) => a.status === "online" || a.status === "busy"
  ).length,
  totalTasksToday: 347,
  avgResponseTime: 289,
  cpuUsage: 42,
  memoryUsage: 67,
  requestsPerMinute: 23,
  uptime: "14d 7h 23m",
};
