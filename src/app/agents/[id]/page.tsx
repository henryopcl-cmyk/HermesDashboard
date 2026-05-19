"use client";

import { useEffect, useState, useRef, use } from "react";
import { Agent, ChatMessage, LogEntry } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";

type Tab = "chat" | "logs" | "config";

export default function AgentDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [tab, setTab] = useState<Tab>("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/agents/${id}`).then((r) => r.json()).then(setAgent);
    fetch(`/api/agents/${id}/logs`).then((r) => r.json()).then(setLogs);
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`, role: "user", content: input.trim(),
      timestamp: new Date().toISOString(), agentId: id,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);
    const res = await fetch(`/api/agents/${id}/chat`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.content }),
    });
    const reply = await res.json();
    setMessages((prev) => [...prev, reply]);
    setSending(false);
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-64 text-muted">
        <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin mr-3" />
        Cargando agente...
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <Link href="/agents" className="text-muted hover:text-accent transition-colors">Agentes</Link>
        <span className="text-card-border">/</span>
        <span className="text-foreground">{agent.name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-white">{agent.name}</h1>
            <StatusBadge status={agent.status} />
          </div>
          <p className="text-xs sm:text-sm text-muted mt-1 line-clamp-2">{agent.description}</p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-muted shrink-0 flex-wrap">
          <span className="bg-background/50 px-2.5 py-1 rounded-lg">
            <span className="text-foreground font-mono">{agent.model.split("/").pop()}</span>
          </span>
          <span className="bg-background/50 px-2.5 py-1 rounded-lg">
            Uptime: <span className="text-foreground font-mono">{agent.uptime}</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-card-border overflow-x-auto">
        {(["chat", "logs", "config"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs sm:text-sm font-medium capitalize transition-all border-b-2 -mb-px whitespace-nowrap ${
              tab === t
                ? "text-accent-light border-accent"
                : "text-muted border-transparent hover:text-foreground"
            }`}
          >
            {t === "chat" ? "Chat" : t === "logs" ? "Logs" : "Configuracion"}
          </button>
        ))}
      </div>

      {/* Chat */}
      {tab === "chat" && (
        <div className="glass-card rounded-xl flex flex-col h-[calc(100vh-320px)] sm:h-[500px]">
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                </div>
                <p className="text-sm text-muted">Inicia una conversacion con <span className="text-accent-light font-medium">{agent.name}</span></p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3.5 sm:px-4 py-2.5 text-sm ${
                  msg.role === "user"
                    ? "bg-accent text-white rounded-br-md"
                    : "bg-surface border border-card-border text-foreground rounded-bl-md"
                }`}>
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-white/50" : "text-muted"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString("es-MX")}
                  </p>
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-surface border border-card-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={sendMessage} className="p-3 sm:p-4 border-t border-card-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Mensaje a ${agent.name}...`}
              className="flex-1 bg-background border border-card-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              className="px-4 sm:px-5 py-2.5 bg-accent text-white text-sm rounded-xl hover:bg-accent-light disabled:opacity-30 transition-all active:scale-95"
            >
              <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              <span className="hidden sm:inline">Enviar</span>
            </button>
          </form>
        </div>
      )}

      {/* Logs */}
      {tab === "logs" && (
        <div className="glass-card rounded-xl overflow-hidden">
          {/* Mobile: card layout */}
          <div className="sm:hidden divide-y divide-card-border max-h-[calc(100vh-320px)] overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="px-4 py-3 hover:bg-white/[0.02]">
                <div className="flex items-center justify-between mb-1">
                  <LogBadge level={log.level} />
                  <span className="text-[10px] text-muted font-mono">
                    {new Date(log.timestamp).toLocaleTimeString("es-MX")}
                  </span>
                </div>
                <p className="text-xs text-foreground mt-1">{log.message}</p>
              </div>
            ))}
          </div>
          {/* Desktop: table */}
          <div className="hidden sm:block overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-xs font-mono">
              <thead className="sticky top-0 bg-card z-10">
                <tr className="text-muted text-left border-b border-card-border">
                  <th className="p-3 w-20">Nivel</th>
                  <th className="p-3 w-44">Tiempo</th>
                  <th className="p-3">Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-card-border/50 hover:bg-white/[0.02]">
                    <td className="p-3"><LogBadge level={log.level} /></td>
                    <td className="p-3 text-muted">{new Date(log.timestamp).toLocaleString("es-MX")}</td>
                    <td className="p-3 text-foreground">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Config */}
      {tab === "config" && <ConfigPanel agent={agent} />}
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

function ConfigPanel({ agent }: { agent: Agent }) {
  const [config, setConfig] = useState(agent.config);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="glass-card rounded-xl p-4 sm:p-6 space-y-6 max-w-2xl">
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Configuracion del Agente</h3>
        <div className="space-y-4">
          <Field label="Endpoint del servidor">
            <input type="text" value={config.endpoint}
              onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
              className="w-full bg-background border border-card-border rounded-xl px-3 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all" />
          </Field>
          <Field label="Modelo">
            <input type="text" value={config.apiModel}
              onChange={(e) => setConfig({ ...config, apiModel: e.target.value })}
              className="w-full bg-background border border-card-border rounded-xl px-3 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all" />
          </Field>
          <Field label={`Temperature: ${config.temperature}`}>
            <input type="range" min="0" max="1" step="0.1" value={config.temperature}
              onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
              className="w-full accent-accent h-2" />
          </Field>
          <Field label="Max Tokens">
            <input type="number" value={config.maxTokens}
              onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) || 0 })}
              className="w-full bg-background border border-card-border rounded-xl px-3 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all" />
          </Field>
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-background/50 rounded-xl">
            <input type="checkbox" checked={config.autoRestart}
              onChange={(e) => setConfig({ ...config, autoRestart: e.target.checked })}
              className="accent-accent w-4 h-4" />
            <div>
              <p className="text-sm text-foreground">Auto-restart</p>
              <p className="text-[11px] text-muted">Reiniciar automaticamente si falla</p>
            </div>
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">System Prompt</h3>
        <textarea value={agent.systemPrompt} readOnly rows={3}
          className="w-full bg-background border border-card-border rounded-xl px-3 py-2.5 text-sm font-mono text-muted resize-none focus:outline-none" />
      </div>
      <div className="flex items-center gap-3">
        <button onClick={handleSave}
          className="px-5 py-2.5 bg-accent text-white text-sm rounded-xl hover:bg-accent-light transition-all active:scale-95">
          Guardar cambios
        </button>
        {saved && <span className="text-xs text-success font-medium">Guardado</span>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] text-muted mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
