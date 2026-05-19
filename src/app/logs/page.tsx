"use client";

import { useEffect, useState } from "react";
import { LogEntry } from "@/lib/types";

type LevelFilter = "all" | "info" | "warn" | "error" | "debug";

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<LevelFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/logs").then((r) => r.json()).then(setLogs);
  }, []);

  const filtered = logs.filter((log) => {
    if (filter !== "all" && log.level !== filter) return false;
    if (search && !log.message.toLowerCase().includes(search.toLowerCase()) && !log.agentName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: logs.length,
    info: logs.filter((l) => l.level === "info").length,
    warn: logs.filter((l) => l.level === "warn").length,
    error: logs.filter((l) => l.level === "error").length,
    debug: logs.filter((l) => l.level === "debug").length,
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Logs del Sistema</h1>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Registro de actividad de todos los agentes Hermes
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar en logs..."
          className="bg-card border border-card-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 w-full sm:w-64 transition-all"
        />
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(["all", "info", "warn", "error", "debug"] as LevelFilter[]).map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-3 py-1.5 text-[11px] rounded-lg capitalize transition-all whitespace-nowrap font-medium ${
                filter === level
                  ? level === "error" ? "bg-danger/20 text-danger"
                  : level === "warn" ? "bg-warning/20 text-warning"
                  : level === "info" ? "bg-accent/20 text-accent-light"
                  : level === "debug" ? "bg-muted/20 text-muted"
                  : "bg-white/10 text-white"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              {level === "all" ? "Todos" : level}
              <span className="ml-1 opacity-60">{counts[level]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: card layout */}
      <div className="sm:hidden glass-card rounded-xl divide-y divide-card-border max-h-[calc(100vh-260px)] overflow-y-auto">
        {filtered.map((log) => (
          <div key={log.id} className="px-4 py-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <LogBadge level={log.level} />
                <span className="text-[11px] text-accent font-medium">{log.agentName}</span>
              </div>
              <span className="text-[10px] text-muted font-mono">
                {new Date(log.timestamp).toLocaleTimeString("es-MX")}
              </span>
            </div>
            <p className="text-xs text-foreground leading-relaxed">{log.message}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-muted">Sin resultados</div>
        )}
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-xs font-mono">
            <thead className="sticky top-0 bg-card z-10">
              <tr className="text-muted text-left border-b border-card-border">
                <th className="p-3 w-20">Nivel</th>
                <th className="p-3 w-44">Tiempo</th>
                <th className="p-3 w-28">Agente</th>
                <th className="p-3">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id} className="border-b border-card-border/50 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3"><LogBadge level={log.level} /></td>
                  <td className="p-3 text-muted">{new Date(log.timestamp).toLocaleString("es-MX")}</td>
                  <td className="p-3 text-accent-light">{log.agentName}</td>
                  <td className="p-3 text-foreground">{log.message}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="p-8 text-center text-sm text-muted">Sin resultados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LogBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    error: "bg-danger/20 text-danger",
    warn: "bg-warning/20 text-warning",
    info: "bg-accent/20 text-accent-light",
    debug: "bg-muted/20 text-muted",
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold ${styles[level] || styles.debug}`}>
      {level}
    </span>
  );
}
