"use client";

import { useEffect, useState } from "react";
import { Agent, SystemMetrics, LogEntry } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import { GodAvatar } from "@/components/GodAvatar";
import Link from "next/link";

export default function MissionControl() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const load = () => {
      fetch("/api/agents").then((r) => r.json()).then(setAgents);
      fetch("/api/metrics").then((r) => r.json()).then(setMetrics);
      fetch("/api/logs").then((r) => r.json()).then((d: LogEntry[]) => setLogs(d.slice(0, 20)));
    };
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-hermes">Mission Control</h1>
          <p className="text-xs sm:text-sm text-muted mt-1">Centro de operaciones del sistema Hermes</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted bg-card/50 px-3 py-1.5 rounded-lg border border-card-border">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
          MCP Endpoint activo
        </div>
      </div>

      {/* Metrics */}
      {metrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard label="Agentes Online" value={metrics.totalAgents > 0 ? `${metrics.onlineAgents}/${metrics.totalAgents}` : "0"} accent="gold" />
          <MetricCard label="Tareas Completadas" value={metrics.totalTasksToday.toString()} accent="accent" />
          <MetricCard label="Tiempo Resp." value={metrics.avgResponseTime > 0 ? `${metrics.avgResponseTime}ms` : "-"} accent="success" />
          <MetricCard label="Req/min" value={metrics.requestsPerMinute > 0 ? metrics.requestsPerMinute.toString() : "-"} accent="warning" />
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6">
        {/* Agents */}
        <div className="xl:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gold/80 uppercase tracking-wider">Agentes Activos</h2>
            <Link href="/agents" className="text-xs text-gold/60 hover:text-gold transition-colors">Ver todos</Link>
          </div>

          {agents.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 sm:p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gold/5 border border-gold/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-sm text-muted mb-1">No hay agentes conectados</p>
              <p className="text-xs text-muted/60">Los agentes apareceran aqui cuando se conecten via MCP</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {agents.map((agent, i) => (
                <Link key={agent.id} href={`/agents/${agent.id}`}>
                  <div className="glass-card rounded-2xl p-4 hover:bg-card-hover transition-all duration-300 cursor-pointer group" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className="flex items-start gap-3 mb-3">
                      <GodAvatar agentId={agent.id} size="md" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-white text-sm group-hover:text-gold-light transition-colors truncate">{agent.name}</h3>
                          <StatusBadge status={agent.status} />
                        </div>
                        <p className="text-[11px] text-muted truncate">{agent.role}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <Stat value={agent.tasksRunning.toString()} label="Activas" />
                      <Stat value={agent.tasksCompleted.toString()} label="Completadas" />
                      <Stat value={agent.avgResponseTime > 0 ? `${agent.avgResponseTime}ms` : "-"} label="Resp." />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Activity Feed */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gold/80 uppercase tracking-wider">Actividad Reciente</h2>
          <div className="glass-card rounded-2xl divide-y divide-card-border max-h-[420px] sm:max-h-[500px] overflow-y-auto">
            {logs.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted">Sin actividad reciente</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2.5 px-4 py-3 hover:bg-white/[0.01] transition-colors">
                  <LogDot level={log.level} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-relaxed truncate">{log.message}</p>
                    <p className="text-[10px] text-muted mt-0.5">
                      {log.agentName} &middot; {new Date(log.timestamp).toLocaleTimeString("es-MX")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  const colors: Record<string, string> = {
    gold: "text-gold-light",
    accent: "text-accent-light",
    success: "text-success",
    warning: "text-warning",
  };
  return (
    <div className="glass-card rounded-2xl p-3 sm:p-4 shimmer">
      <p className="text-[10px] sm:text-[11px] text-muted uppercase tracking-wider mb-1.5">{label}</p>
      <p className={`text-xl sm:text-2xl font-mono font-bold ${colors[accent]}`}>{value}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center bg-surface/80 rounded-xl py-1.5 sm:py-2">
      <p className="text-sm font-mono font-semibold text-white">{value}</p>
      <p className="text-[9px] sm:text-[10px] text-muted">{label}</p>
    </div>
  );
}

function LogDot({ level }: { level: string }) {
  const c: Record<string, string> = { info: "bg-accent", warn: "bg-warning", error: "bg-danger", debug: "bg-muted" };
  return <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${c[level] || c.debug}`} />;
}
