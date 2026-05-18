"use client";

import { useEffect, useState } from "react";
import { Agent, SystemMetrics, LogEntry } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";

export default function MissionControl() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    fetch("/api/agents")
      .then((r) => r.json())
      .then(setAgents);
    fetch("/api/metrics")
      .then((r) => r.json())
      .then(setMetrics);
    fetch("/api/logs")
      .then((r) => r.json())
      .then((data: LogEntry[]) => setLogs(data.slice(0, 15)));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Mission Control</h1>
        <p className="text-sm text-muted mt-1">
          Monitoreo en tiempo real de los agentes Hermes
        </p>
      </div>

      {/* Metrics Grid */}
      {metrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Agentes Online"
            value={`${metrics.onlineAgents}/${metrics.totalAgents}`}
            color="text-success"
          />
          <MetricCard
            label="Tareas Hoy"
            value={metrics.totalTasksToday.toString()}
            color="text-accent"
          />
          <MetricCard
            label="Tiempo Resp."
            value={`${metrics.avgResponseTime}ms`}
            color="text-warning"
          />
          <MetricCard
            label="Req/min"
            value={metrics.requestsPerMinute.toString()}
            color="text-foreground"
          />
        </div>
      )}

      {/* System Resources */}
      {metrics && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ResourceBar label="CPU" value={metrics.cpuUsage} />
          <ResourceBar label="Memoria" value={metrics.memoryUsage} />
          <div className="bg-card border border-card-border rounded-xl p-4">
            <p className="text-xs text-muted mb-1">Uptime del Servidor</p>
            <p className="text-lg font-mono text-white">{metrics.uptime}</p>
          </div>
        </div>
      )}

      {/* Agents Grid + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Agents */}
        <div className="xl:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
            Agentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {agents.map((agent) => (
              <Link key={agent.id} href={`/agents/${agent.id}`}>
                <div className="bg-card border border-card-border rounded-xl p-4 hover:border-accent/40 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-accent transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-xs text-muted">{agent.role}</p>
                    </div>
                    <StatusBadge status={agent.status} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-mono text-white">
                        {agent.tasksRunning}
                      </p>
                      <p className="text-[10px] text-muted">Activas</p>
                    </div>
                    <div>
                      <p className="text-lg font-mono text-white">
                        {agent.tasksCompleted}
                      </p>
                      <p className="text-[10px] text-muted">Completadas</p>
                    </div>
                    <div>
                      <p className="text-lg font-mono text-white">
                        {agent.avgResponseTime > 0
                          ? `${agent.avgResponseTime}ms`
                          : "-"}
                      </p>
                      <p className="text-[10px] text-muted">Resp.</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
            Actividad Reciente
          </h2>
          <div className="bg-card border border-card-border rounded-xl p-4 space-y-3 max-h-[500px] overflow-y-auto">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-2 text-xs border-b border-card-border pb-2 last:border-0"
              >
                <LogLevelDot level={log.level} />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground truncate">{log.message}</p>
                  <p className="text-muted mt-0.5">
                    {log.agentName} &middot;{" "}
                    {new Date(log.timestamp).toLocaleTimeString("es-MX")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-4">
      <p className="text-xs text-muted mb-1">{label}</p>
      <p className={`text-2xl font-mono font-bold ${color}`}>{value}</p>
    </div>
  );
}

function ResourceBar({ label, value }: { label: string; value: number }) {
  const color =
    value > 80 ? "bg-danger" : value > 60 ? "bg-warning" : "bg-success";
  return (
    <div className="bg-card border border-card-border rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs text-muted">{label}</p>
        <p className="text-sm font-mono text-white">{value}%</p>
      </div>
      <div className="h-2 bg-background rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function LogLevelDot({ level }: { level: LogEntry["level"] }) {
  const colors = {
    info: "bg-accent",
    warn: "bg-warning",
    error: "bg-danger",
    debug: "bg-muted",
  };
  return (
    <span
      className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${colors[level]}`}
    />
  );
}
