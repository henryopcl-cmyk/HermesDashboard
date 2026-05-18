"use client";

import { useEffect, useState } from "react";
import { LogEntry } from "@/lib/types";

type LevelFilter = "all" | "info" | "warn" | "error" | "debug";

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<LevelFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/logs")
      .then((r) => r.json())
      .then(setLogs);
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Logs del Sistema</h1>
        <p className="text-sm text-muted mt-1">
          Registro de actividad de todos los agentes Hermes
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar en logs..."
          className="bg-card border border-card-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent w-64"
        />
        <div className="flex gap-1">
          {(["all", "info", "warn", "error", "debug"] as LevelFilter[]).map(
            (level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-3 py-1.5 text-xs rounded-lg capitalize transition-colors ${
                  filter === level
                    ? level === "error"
                      ? "bg-danger/20 text-danger"
                      : level === "warn"
                        ? "bg-warning/20 text-warning"
                        : level === "info"
                          ? "bg-accent/20 text-accent"
                          : level === "debug"
                            ? "bg-muted/20 text-muted"
                            : "bg-white/10 text-white"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                {level === "all" ? "Todos" : level} ({counts[level]})
              </button>
            )
          )}
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-xs font-mono">
            <thead className="sticky top-0 bg-card">
              <tr className="text-muted text-left border-b border-card-border">
                <th className="p-3 w-20">Nivel</th>
                <th className="p-3 w-44">Tiempo</th>
                <th className="p-3 w-28">Agente</th>
                <th className="p-3">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-card-border/50 hover:bg-white/[0.02]"
                >
                  <td className="p-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                        log.level === "error"
                          ? "bg-danger/20 text-danger"
                          : log.level === "warn"
                            ? "bg-warning/20 text-warning"
                            : log.level === "info"
                              ? "bg-accent/20 text-accent"
                              : "bg-muted/20 text-muted"
                      }`}
                    >
                      {log.level}
                    </span>
                  </td>
                  <td className="p-3 text-muted">
                    {new Date(log.timestamp).toLocaleString("es-MX")}
                  </td>
                  <td className="p-3 text-accent">{log.agentName}</td>
                  <td className="p-3 text-foreground">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
