import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getAgents, getAgent, upsertAgent, deleteAgent, updateAgentStatus, addLog, getLogs, getMetrics } from "./store";

export function createHermesMcpServer(): McpServer {
  const server = new McpServer({
    name: "hermes-mission-control",
    version: "1.0.0",
  });

  // ── Tool: register_agent ──
  server.tool(
    "register_agent",
    "Registra un nuevo agente o actualiza uno existente en Mission Control",
    {
      id: z.string().describe("ID unico del agente (ej: 'mercury', 'apollo')"),
      name: z.string().describe("Nombre del agente"),
      role: z.string().describe("Rol del agente (ej: 'Comunicaciones', 'Analisis')"),
      description: z.string().optional().describe("Descripcion del agente"),
      model: z.string().optional().describe("Modelo que usa el agente"),
      system_prompt: z.string().optional().describe("System prompt del agente"),
      endpoint: z.string().optional().describe("Endpoint del agente en el servidor"),
    },
    async ({ id, name, role, description, model, system_prompt, endpoint }) => {
      const agent = upsertAgent({
        id,
        name,
        role,
        description: description || "",
        model: model || "nvidia/llama-3.1-nemotron-70b",
        status: "online",
        systemPrompt: system_prompt || "",
        config: {
          temperature: 0.7,
          maxTokens: 2048,
          endpoint: endpoint || "",
          apiModel: model || "nvidia/llama-3.1-nemotron-70b",
          autoRestart: true,
        },
      });

      addLog({
        agentId: id,
        agentName: name,
        level: "info",
        message: `Agente ${name} registrado en Mission Control`,
        timestamp: new Date().toISOString(),
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ success: true, agent }, null, 2),
          },
        ],
      };
    }
  );

  // ── Tool: report_status ──
  server.tool(
    "report_status",
    "Reporta el estado actual de un agente a Mission Control",
    {
      agent_id: z.string().describe("ID del agente"),
      status: z.enum(["online", "offline", "busy", "error"]).describe("Estado actual"),
      tasks_running: z.number().optional().describe("Numero de tareas en ejecucion"),
      tasks_completed: z.number().optional().describe("Total de tareas completadas"),
      avg_response_time: z.number().optional().describe("Tiempo de respuesta promedio en ms"),
      uptime: z.string().optional().describe("Uptime del agente (ej: '14d 7h 23m')"),
    },
    async ({ agent_id, status, tasks_running, tasks_completed, avg_response_time, uptime }) => {
      const agent = updateAgentStatus(agent_id, status, {
        tasksRunning: tasks_running,
        tasksCompleted: tasks_completed,
        avgResponseTime: avg_response_time,
        uptime,
      });

      if (!agent) {
        return {
          content: [{ type: "text" as const, text: JSON.stringify({ error: "Agent not found" }) }],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ success: true, agent_id, status }),
          },
        ],
      };
    }
  );

  // ── Tool: send_log ──
  server.tool(
    "send_log",
    "Envia una entrada de log a Mission Control",
    {
      agent_id: z.string().describe("ID del agente que envia el log"),
      agent_name: z.string().describe("Nombre del agente"),
      level: z.enum(["info", "warn", "error", "debug"]).describe("Nivel del log"),
      message: z.string().describe("Mensaje del log"),
    },
    async ({ agent_id, agent_name, level, message }) => {
      const log = addLog({
        agentId: agent_id,
        agentName: agent_name,
        level,
        message,
        timestamp: new Date().toISOString(),
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ success: true, log_id: log.id }),
          },
        ],
      };
    }
  );

  // ── Tool: get_dashboard_status ──
  server.tool(
    "get_dashboard_status",
    "Obtiene el estado actual de todos los agentes y metricas del sistema",
    {},
    async () => {
      const agents = getAgents();
      const metrics = getMetrics();

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ agents, metrics }, null, 2),
          },
        ],
      };
    }
  );

  // ── Tool: get_agent_logs ──
  server.tool(
    "get_agent_logs",
    "Obtiene los logs recientes de un agente especifico",
    {
      agent_id: z.string().describe("ID del agente"),
      limit: z.number().optional().describe("Numero maximo de logs (default 20)"),
    },
    async ({ agent_id, limit }) => {
      const logs = getLogs(limit || 20, agent_id);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(logs, null, 2),
          },
        ],
      };
    }
  );

  // ── Tool: complete_task ──
  server.tool(
    "complete_task",
    "Reporta que un agente completo una tarea",
    {
      agent_id: z.string().describe("ID del agente"),
      task_description: z.string().describe("Descripcion de la tarea completada"),
    },
    async ({ agent_id, task_description }) => {
      const agent = getAgent(agent_id);
      if (!agent) {
        return {
          content: [{ type: "text" as const, text: JSON.stringify({ error: "Agent not found" }) }],
          isError: true,
        };
      }

      updateAgentStatus(agent_id, agent.status, {
        tasksCompleted: agent.tasksCompleted + 1,
        tasksRunning: Math.max(0, agent.tasksRunning - 1),
      });

      addLog({
        agentId: agent_id,
        agentName: agent.name,
        level: "info",
        message: `Tarea completada: ${task_description}`,
        timestamp: new Date().toISOString(),
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ success: true, tasks_completed: agent.tasksCompleted + 1 }),
          },
        ],
      };
    }
  );

  // ── Tool: delete_agent ──
  server.tool(
    "delete_agent",
    "Elimina un agente de Mission Control",
    {
      agent_id: z.string().describe("ID del agente a eliminar"),
    },
    async ({ agent_id }) => {
      const agent = getAgent(agent_id);
      if (!agent) {
        return {
          content: [{ type: "text" as const, text: JSON.stringify({ error: "Agent not found" }) }],
          isError: true,
        };
      }

      const name = agent.name;
      deleteAgent(agent_id);

      addLog({
        agentId: agent_id,
        agentName: name,
        level: "warn",
        message: `Agente ${name} eliminado de Mission Control`,
        timestamp: new Date().toISOString(),
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ success: true, deleted: agent_id, name }),
          },
        ],
      };
    }
  );

  return server;
}
