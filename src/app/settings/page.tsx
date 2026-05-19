"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [serverIp, setServerIp] = useState("192.168.1.100");
  const [apiBase, setApiBase] = useState("/v1");
  const [refreshInterval, setRefreshInterval] = useState("30");
  const [nvidiaApiKey, setNvidiaApiKey] = useState("nvapi-****-****-****");
  const [notifications, setNotifications] = useState(true);
  const [autoReconnect, setAutoReconnect] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-5 sm:space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Configuracion</h1>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Ajustes globales del sistema Hermes Mission Control
        </p>
      </div>

      <Section title="Conexion al Servidor" icon={<ServerIcon />}>
        <Field label="IP del servidor">
          <input type="text" value={serverIp} onChange={(e) => setServerIp(e.target.value)}
            className="w-full bg-background border border-card-border rounded-xl px-3 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all" />
        </Field>
        <Field label="Base path de la API">
          <input type="text" value={apiBase} onChange={(e) => setApiBase(e.target.value)}
            className="w-full bg-background border border-card-border rounded-xl px-3 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all" />
        </Field>
        <Field label="Intervalo de refresco (segundos)">
          <input type="number" value={refreshInterval} onChange={(e) => setRefreshInterval(e.target.value)}
            className="w-full bg-background border border-card-border rounded-xl px-3 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all" />
        </Field>
      </Section>

      <Section title="API de NVIDIA" icon={<KeyIcon />}>
        <Field label="NVIDIA API Key">
          <input type="password" value={nvidiaApiKey} onChange={(e) => setNvidiaApiKey(e.target.value)}
            className="w-full bg-background border border-card-border rounded-xl px-3 py-2.5 text-sm font-mono text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all" />
        </Field>
        <p className="text-[11px] text-muted leading-relaxed">
          La API key se usa para autenticar los agentes con los modelos de NVIDIA NIM en el servidor.
        </p>
      </Section>

      <Section title="Preferencias" icon={<ToggleIcon />}>
        <label className="flex items-start gap-3 cursor-pointer p-3 bg-background/50 rounded-xl hover:bg-background/80 transition-colors">
          <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)}
            className="accent-accent w-4 h-4 mt-0.5" />
          <div>
            <p className="text-sm text-foreground">Notificaciones</p>
            <p className="text-[11px] text-muted leading-relaxed">Recibir alertas cuando un agente falle o cambie de estado</p>
          </div>
        </label>
        <label className="flex items-start gap-3 cursor-pointer p-3 bg-background/50 rounded-xl hover:bg-background/80 transition-colors">
          <input type="checkbox" checked={autoReconnect} onChange={(e) => setAutoReconnect(e.target.checked)}
            className="accent-accent w-4 h-4 mt-0.5" />
          <div>
            <p className="text-sm text-foreground">Auto-reconexion</p>
            <p className="text-[11px] text-muted leading-relaxed">Intentar reconectar si se pierde la conexion con el servidor</p>
          </div>
        </label>
      </Section>

      <div className="flex items-center gap-3 pt-1">
        <button onClick={handleSave}
          className="px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-xl hover:bg-accent-light transition-all active:scale-95">
          Guardar configuracion
        </button>
        {saved && <span className="text-xs text-success font-medium">Configuracion guardada</span>}
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-xl p-4 sm:p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-muted">{icon}</span>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      {children}
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

function ServerIcon() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" /></svg>;
}
function KeyIcon() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>;
}
function ToggleIcon() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>;
}
