"use client";

import { useEffect, useState, useRef, use, useCallback } from "react";
import { Agent, ChatMessage, LogEntry } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import { GodAvatar, getAgentGradient } from "@/components/GodAvatar";
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
  const lastPollRef = useRef<string | null>(null);

  useEffect(() => {
    const load = () => {
      fetch(`/api/agents/${id}`)
        .then((r) => { if (!r.ok) throw new Error("not found"); return r.json(); })
        .then((data) => { if (data && data.id) setAgent(data); })
        .catch(() => {});
      fetch(`/api/agents/${id}/logs`)
        .then((r) => r.ok ? r.json() : [])
        .then((data) => { if (Array.isArray(data)) setLogs(data); })
        .catch(() => {});
    };
    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const pollMessages = useCallback(() => {
    const url = lastPollRef.current
      ? `/api/agents/${id}/chat?since=${encodeURIComponent(lastPollRef.current)}`
      : `/api/agents/${id}/chat`;
    fetch(url)
      .then((r) => r.ok ? r.json() : [])
      .then((newMsgs: ChatMessage[]) => {
        if (!Array.isArray(newMsgs) || newMsgs.length === 0) return;
        setMessages((prev) => {
          const ids = new Set(prev.map((m) => m.id));
          const fresh = newMsgs.filter((m) => !ids.has(m.id));
          if (fresh.length === 0) return prev;
          return [...prev, ...fresh];
        });
        const latest = newMsgs[newMsgs.length - 1];
        if (latest) lastPollRef.current = latest.timestamp;
        if (newMsgs.some((m) => m.role === "assistant")) {
          setSending(false);
        }
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    pollMessages();
    const interval = setInterval(pollMessages, 2000);
    return () => clearInterval(interval);
  }, [pollMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput("");
    setSending(true);

    try {
      const res = await fetch(`/api/agents/${id}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();

      const addMsg = (msg: ChatMessage) => {
        setMessages((prev) => {
          const ids = new Set(prev.map((m) => m.id));
          if (ids.has(msg.id)) return prev;
          return [...prev, msg];
        });
        lastPollRef.current = msg.timestamp;
      };

      if (data.userMessage && data.assistantMessage) {
        addMsg(data.userMessage);
        addMsg(data.assistantMessage);
        setSending(false);
      } else if (data.userMessage && data.error) {
        addMsg(data.userMessage);
        const errMsg: ChatMessage = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: `Error: ${data.error} — ${data.detail || "No details"}`,
          timestamp: new Date().toISOString(),
          agentId: id,
        };
        setMessages((prev) => [...prev, errMsg]);
        setSending(false);
      } else if (data.id) {
        addMsg(data);
      }
    } catch {
      setSending(false);
    }
  }

  if (!agent) {
    return (
      <div className="flex items-center justify-center h-64 text-muted">
        <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin mr-3" />
        <span className="italic">Summoning deity...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <Link href="/agents" className="text-muted hover:text-gold transition-colors">The Pantheon</Link>
        <span className="text-gold/20">/</span>
        <span className="text-gold/80">{agent.name}</span>
      </div>

      {/* Profile header */}
      <div className="glass-card rounded-2xl overflow-hidden relative">
        <div className={`h-2 bg-gradient-to-r ${getAgentGradient(agent.id)}`} />
        {/* Torch glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-gold/[0.03] rounded-full blur-2xl pointer-events-none" />
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 relative">
          <GodAvatar agentId={agent.id} size="xl" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{agent.name}</h1>
              <StatusBadge status={agent.status} />
            </div>
            <p className="text-[11px] text-gold/60 font-medium uppercase tracking-[0.15em] mt-1">{agent.role}</p>
            <p className="text-xs text-muted mt-1.5 line-clamp-2 italic">{agent.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Tag label="Power" value={agent.model.split("/").pop() || ""} />
            <Tag label="Age" value={agent.uptime} />
          </div>
        </div>
      </div>

      {/* Tabs - Greek inscription style */}
      <div className="flex gap-1 border-b border-card-border overflow-x-auto">
        {(["chat", "logs", "config"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs sm:text-sm font-medium transition-all border-b-2 -mb-px whitespace-nowrap ${
              tab === t ? "text-gold-light border-gold" : "text-muted border-transparent hover:text-foreground"
            }`}>
            {t === "chat" ? "Divine Chat" : t === "logs" ? "Oracle Logs" : "Sacred Config"}
            {t === "chat" && sending && (
              <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Chat */}
      {tab === "chat" && (
        <div className="glass-card rounded-2xl flex flex-col h-[calc(100vh-380px)] sm:h-[460px] relative overflow-hidden">
          {/* Parchment texture overlay */}
          <div className="absolute inset-0 olympus-gradient pointer-events-none" />

          {/* Connection info bar */}
          <div className="px-4 py-2 border-b border-card-border flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 text-[10px] text-muted">
              <span className={`w-1.5 h-1.5 rounded-full ${agent.status === "online" || agent.status === "busy" ? "bg-success animate-pulse-dot" : "bg-muted"}`} />
              {agent.status === "online" || agent.status === "busy" ? "Connected through the Oracle" : "Deity is dormant"}
            </div>
            <span className="text-[10px] text-muted/50 font-mono">oracle poll 2s</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 relative z-10">
            {messages.length === 0 && !sending && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <GodAvatar agentId={agent.id} size="lg" />
                <p className="text-sm text-muted mt-3">Speak with <span className="text-gold-light font-medium">{agent.name}</span></p>
                <p className="text-[11px] text-muted/60 mt-1 max-w-xs italic">
                  Your prayer shall be delivered through the Oracle. The deity&apos;s response will manifest here.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="mr-2 mt-1 shrink-0">
                    <GodAvatar agentId={agent.id} size="sm" />
                  </div>
                )}
                <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-3.5 py-2.5 text-sm ${
                  msg.role === "user" ? "bg-gold/12 text-gold-light border border-gold/10 rounded-br-md" : "bg-surface border border-card-border text-foreground rounded-bl-md"
                }`}>
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-gold/30" : "text-muted"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString("es-MX")}
                  </p>
                </div>
              </div>
            ))}
            {sending && !messages.some((m, i) => m.role === "assistant" && i === messages.length - 1) && (
              <div className="flex justify-start">
                <div className="mr-2 mt-1 shrink-0">
                  <GodAvatar agentId={agent.id} size="sm" />
                </div>
                <div className="bg-surface border border-card-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-gold/40 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-gold/40 animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-gold/40 animate-bounce [animation-delay:0.3s]" />
                    <span className="text-[10px] text-muted/50 ml-2 italic">the deity ponders...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={sendMessage} className="p-3 sm:p-4 border-t border-card-border flex gap-2 relative z-10">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder={`Offer a prayer to ${agent.name}...`}
              className="flex-1 bg-surface border border-card-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold/30 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.05)] transition-all" />
            <button type="submit" disabled={!input.trim() || sending}
              className="px-4 sm:px-5 py-2.5 bg-gold/12 text-gold-light text-sm rounded-xl border border-gold/20 hover:bg-gold/20 hover:shadow-[0_0_15px_rgba(201,168,76,0.08)] disabled:opacity-30 transition-all active:scale-95">
              <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      )}

      {/* Logs */}
      {tab === "logs" && (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="sm:hidden divide-y divide-card-border max-h-[calc(100vh-380px)] overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="px-4 py-3 hover:bg-gold/[0.01] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <LogBadge level={log.level} />
                  <span className="text-[10px] text-muted font-mono">{new Date(log.timestamp).toLocaleTimeString("es-MX")}</span>
                </div>
                <p className="text-xs text-foreground mt-1">{log.message}</p>
              </div>
            ))}
            {logs.length === 0 && <div className="p-8 text-center text-xs text-muted italic">No oracle visions yet</div>}
          </div>
          <div className="hidden sm:block overflow-x-auto max-h-[460px] overflow-y-auto">
            <table className="w-full text-xs font-mono">
              <thead className="sticky top-0 bg-card z-10">
                <tr className="text-muted text-left border-b border-card-border">
                  <th className="p-3 w-20 uppercase tracking-wider text-[10px]">Omen</th>
                  <th className="p-3 w-44 uppercase tracking-wider text-[10px]">Time</th>
                  <th className="p-3 uppercase tracking-wider text-[10px]">Prophecy</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-card-border/50 hover:bg-gold/[0.01] transition-colors">
                    <td className="p-3"><LogBadge level={log.level} /></td>
                    <td className="p-3 text-muted">{new Date(log.timestamp).toLocaleString("es-MX")}</td>
                    <td className="p-3 text-foreground">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {logs.length === 0 && <div className="p-8 text-center text-xs text-muted italic">No visions from this deity</div>}
          </div>
        </div>
      )}

      {tab === "config" && <ConfigPanel agent={agent} />}
    </div>
  );
}

function Tag({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-[11px] bg-surface/80 px-2.5 py-1.5 rounded-lg border border-gold/[0.06]">
      <span className="text-muted">{label}: </span>
      <span className="text-foreground font-mono">{value}</span>
    </span>
  );
}

function LogBadge({ level }: { level: string }) {
  const s: Record<string, string> = { error: "bg-danger/20 text-danger", warn: "bg-warning/20 text-warning", info: "bg-gold/15 text-gold-light", debug: "bg-muted/20 text-muted" };
  return <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold ${s[level] || s.debug}`}>{level}</span>;
}

function ConfigPanel({ agent }: { agent: Agent }) {
  const [config, setConfig] = useState(agent.config);
  const [saved, setSaved] = useState(false);
  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-6 max-w-2xl relative overflow-hidden">
      <div className="absolute inset-0 torch-glow pointer-events-none opacity-30" />
      <div className="relative">
        <div>
          <h3 className="text-sm font-semibold text-gold-light mb-4">Sacred Parameters</h3>
          <div className="space-y-4">
            <Field label="Endpoint"><input type="text" value={config.endpoint} onChange={(e) => setConfig({ ...config, endpoint: e.target.value })} className="input-field" /></Field>
            <Field label="Power Source"><input type="text" value={config.apiModel} onChange={(e) => setConfig({ ...config, apiModel: e.target.value })} className="input-field" /></Field>
            <Field label={`Temperature: ${config.temperature}`}><input type="range" min="0" max="1" step="0.1" value={config.temperature} onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })} className="w-full accent-gold h-2" /></Field>
            <Field label="Max Tokens"><input type="number" value={config.maxTokens} onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) || 0 })} className="input-field" /></Field>
            <label className="flex items-center gap-3 cursor-pointer p-3 bg-surface/50 rounded-xl border border-transparent hover:border-gold/5 transition-colors">
              <input type="checkbox" checked={config.autoRestart} onChange={(e) => setConfig({ ...config, autoRestart: e.target.checked })} className="accent-gold w-4 h-4" />
              <div>
                <p className="text-sm text-foreground">Auto-Revival</p>
                <p className="text-[11px] text-muted italic">Resurrect the deity if it falls</p>
              </div>
            </label>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gold-light mb-3">Divine Mandate</h3>
          <textarea value={agent.systemPrompt} readOnly rows={3} className="w-full bg-surface border border-card-border rounded-xl px-3 py-2.5 text-sm font-mono text-muted resize-none focus:outline-none" />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="px-5 py-2.5 bg-gold/12 text-gold-light text-sm rounded-xl border border-gold/20 hover:bg-gold/20 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] transition-all active:scale-95">Seal</button>
          {saved && <span className="text-xs text-success font-medium italic">Sealed by the Oracle</span>}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-[11px] text-muted mb-1.5 uppercase tracking-[0.15em]">{label}</label>{children}</div>;
}
