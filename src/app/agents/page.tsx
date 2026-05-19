"use client";

import { useEffect, useState } from "react";
import { Agent } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    fetch("/api/agents").then((r) => r.json()).then(setAgents);
  }, []);

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Agentes</h1>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Gestiona y monitorea todos los agentes del sistema Hermes
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {agents.map((agent, i) => (
          <Link key={agent.id} href={`/agents/${agent.id}`}>
            <div
              className="glass-card rounded-xl p-4 sm:p-5 hover:bg-card-hover hover:border-accent/30 transition-all duration-200 cursor-pointer group h-full"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="min-w-0 flex-1 mr-3">
                  <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-accent-light transition-colors truncate">
                    {agent.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted">{agent.role}</p>
                </div>
                <StatusBadge status={agent.status} />
              </div>
              <p className="text-[11px] sm:text-xs text-muted/70 mb-4 line-clamp-2 leading-relaxed">
                {agent.description}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                <InfoCell label="Modelo" value={agent.model.split("/").pop() || ""} />
                <InfoCell label="Uptime" value={agent.uptime} />
                <InfoCell label="Tareas activas" value={agent.tasksRunning.toString()} />
                <InfoCell label="Ultimo uso" value={agent.lastActive} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background/50 rounded-lg p-2">
      <p className="text-[10px] text-muted mb-0.5">{label}</p>
      <p className="text-foreground font-mono text-[11px] sm:text-xs truncate">{value}</p>
    </div>
  );
}
