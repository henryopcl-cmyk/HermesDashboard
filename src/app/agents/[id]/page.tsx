"use client";

import { useEffect, useState, useRef, use } from "react";
import { Agent, ChatMessage, LogEntry } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";

type Tab = "chat" | "logs" | "config";

export default function AgentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [tab, setTab] = useState<Tab>("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/agents/${id}`)
      .then((r) => r.json())
      .then(setAgent);
    fetch(`/api/agents/${id}/logs`)
      .then((r) => r.json())
      .then(setLogs);
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
      agentId: id,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    const res = await fetch(`/api/agents/${id}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.content }),
    });
    const reply = await res.json();
    setMessages((prev) => [...prev, reply]);
    setSending(false);
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-64 text-muted">
        Cargando agente...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb + Header */}
      <div>
        <Link
          href="/agents"
          className="text-xs text-muted hover:text-accent transition-colors"
        >
          Agentes
        </Link>
        <span className="text-xs text-muted mx-2">/</span>
        <span className="text-xs text-foreground">{agent.name}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
            <StatusBadge status={agent.status} />
          </div>
          <p className="text-sm text-muted mt-1">{agent.description}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted">
          <span>
            Modelo:{" "}
            <span className="text-foreground font-mono">
              {agent.model.split("/").pop()}
            </span>
          </span>
          <span>
            Uptime:{" "}
            <span className="text-foreground font-mono">{agent.uptime}</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-card-border">
        {(["chat", "logs", "config"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? "text-accent border-accent"
                : "text-muted border-transparent hover:text-foreground"
            }`}
          >
            {t === "chat" ? "Chat" : t === "logs" ? "Logs" : "Configuracion"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "chat" && (
        <div className="bg-card border border-card-border rounded-xl flex flex-col h-[500px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-muted text-sm">
                Envia un mensaje para iniciar la conversacion con {agent.name}
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-accent text-white"
                      : "bg-background border border-card-border text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p
                    className={`text-[10px] mt-1 ${msg.role === "user" ? "text-white/60" : "text-muted"}`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString("es-MX")}
                  </p>
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-background border border-card-border rounded-xl px-4 py-2.5 text-sm text-muted">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce [animation-delay:0.1s]">
                      .
                    </span>
                    <span className="animate-bounce [animation-delay:0.2s]">
                      .
                    </span>
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="p-4 border-t border-card-border flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Escribe un mensaje a ${agent.name}...`}
              className="flex-1 bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              className="px-5 py-2.5 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 disabled:opacity-40 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      {tab === "logs" && (
        <div className="bg-card border border-card-border rounded-xl p-4 max-h-[500px] overflow-y-auto font-mono text-xs">
          <table className="w-full">
            <thead>
              <tr className="text-muted text-left border-b border-card-border">
                <th className="pb-2 pr-4 w-20">Nivel</th>
                <th className="pb-2 pr-4 w-44">Tiempo</th>
                <th className="pb-2">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-card-border/50 hover:bg-white/[0.02]"
                >
                  <td className="py-1.5 pr-4">
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
                  <td className="py-1.5 pr-4 text-muted">
                    {new Date(log.timestamp).toLocaleString("es-MX")}
                  </td>
                  <td className="py-1.5 text-foreground">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "config" && <ConfigPanel agent={agent} />}
    </div>
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
    <div className="bg-card border border-card-border rounded-xl p-6 space-y-6 max-w-2xl">
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">
          Configuracion del Agente
        </h3>
        <div className="space-y-4">
          <Field label="Endpoint del servidor">
            <input
              type="text"
              value={config.endpoint}
              onChange={(e) =>
                setConfig({ ...config, endpoint: e.target.value })
              }
              className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent"
            />
          </Field>
          <Field label="Modelo">
            <input
              type="text"
              value={config.apiModel}
              onChange={(e) =>
                setConfig({ ...config, apiModel: e.target.value })
              }
              className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent"
            />
          </Field>
          <Field label={`Temperature: ${config.temperature}`}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={config.temperature}
              onChange={(e) =>
                setConfig({
                  ...config,
                  temperature: parseFloat(e.target.value),
                })
              }
              className="w-full accent-accent"
            />
          </Field>
          <Field label="Max Tokens">
            <input
              type="number"
              value={config.maxTokens}
              onChange={(e) =>
                setConfig({
                  ...config,
                  maxTokens: parseInt(e.target.value) || 0,
                })
              }
              className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent"
            />
          </Field>
          <Field label="Auto-restart">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.autoRestart}
                onChange={(e) =>
                  setConfig({ ...config, autoRestart: e.target.checked })
                }
                className="accent-accent"
              />
              <span className="text-sm text-foreground">
                Reiniciar automaticamente si el agente falla
              </span>
            </label>
          </Field>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white mb-4">
          System Prompt
        </h3>
        <textarea
          value={agent.systemPrompt}
          readOnly
          rows={4}
          className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm font-mono text-muted resize-none focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 transition-colors"
        >
          Guardar cambios
        </button>
        {saved && (
          <span className="text-xs text-success">
            Configuracion guardada
          </span>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs text-muted mb-1.5">{label}</label>
      {children}
    </div>
  );
}
