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
    fetch("/api/agents").then((r) => r.json()).then(setAgents);
    fetch("/api/metrics").then((r) => r.json()).then(setMetrics);
    fetch("/api/logs").then((r) => r.json()).then((data: LogEntry[]) => setLogs(data.slice(0, 15)));
  }, []);

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Mission Control</h1>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Monitoreo en tiempo real de los agentes Hermes
        </p>
      </div>

      {/* Metrics Grid */}
      {metrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard label="Agentes Online" value={`${metrics.onlineAgents}/${metrics.totalAgents}`} color="text-success" icon={<OnlineIcon />} />
          <MetricCard label="Tareas Hoy" value={metrics.totalTasksToday.toString()} color="text-accent-light" icon={<TaskIcon />} />
          <MetricCard label="Tiempo Resp." value={`${metrics.avgResponseTime}ms`} color="text-warning" icon={<ClockIcon />} />
          <MetricCard label="Req/min" value={metrics.requestsPerMinute.toString()} color="text-foreground" icon={<ActivityIcon />} />
        </div>
      )}

      {/* System Resources */}
      {metrics && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <ResourceBar label="CPU" value={metrics.cpuUsage} />
          <ResourceBar label="Memoria" value={metrics.memoryUsage} />
          <div className="glass-card rounded-xl p-4">
            <p className="text-[11px] text-muted uppercase tracking-wider mb-1">Uptime Servidor</p>
            <p className="text-base sm:text-lg font-mono font-semibold text-white">{metrics.uptime}</p>
          </div>
        </div>
      )}

      {/* Agents + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6">
        {/* Agents */}
        <div className="xl:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-muted uppercase tracking-wider">Agentes</h2>
            <Link href="/agents" className="text-xs text-accent hover:text-accent-light transition-colors">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {agents.map((agent, i) => (
              <Link key={agent.id} href={`/agents/${agent.id}`}>
                <div
                  className="glass-card rounded-xl p-4 hover:bg-card-hover hover:border-accent/30 transition-all duration-200 cursor-pointer group"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-sm sm:text-base group-hover:text-accent-light transition-colors truncate">
                        {agent.name}
                      </h3>
                      <p className="text-[11px] text-muted truncate">{agent.role}</p>
                    </div>
                    <StatusBadge status={agent.status} />
                  </div>
                  <div className="grid grid-cols-3 gap-1 sm:gap-2">
                    <Stat value={agent.tasksRunning.toString()} label="Activas" />
                    <Stat value={agent.tasksCompleted.toString()} label="Completadas" />
                    <Stat value={agent.avgResponseTime > 0 ? `${agent.avgResponseTime}ms` : "-"} label="Resp." />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wider">Actividad Reciente</h2>
          <div className="glass-card rounded-xl divide-y divide-card-border max-h-[420px] sm:max-h-[500px] overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2.5 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                <LogLevelDot level={log.level} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-relaxed truncate">{log.message}</p>
                  <p className="text-[11px] text-muted mt-0.5">
                    {log.agentName} &middot; {new Date(log.timestamp).toLocaleTimeString("es-MX")}
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

function MetricCard({ label, value, color, icon }: { label: string; value: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="glass-card rounded-xl p-3 sm:p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] text-muted uppercase tracking-wider">{label}</p>
        <span className="text-muted/50">{icon}</span>
      </div>
      <p className={`text-xl sm:text-2xl font-mono font-bold ${color}`}>{value}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center bg-background/50 rounded-lg py-1.5 sm:py-2">
      <p className="text-sm sm:text-base font-mono font-semibold text-white">{value}</p>
      <p className="text-[10px] text-muted">{label}</p>
    </div>
  );
}

function ResourceBar({ label, value }: { label: string; value: number }) {
  const color = value > 80 ? "bg-danger" : value > 60 ? "bg-warning" : "bg-success";
  const glow = value > 80 ? "shadow-danger/20" : value > 60 ? "shadow-warning/20" : "shadow-success/20";
  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex justify-between items-center mb-2.5">
        <p className="text-[11px] text-muted uppercase tracking-wider">{label}</p>
        <p className="text-sm font-mono font-semibold text-white">{value}%</p>
      </div>
      <div className="h-2 bg-background rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700 shadow-sm ${glow}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function LogLevelDot({ level }: { level: LogEntry["level"] }) {
  const colors = { info: "bg-accent", warn: "bg-warning", error: "bg-danger", debug: "bg-muted" };
  return <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${colors[level]}`} />;
}

function OnlineIcon() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
function TaskIcon() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>;
}
function ClockIcon() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
function ActivityIcon() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
}
