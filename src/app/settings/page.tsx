"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [serverIp, setServerIp] = useState("192.168.1.100");
  const [apiBase, setApiBase] = useState("/v1");
  const [refreshInterval, setRefreshInterval] = useState("10");
  const [nvidiaApiKey, setNvidiaApiKey] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [autoReconnect, setAutoReconnect] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in max-w-2xl">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-hermes tracking-wide">Sacred Configuration</h1>
        </div>
        <p className="text-xs sm:text-sm text-muted mt-1 ml-10 italic">The divine settings of Mount Olympus</p>
      </div>

      <Section title="Temple Connection" icon="server">
        <Field label="Server IP"><input type="text" value={serverIp} onChange={(e) => setServerIp(e.target.value)} className="input-field" /></Field>
        <Field label="Base Path API"><input type="text" value={apiBase} onChange={(e) => setApiBase(e.target.value)} className="input-field" /></Field>
        <Field label="Refresh Interval (sec)"><input type="number" value={refreshInterval} onChange={(e) => setRefreshInterval(e.target.value)} className="input-field" /></Field>
      </Section>

      <Section title="Divine Power Source (NVIDIA)" icon="key">
        <Field label="NVIDIA API Key"><input type="password" value={nvidiaApiKey} onChange={(e) => setNvidiaApiKey(e.target.value)} placeholder="nvapi-..." className="input-field" /></Field>
        <p className="text-[11px] text-muted leading-relaxed italic">Authentication with NVIDIA NIM divine models.</p>
      </Section>

      <Section title="Oracle Endpoint" icon="oracle">
        <div className="bg-surface/80 rounded-xl p-3 border border-gold/8">
          <p className="text-[11px] text-muted mb-1 uppercase tracking-wider">MCP Server URL</p>
          <p className="text-sm font-mono text-gold-light break-all">hermes-dashboard-theta-two.vercel.app/api/mcp</p>
        </div>
        <p className="text-[11px] text-muted leading-relaxed italic">Use this sacred URL to connect your Hermes agents to Mount Olympus.</p>
      </Section>

      <Section title="Sacred Messenger (Webhook)" icon="messenger">
        <div className="bg-surface/80 rounded-xl p-3 border border-gold/8">
          <p className="text-[11px] text-muted mb-1 uppercase tracking-wider">Webhook URL</p>
          <p className="text-sm font-mono text-gold-light break-all">hermes-dashboard-theta-two.vercel.app/api/webhook/chat</p>
        </div>
        <div className="bg-surface/80 rounded-xl p-3 border border-gold/8">
          <p className="text-[11px] text-muted mb-2 uppercase tracking-wider">Example Offering (POST)</p>
          <pre className="text-[11px] font-mono text-foreground/80 whitespace-pre-wrap break-all leading-relaxed">{`{
  "agent_id": "mercury",
  "message": "Greetings from Telegram",
  "role": "user",
  "source": "telegram"
}`}</pre>
        </div>
        <p className="text-[11px] text-muted leading-relaxed italic">Use this webhook to connect Telegram, Slack or other channels to the divine dashboard.</p>
      </Section>

      <Section title="Divine Preferences" icon="prefs">
        <label className="flex items-start gap-3 cursor-pointer p-3 bg-surface/50 rounded-xl hover:bg-surface/80 transition-colors border border-transparent hover:border-gold/5">
          <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} className="accent-gold w-4 h-4 mt-0.5" />
          <div>
            <p className="text-sm text-foreground">Oracle Notifications</p>
            <p className="text-[11px] text-muted italic">Receive omens when a god falls or changes state</p>
          </div>
        </label>
        <label className="flex items-start gap-3 cursor-pointer p-3 bg-surface/50 rounded-xl hover:bg-surface/80 transition-colors border border-transparent hover:border-gold/5">
          <input type="checkbox" checked={autoReconnect} onChange={(e) => setAutoReconnect(e.target.checked)} className="accent-gold w-4 h-4 mt-0.5" />
          <div>
            <p className="text-sm text-foreground">Auto-Reconnection</p>
            <p className="text-[11px] text-muted italic">Automatically restore the divine link if connection is lost</p>
          </div>
        </label>
      </Section>

      <div className="flex items-center gap-3 pt-1">
        <button onClick={handleSave} className="px-5 py-2.5 bg-gold/12 text-gold-light text-sm font-medium rounded-xl border border-gold/20 hover:bg-gold/20 hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] transition-all active:scale-95">
          Seal the Configuration
        </button>
        {saved && <span className="text-xs text-success font-medium italic">Sealed by the Oracle</span>}
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-4 relative overflow-hidden">
      <div className="absolute inset-0 torch-glow pointer-events-none opacity-30" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <SectionIcon type={icon} />
          <h2 className="text-sm font-semibold text-gold-light">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}

function SectionIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    server: "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7",
    key: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
    oracle: "M13 10V3L4 14h7v7l9-11h-7z",
    messenger: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
    prefs: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75",
  };
  return (
    <svg className="w-4 h-4 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[type] || paths.oracle} />
    </svg>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-[11px] text-muted mb-1.5 uppercase tracking-[0.15em]">{label}</label>{children}</div>;
}
