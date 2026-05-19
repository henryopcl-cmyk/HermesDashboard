"use client";

import { useEffect, useState } from "react";
import { Agent } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import { GodAvatar, getAgentGradient } from "@/components/GodAvatar";
import Link from "next/link";

export default function AgentHome() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const load = () => fetch("/api/agents").then((r) => r.json()).then(setAgents);
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-hermes">Agent Home</h1>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Tu pantheon de agentes Hermes
        </p>
      </div>

      {agents.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 sm:p-16 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-gold/10 to-gold-light/5 border border-gold/15 flex items-center justify-center">
            <svg className="w-10 h-10 text-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-white mb-2">Esperando agentes</h2>
          <p className="text-xs text-muted leading-relaxed">
            Los agentes de Hermes apareceran aqui cuando se registren a traves del MCP endpoint.
            Cada agente tendra su propio perfil personalizado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {agents.map((agent, i) => (
            <Link key={agent.id} href={`/agents/${agent.id}`}>
              <div className="glass-card rounded-2xl overflow-hidden hover:bg-card-hover transition-all duration-300 cursor-pointer group h-full" style={{ animationDelay: `${i * 0.06}s` }}>
                {/* Top gradient banner */}
                <div className={`h-1.5 bg-gradient-to-r ${getAgentGradient(agent.id)}`} />
                <div className="p-4 sm:p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <GodAvatar agentId={agent.id} size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-gold-light transition-colors truncate">
                          {agent.name}
                        </h3>
                        <StatusBadge status={agent.status} />
                      </div>
                      <p className="text-[11px] text-gold/60 font-medium uppercase tracking-wider mt-0.5">{agent.role}</p>
                      <p className="text-[11px] text-muted/60 mt-1 line-clamp-2 leading-relaxed">{agent.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <InfoCell label="Modelo" value={agent.model.split("/").pop() || ""} />
                    <InfoCell label="Uptime" value={agent.uptime} />
                    <InfoCell label="Tareas" value={`${agent.tasksRunning} activas`} />
                    <InfoCell label="Completadas" value={agent.tasksCompleted.toString()} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface/80 rounded-xl p-2">
      <p className="text-[9px] text-muted uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-foreground font-mono text-[11px] truncate">{value}</p>
    </div>
  );
}
