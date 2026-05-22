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

  // Ember/spark particles for the forge
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => {
        const alive = prev
          .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life - 1 }))
          .filter((p) => p.life > 0);

        const busyCount = agents.filter((a) => a.status === "busy" || a.status === "online").length;
        const newParticles: Particle[] = [];
        for (let i = 0; i < Math.min(busyCount, 3); i++) {
          newParticles.push({
            id: particleId.current++,
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 60,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.2 - 0.1,
            life: 60 + Math.floor(Math.random() * 40),
            color: ["#c9a84c", "#cd7f32", "#e8d48b", "#a0413a"][Math.floor(Math.random() * 4)],
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
          <div className="flex items-center gap-3 mb-1">
            <div className="w-7 h-7 rounded-full bg-bronze/10 border border-bronze/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-bronze" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-hermes tracking-wide">Forge of Hephaestus</h1>
          </div>
          <p className="text-xs sm:text-sm text-muted mt-1 ml-10 italic">Where divine agents are forged in celestial fire</p>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5 text-success"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />{onlineAgents.length} active</span>
          <span className="flex items-center gap-1.5 text-warning"><span className="w-1.5 h-1.5 rounded-full bg-warning" />{busyAgents.length} forging</span>
          <span className="flex items-center gap-1.5 text-muted"><span className="w-1.5 h-1.5 rounded-full bg-muted" />{totalTasks} quests</span>
        </div>
      </div>

      {agents.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 sm:p-16 text-center max-w-lg mx-auto relative overflow-hidden">
          <div className="absolute inset-0 olympus-gradient pointer-events-none" />
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-bronze/10 to-gold/5 border border-bronze/15 flex items-center justify-center">
              <svg className="w-10 h-10 text-bronze/30 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-white mb-2">The Forge Sleeps</h2>
            <p className="text-xs text-muted leading-relaxed italic">
              The sacred forge will ignite when agents connect to the Oracle endpoint.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Main forge visualization */}
          <div className="glass-card rounded-2xl overflow-hidden relative" style={{ minHeight: "420px" }}>
            {/* Forge heat background */}
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-bronze/[0.04] to-transparent pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gold/[0.03] rounded-full blur-3xl pointer-events-none" />

            {/* Floating embers */}
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

            {/* Connection lines */}
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
                      stroke="rgba(201,168,76,0.06)"
                      strokeWidth="1"
                      strokeDasharray="6 4"
                    >
                      {(agent.status === "online" || agent.status === "busy") && (
                        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="3s" repeatCount="indefinite" />
                      )}
                    </line>
                  );
                })}
                {agents.map((agent, i) => {
                  const pos = getNodePosition(i, agents.length);
                  return (
                    <line
                      key={`hub-${i}`}
                      x1="50%"
                      y1="50%"
                      x2={`${pos.x}%`}
                      y2={`${pos.y}%`}
                      stroke={agent.status === "busy" ? "rgba(201,135,58,0.12)" : agent.status === "online" ? "rgba(107,143,94,0.1)" : "rgba(122,112,96,0.06)"}
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

            {/* Central Anvil */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gold/20 to-bronze/10 border border-gold/25 flex items-center justify-center animate-glow">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                </svg>
              </div>
              <p className="text-[9px] sm:text-[10px] text-gold/60 text-center mt-1.5 font-medium uppercase tracking-[0.2em]">Sacred Forge</p>
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

                    <div className={`mt-2 text-center transition-all ${isSelected ? "scale-110" : ""}`}>
                      <p className="text-[10px] sm:text-xs font-semibold text-white truncate max-w-[80px] sm:max-w-[100px] mx-auto">{agent.name}</p>
                      {agent.status === "busy" && agent.tasksRunning > 0 && (
                        <div className="mt-1 flex items-center justify-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-warning animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="inline-block w-1 h-1 rounded-full bg-warning animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="inline-block w-1 h-1 rounded-full bg-warning animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      )}
                      {agent.status === "online" && <p className="text-[9px] text-success/70 mt-0.5 italic">ready</p>}
                      {agent.status === "error" && <p className="text-[9px] text-danger/70 mt-0.5">fallen</p>}
                    </div>

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

          {/* Agent detail panel */}
          {selected && (
            <div className="glass-card rounded-2xl p-4 sm:p-5 animate-fade-in relative overflow-hidden">
              <div className="absolute inset-0 torch-glow pointer-events-none" />
              <div className="relative flex items-start gap-4">
                <GodAvatar agentId={selected.id} size="xl" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-white">{selected.name}</h3>
                    <StatusIndicator status={selected.status} />
                  </div>
                  <p className="text-xs text-gold/60 font-medium uppercase tracking-[0.15em] mt-0.5">{selected.role}</p>
                  <p className="text-xs text-muted mt-1.5 leading-relaxed italic">{selected.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                    <MiniStat label="Active quests" value={selected.tasksRunning.toString()} color="text-warning" />
                    <MiniStat label="Victories" value={selected.tasksCompleted.toString()} color="text-success" />
                    <MiniStat label="Oracle speed" value={selected.avgResponseTime > 0 ? `${selected.avgResponseTime}ms` : "-"} color="text-gold-light" />
                    <MiniStat label="Power source" value={selected.model.split("/").pop() || "-"} color="text-bronze-light" />
                  </div>
                </div>
              </div>
              {selected.tasksRunning > 0 && (
                <div className="mt-4 space-y-2 relative">
                  <p className="text-[10px] text-muted uppercase tracking-[0.2em]">Forging in progress</p>
                  <div className="h-2 rounded-full bg-surface overflow-hidden border border-gold/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-bronze to-gold shimmer-bar" style={{ width: "65%" }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Forge stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ForgeStat label="Production" value={`${busyAgents.length + onlineAgents.length}`} sub="gods active" color="text-gold-light" />
            <ForgeStat label="In Queue" value={totalTasks.toString()} sub="quests running" color="text-warning" />
            <ForgeStat label="Fallen" value={errorAgents.length.toString()} sub="need revival" color="text-danger" />
            <ForgeStat label="Dormant" value={offlineAgents.length.toString()} sub="in slumber" color="text-muted" />
          </div>
        </>
      )}
    </div>
  );
}

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
    online: { label: "Ascended", color: "text-success", bg: "bg-success/10 border-success/20" },
    busy: { label: "Forging", color: "text-warning", bg: "bg-warning/10 border-warning/20" },
    error: { label: "Fallen", color: "text-danger", bg: "bg-danger/10 border-danger/20" },
    offline: { label: "Dormant", color: "text-muted", bg: "bg-muted/10 border-muted/20" },
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
    <div className="bg-surface/80 rounded-xl p-2 border border-gold/[0.04]">
      <p className="text-[9px] text-muted uppercase tracking-wider">{label}</p>
      <p className={`text-sm font-mono font-bold ${color}`}>{value}</p>
    </div>
  );
}

function ForgeStat({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="glass-card rounded-2xl p-3 sm:p-4 relative overflow-hidden">
      <div className="absolute inset-0 torch-glow pointer-events-none opacity-50" />
      <div className="relative">
        <span className="text-[10px] text-muted uppercase tracking-[0.15em] font-medium">{label}</span>
        <p className={`text-xl sm:text-2xl font-mono font-bold ${color} mt-1`}>{value}</p>
        <p className="text-[10px] text-muted mt-0.5 italic">{sub}</p>
      </div>
    </div>
  );
}
