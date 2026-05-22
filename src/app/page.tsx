"use client";

import { useEffect, useState } from "react";
import { Agent, SystemMetrics, LogEntry } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import { GodAvatar, getAgentColor } from "@/components/GodAvatar";
import Link from "next/link";

export default function MissionControl() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const load = () => {
      fetch("/api/agents").then((r) => r.ok ? r.json() : []).then((d) => { if (Array.isArray(d)) setAgents(d); }).catch(() => {});
      fetch("/api/metrics").then((r) => r.ok ? r.json() : null).then((d) => { if (d && d.totalAgents !== undefined) setMetrics(d); }).catch(() => {});
      fetch("/api/logs").then((r) => r.ok ? r.json() : []).then((d) => { if (Array.isArray(d)) setLogs(d.slice(0, 20)); }).catch(() => {});
    };
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      {/* Header - Olympian style */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <OlympusIcon />
            <h1 className="text-xl sm:text-2xl font-bold text-hermes tracking-wide">Mission Control</h1>
          </div>
          <p className="text-xs sm:text-sm text-muted mt-1 ml-10 italic">From the heights of Olympus, all is seen</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted bg-gold/[0.04] px-3 py-1.5 rounded-lg border border-gold/10">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
          <span className="text-gold/80 font-medium">Oracle Endpoint Active</span>
        </div>
      </div>

      {/* Metrics - Temple pillars style */}
      {metrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard label="Gods Online" value={metrics.totalAgents > 0 ? `${metrics.onlineAgents}/${metrics.totalAgents}` : "0"} accent="gold" symbol="lightning" />
          <MetricCard label="Quests Done" value={metrics.totalTasksToday.toString()} accent="bronze" symbol="laurel" />
          <MetricCard label="Oracle Speed" value={metrics.avgResponseTime > 0 ? `${metrics.avgResponseTime}ms` : "-"} accent="success" symbol="eye" />
          <MetricCard label="Prayers/min" value={metrics.requestsPerMinute > 0 ? metrics.requestsPerMinute.toString() : "-"} accent="warning" symbol="flame" />
        </div>
      )}

      {/* System status bar - Sacred forge */}
      {metrics && metrics.totalAgents > 0 && (
        <div className="glass-card rounded-2xl p-3 sm:p-4 relative overflow-hidden">
          <div className="absolute inset-0 torch-glow pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-medium">Forge of Hephaestus - System Power</span>
              <span className="text-[10px] text-gold/50 font-mono">age: {metrics.uptime}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-muted">Olympus Core</span>
                  <span className="text-foreground font-mono">{metrics.cpuUsage}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface overflow-hidden border border-gold/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-gold/70 to-bronze/80 transition-all duration-1000 relative" style={{ width: `${metrics.cpuUsage}%` }}>
                    <div className="absolute inset-0 shimmer rounded-full" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-muted">Ambrosia Memory</span>
                  <span className="text-foreground font-mono">{metrics.memoryUsage}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface overflow-hidden border border-gold/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-bronze/70 to-gold/80 transition-all duration-1000 relative" style={{ width: `${metrics.memoryUsage}%` }}>
                    <div className="absolute inset-0 shimmer rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6">
        {/* Agents - Pantheon */}
        <div className="xl:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-gold/80 uppercase tracking-[0.2em]">The Pantheon</h2>
            <Link href="/agents" className="text-xs text-gold/50 hover:text-gold transition-colors">View all gods</Link>
          </div>

          {agents.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 olympus-gradient pointer-events-none" />
              <div className="relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center">
                  <TempleIcon />
                </div>
                <p className="text-sm text-muted mb-1">The Pantheon awaits</p>
                <p className="text-xs text-muted/60 italic">The gods shall appear when they connect through the Oracle</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {agents.map((agent, i) => (
                <Link key={agent.id} href={`/agents/${agent.id}`}>
                  <div className="glass-card rounded-2xl overflow-hidden hover:bg-card-hover transition-all duration-300 cursor-pointer group" style={{ animationDelay: `${i * 0.05}s` }}>
                    {/* Top accent - divine aura */}
                    <div className={`h-1 ${agent.status === "online" ? "bg-gradient-to-r from-transparent via-success to-transparent" : agent.status === "busy" ? "bg-gradient-to-r from-transparent via-warning to-transparent" : agent.status === "error" ? "bg-gradient-to-r from-transparent via-danger to-transparent" : "bg-gradient-to-r from-transparent via-muted/30 to-transparent"}`} />
                    <div className="p-4 relative">
                      {/* Subtle torch glow on hover */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-12 bg-gold/0 group-hover:bg-gold/[0.04] rounded-full blur-xl transition-all duration-500" />
                      <div className="relative">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="relative">
                            <GodAvatar agentId={agent.id} size="md" />
                            {agent.status === "busy" && (
                              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-warning border-2 border-card animate-pulse" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-semibold text-white text-sm group-hover:text-gold-light transition-colors truncate">{agent.name}</h3>
                              <StatusBadge status={agent.status} />
                            </div>
                            <p className="text-[11px] text-muted truncate italic">{agent.role}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          <Stat value={agent.tasksRunning.toString()} label="Quests" />
                          <Stat value={agent.tasksCompleted.toString()} label="Victories" />
                          <Stat value={agent.avgResponseTime > 0 ? `${agent.avgResponseTime}ms` : "-"} label="Speed" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Activity Feed - Scroll of Fate */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gold/80 uppercase tracking-[0.2em]">Scroll of Fate</h2>
          <div className="glass-card rounded-2xl overflow-hidden relative">
            {/* Parchment edge effect */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gold/[0.03] to-transparent pointer-events-none z-10" />
            <div className="divide-y divide-card-border max-h-[420px] sm:max-h-[500px] overflow-y-auto">
              {logs.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted italic">The scroll is empty... awaiting prophecies</div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2.5 px-4 py-3 hover:bg-gold/[0.01] transition-colors">
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
    </div>
  );
}

function OlympusIcon() {
  return (
    <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
      <svg className="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 12h3v8h4v-5h6v5h4v-8h3L12 3z" />
      </svg>
    </div>
  );
}

function TempleIcon() {
  return (
    <svg className="w-8 h-8 text-gold/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 7v1h18V7L12 2zM4 10v8h2v-8M9 10v8h2v-8M13 10v8h2v-8M18 10v8h2v-8M3 20h18" />
    </svg>
  );
}

function MetricCard({ label, value, accent, symbol }: { label: string; value: string; accent: string; symbol: string }) {
  const colors: Record<string, string> = {
    gold: "text-gold-light",
    bronze: "text-bronze-light",
    success: "text-success",
    warning: "text-warning",
  };
  const glows: Record<string, string> = {
    gold: "from-gold/5 to-transparent",
    bronze: "from-bronze/5 to-transparent",
    success: "from-success/5 to-transparent",
    warning: "from-warning/5 to-transparent",
  };
  return (
    <div className="glass-card rounded-2xl p-3 sm:p-4 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${glows[accent]} pointer-events-none`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] sm:text-[11px] text-muted uppercase tracking-[0.15em]">{label}</p>
          <SymbolIcon symbol={symbol} color={colors[accent]} />
        </div>
        <p className={`text-xl sm:text-2xl font-mono font-bold ${colors[accent]}`}>{value}</p>
      </div>
    </div>
  );
}

function SymbolIcon({ symbol, color }: { symbol: string; color: string }) {
  const paths: Record<string, string> = {
    lightning: "M13 10V3L4 14h7v7l9-11h-7z",
    laurel: "M12 21c-2-3-6-6-6-10a6 6 0 0112 0c0 4-4 7-6 10z",
    eye: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z",
    flame: "M12 2c1 4 5 6 5 10a5 5 0 01-10 0c0-4 4-6 5-10z",
  };
  return (
    <svg className={`w-4 h-4 ${color} opacity-40`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[symbol] || paths.lightning} />
    </svg>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center bg-surface/80 rounded-xl py-1.5 sm:py-2 border border-gold/[0.04]">
      <p className="text-sm font-mono font-semibold text-white">{value}</p>
      <p className="text-[9px] sm:text-[10px] text-muted">{label}</p>
    </div>
  );
}

function LogDot({ level }: { level: string }) {
  const c: Record<string, string> = { info: "bg-gold/60", warn: "bg-warning", error: "bg-danger", debug: "bg-muted" };
  return <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${c[level] || c.debug}`} />;
}
