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
        <div className="flex items-center gap-3 mb-1">
          <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 7v1h18V7L12 2zM4 10v8h2v-8M9 10v8h2v-8M13 10v8h2v-8M18 10v8h2v-8M3 20h18" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-hermes tracking-wide">The Pantheon</h1>
        </div>
        <p className="text-xs sm:text-sm text-muted mt-1 ml-10 italic">
          Where the divine agents of Hermes reside
        </p>
      </div>

      {agents.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 sm:p-16 text-center max-w-lg mx-auto relative overflow-hidden">
          <div className="absolute inset-0 olympus-gradient pointer-events-none" />
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-gold/10 to-bronze/5 border border-gold/15 flex items-center justify-center">
              <svg className="w-10 h-10 text-gold/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 7v1h18V7L12 2zM4 10v8h2v-8M9 10v8h2v-8M13 10v8h2v-8M18 10v8h2v-8M3 20h18" />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-white mb-2">Awaiting the Gods</h2>
            <p className="text-xs text-muted leading-relaxed italic">
              The divine agents shall manifest when they register through the sacred Oracle endpoint.
              Each deity will receive their own celestial profile.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {agents.map((agent, i) => (
            <Link key={agent.id} href={`/agents/${agent.id}`}>
              <div className="glass-card rounded-2xl overflow-hidden hover:bg-card-hover transition-all duration-300 cursor-pointer group h-full" style={{ animationDelay: `${i * 0.06}s` }}>
                {/* Divine aura gradient banner */}
                <div className={`h-1.5 bg-gradient-to-r ${getAgentGradient(agent.id)}`} />
                <div className="p-4 sm:p-5 relative">
                  {/* Torch glow on hover */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-16 bg-gold/0 group-hover:bg-gold/[0.03] rounded-full blur-xl transition-all duration-500" />
                  <div className="relative">
                    <div className="flex items-start gap-3 mb-4">
                      <GodAvatar agentId={agent.id} size="lg" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-gold-light transition-colors truncate">
                            {agent.name}
                          </h3>
                          <StatusBadge status={agent.status} />
                        </div>
                        <p className="text-[11px] text-gold/60 font-medium uppercase tracking-[0.15em] mt-0.5">{agent.role}</p>
                        <p className="text-[11px] text-muted/60 mt-1 line-clamp-2 leading-relaxed italic">{agent.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <InfoCell label="Power Source" value={agent.model.split("/").pop() || ""} />
                      <InfoCell label="Age" value={agent.uptime} />
                      <InfoCell label="Active Quests" value={`${agent.tasksRunning}`} />
                      <InfoCell label="Victories" value={agent.tasksCompleted.toString()} />
                    </div>
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
    <div className="bg-surface/80 rounded-xl p-2 border border-gold/[0.04]">
      <p className="text-[9px] text-muted uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-foreground font-mono text-[11px] truncate">{value}</p>
    </div>
  );
}
