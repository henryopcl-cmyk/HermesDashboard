"use client";

import { useEffect, useState } from "react";
import { Agent } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    fetch("/api/agents")
      .then((r) => r.json())
      .then(setAgents);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Agentes</h1>
        <p className="text-sm text-muted mt-1">
          Gestiona y monitorea todos los agentes del sistema Hermes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Link key={agent.id} href={`/agents/${agent.id}`}>
            <div className="bg-card border border-card-border rounded-xl p-5 hover:border-accent/40 transition-colors cursor-pointer group h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-muted">{agent.role}</p>
                </div>
                <StatusBadge status={agent.status} />
              </div>
              <p className="text-xs text-muted/80 mb-4 line-clamp-2">
                {agent.description}
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted">Modelo</p>
                  <p className="text-foreground font-mono truncate">
                    {agent.model.split("/").pop()}
                  </p>
                </div>
                <div>
                  <p className="text-muted">Uptime</p>
                  <p className="text-foreground font-mono">{agent.uptime}</p>
                </div>
                <div>
                  <p className="text-muted">Tareas activas</p>
                  <p className="text-foreground font-mono">
                    {agent.tasksRunning}
                  </p>
                </div>
                <div>
                  <p className="text-muted">Ultimo uso</p>
                  <p className="text-foreground font-mono">
                    {agent.lastActive}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
