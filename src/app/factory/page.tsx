"use client";

import { useEffect, useState, useRef } from "react";
import { Agent } from "@/lib/types";
import { GodAvatar, getAgentColor } from "@/components/GodAvatar";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export default function FactoryPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const particleId = useRef(0);

  useEffect(() => {
    const load = () => fetch("/api/agents").then((r) => r.json()).then(setAgents);
    load();
    const interval = setInterval(load, 8000);
    return () => clearInterval(interval);
  }, []);

  // Particle system for busy/online agents
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => {
        const alive = prev
          .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life - 1 }))
          .filter((p) => p.life > 0);

        // Spawn new particles for busy agents
        const busyCount = agents.filter((a) => a.status === "busy" || a.status === "online").length;
        const newParticles: Particle[] = [];
        for (let i = 0; i < Math.min(busyCount, 3); i++) {
          newParticles.push({
            id: particleId.current++,
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 60,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            life: 60 + Math.floor(Math.random() * 40),
            color: ["#d4a853", "#6366f1", "#10b981", "#f59e0b"][Math.floor(Math.random() * 4)],
          });
        }
        return [...alive, ...newParticles].slice(-80);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [agents]);

  const onlineAgents = agents.filter((a) => a.status === "online");
  const busyAgents = agents.filter((a) => a.status === "busy");
  const errorAgents = agents.filter((a) => a.status === "error");
  const offlineAgents = agents.filter((a) => a.status === "offline");
  const totalTasks = agents.reduce((s, a) => s + a.tasksRunning, 0);
  const selected = agents.find((a) => a.id === selectedAgent);

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-hermes">Fabrica de Agentes</h1>
          <p className="text-xs sm:text-sm text-muted mt-1">Visualizacion en tiempo real del trabajo de los agentes</p>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5 text-success"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />{onlineAgents.length} activos</span>
          <span className="flex items-center gap-1.5 text-warning"><span className="w-1.5 h-1.5 rounded-full bg-warning" />{busyAgents.length} ocupados</span>
          <span className="flex items-center gap-1.5 text-muted"><span className="w-1.5 h-1.5 rounded-full bg-muted" />{totalTasks} tareas</span>
        </div>
      </div>

      {agents.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 sm:p-16 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-gold/10 to-gold-light/5 border border-gold/15 flex items-center justify-center">
            <svg className="w-10 h-10 text-gold/30 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.84-3.37a.75.75 0 01-.38-.65V7.47a.75.75 0 01.38-.65l5.84-3.37a.75.75 0 01.76 0l5.84 3.37a.75.75 0 01.38.65v3.68a.75.75 0 01-.38.65l-5.84 3.37a.75.75 0 01-.76 0z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-white mb-2">Fabrica inactiva</h2>
          <p className="text-xs text-muted leading-relaxed">
            La fabrica se activara cuando los agentes se conecten al MCP endpoint.
          </p>
        </div>
      ) : (
        <>
          {/* Main factory visualization */}
          <div className="glass-card rounded-2xl overflow-hidden relative" style={{ minHeight: "420px" }}>
            {/* Animated grid background */}
            <div className="absolute inset-0 grid-bg opacity-50" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    backgroundColor: p.color,
                    opacity: Math.min(p.life / 30, 1) * 0.6,
                    boxShadow: `0 0 6px ${p.color}`,
                    transition: "left 0.1s linear, top 0.1s linear",
                  }}
                />
              ))}
            </div>

            {/* Connection lines between agents (SVG) */}
            {agents.length > 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: "420px" }}>
                {agents.map((agent, i) => {
                  if (i === 0) return null;
                  const pos = getNodePosition(i, agents.length);
                  const prevPos = getNodePosition(i - 1, agents.length);
                  return (
                    <line
                      key={`line-${i}`}
                      x1={`${prevPos.x}%`}
                      y1={`${prevPos.y}%`}
                      x2={`${pos.x}%`}
                      y2={`${pos.y}%`}
                      stroke="rgba(212,168,83,0.08)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    >
                      {(agent.status === "online" || agent.status === "busy") && (
                        <animate attributeName="stroke-dashoffset" from="8" to="0" dur="2s" repeatCount="indefinite" />
                      )}
                    </line>
                  );
                })}
                {/* Center hub connections */}
                {agents.map((agent, i) => {
                  const pos = getNodePosition(i, agents.length);
                  return (
                    <line
                      key={`hub-${i}`}
                      x1="50%"
                      y1="50%"
                      x2={`${pos.x}%`}
                      y2={`${pos.y}%`}
                      stroke={agent.status === "busy" ? "rgba(245,158,11,0.12)" : agent.status === "online" ? "rgba(16,185,129,0.1)" : "rgba(82,82,106,0.06)"}
                      strokeWidth="1"
                    >
                      {agent.status === "busy" && (
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                      )}
                    </line>
                  );
                })}
              </svg>
            )}

            {/* Central hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/25 flex items-center justify-center animate-glow">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-[9px] sm:text-[10px] text-gold/60 text-center mt-1.5 font-medium uppercase tracking-wider">Hermes Core</p>
            </div>

            {/* Agent nodes */}
            <div className="relative z-20" style={{ minHeight: "420px" }}>
              {agents.map((agent, i) => {
                const pos = getNodePosition(i, agents.length);
                const isSelected = selectedAgent === agent.id;
                return (
                  <div
                    key={agent.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
                  >
                    {/* Status ring */}
                    <div className={`relative ${agent.status === "busy" ? "animate-spin-slow" : ""}`}>
                      <div className={`absolute -inset-2 sm:-inset-3 rounded-full border-2 ${
                        agent.status === "online" ? "border-success/40" :
                        agent.status === "busy" ? "border-warning/40 animate-pulse" :
                        agent.status === "error" ? "border-danger/40" :
                        "border-muted/20"
                      }`} />
                      <div className={`absolute -inset-2 sm:-inset-3 rounded-full ${
                        agent.status === "online" ? "bg-success/5" :
                        agent.status === "busy" ? "bg-warning/5" :
                        ""
                      }`} />
                      <GodAvatar agentId={agent.id} size="lg" />
                    </div>

                    {/* Agent label */}
                    <div className={`mt-2 text-center transition-all ${isSelected ? "scale-110" : ""}`}>
                      <p className="text-[10px] sm:text-xs font-semibold text-white truncate max-w-[80px] sm:max-w-[100px] mx-auto">{agent.name}</p>
                      {agent.status === "busy" && agent.tasksRunning > 0 && (
                        <div className="mt-1 flex items-center justify-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-warning animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="inline-block w-1 h-1 rounded-full bg-warning animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="inline-block w-1 h-1 rounded-full bg-warning animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      )}
                      {agent.status === "online" && (
                        <p className="text-[9px] text-success/70 mt-0.5">listo</p>
                      )}
                      {agent.status === "error" && (
                        <p className="text-[9px] text-danger/70 mt-0.5">error</p>
                      )}
                    </div>

                    {/* Task bubble */}
                    {agent.tasksRunning > 0 && (
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-warning/20 border border-warning/30 flex items-center justify-center">
                        <span className="text-[9px] sm:text-[10px] font-bold text-warning">{agent.tasksRunning}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Agent detail panel (shows when an agent is selected) */}
          {selected && (
            <div className="glass-card rounded-2xl p-4 sm:p-5 animate-fade-in">
              <div className="flex items-start gap-4">
                <GodAvatar agentId={selected.id} size="xl" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-white">{selected.name}</h3>
                    <StatusIndicator status={selected.status} />
                  </div>
                  <p className="text-xs text-gold/60 font-medium uppercase tracking-wider mt-0.5">{selected.role}</p>
                  <p className="text-xs text-muted mt-1.5 leading-relaxed">{selected.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                    <MiniStat label="Tareas activas" value={selected.tasksRunning.toString()} color="text-warning" />
                    <MiniStat label="Completadas" value={selected.tasksCompleted.toString()} color="text-success" />
                    <MiniStat label="Tiempo resp." value={selected.avgResponseTime > 0 ? `${selected.avgResponseTime}ms` : "-"} color="text-accent-light" />
                    <MiniStat label="Modelo" value={selected.model.split("/").pop() || "-"} color="text-gold-light" />
                  </div>
                </div>
              </div>
              {/* Activity bar */}
              {selected.tasksRunning > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-[10px] text-muted uppercase tracking-wider">Actividad en progreso</p>
                  <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-warning to-gold shimmer-bar" style={{ width: "65%" }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Agent status grid (compact view) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <FactoryStat label="Produccion" value={`${busyAgents.length + onlineAgents.length}`} sub="agentes activos" icon="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" color="text-gold-light" />
            <FactoryStat label="En cola" value={totalTasks.toString()} sub="tareas corriendo" icon="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" color="text-warning" />
            <FactoryStat label="Errores" value={errorAgents.length.toString()} sub="requieren atencion" icon="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" color="text-danger" />
            <FactoryStat label="Offline" value={offlineAgents.length.toString()} sub="desconectados" icon="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243A6.72 6.72 0 015.88 12m-2.122 4.243a9.726 9.726 0 01-.453-1.194" color="text-muted" />
          </div>
        </>
      )}
    </div>
  );
}

/** Calculate position of agent node in a circle around center */
function getNodePosition(index: number, total: number) {
  const radius = 32;
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
}

function StatusIndicator({ status }: { status: string }) {
  const cfg: Record<string, { label: string; color: string; bg: string }> = {
    online: { label: "Activo", color: "text-success", bg: "bg-success/10 border-success/20" },
    busy: { label: "Trabajando", color: "text-warning", bg: "bg-warning/10 border-warning/20" },
    error: { label: "Error", color: "text-danger", bg: "bg-danger/10 border-danger/20" },
    offline: { label: "Offline", color: "text-muted", bg: "bg-muted/10 border-muted/20" },
  };
  const c = cfg[status] || cfg.offline;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-lg border ${c.bg} ${c.color} uppercase tracking-wider`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "busy" ? "bg-warning animate-pulse" : status === "online" ? "bg-success animate-pulse-dot" : status === "error" ? "bg-danger" : "bg-muted"}`} />
      {c.label}
    </span>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-surface/80 rounded-xl p-2">
      <p className="text-[9px] text-muted uppercase tracking-wider">{label}</p>
      <p className={`text-sm font-mono font-bold ${color}`}>{value}</p>
    </div>
  );
}

function FactoryStat({ label, value, sub, icon, color }: { label: string; value: string; sub: string; icon: string; color: string }) {
  return (
    <div className="glass-card rounded-2xl p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-2">
        <svg className={`w-4 h-4 ${color} opacity-60`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
        <span className="text-[10px] text-muted uppercase tracking-wider font-medium">{label}</span>
      </div>
      <p className={`text-xl sm:text-2xl font-mono font-bold ${color}`}>{value}</p>
      <p className="text-[10px] text-muted mt-0.5">{sub}</p>
    </div>
  );
}
