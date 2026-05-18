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
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Configuracion</h1>
        <p className="text-sm text-muted mt-1">
          Ajustes globales del sistema Hermes Mission Control
        </p>
      </div>

      {/* Server Connection */}
      <Section title="Conexion al Servidor">
        <Field label="IP del servidor">
          <input
            type="text"
            value={serverIp}
            onChange={(e) => setServerIp(e.target.value)}
            className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent"
          />
        </Field>
        <Field label="Base path de la API">
          <input
            type="text"
            value={apiBase}
            onChange={(e) => setApiBase(e.target.value)}
            className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent"
          />
        </Field>
        <Field label="Intervalo de refresco (segundos)">
          <input
            type="number"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(e.target.value)}
            className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent"
          />
        </Field>
      </Section>

      {/* NVIDIA API */}
      <Section title="API de NVIDIA">
        <Field label="NVIDIA API Key">
          <input
            type="password"
            value={nvidiaApiKey}
            onChange={(e) => setNvidiaApiKey(e.target.value)}
            className="w-full bg-background border border-card-border rounded-lg px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-accent"
          />
        </Field>
        <p className="text-[11px] text-muted">
          La API key se usa para autenticar los agentes con los modelos de
          NVIDIA NIM en el servidor.
        </p>
      </Section>

      {/* Preferences */}
      <Section title="Preferencias">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="accent-accent"
          />
          <div>
            <p className="text-sm text-foreground">Notificaciones</p>
            <p className="text-[11px] text-muted">
              Recibir alertas cuando un agente falle o cambie de estado
            </p>
          </div>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={autoReconnect}
            onChange={(e) => setAutoReconnect(e.target.checked)}
            className="accent-accent"
          />
          <div>
            <p className="text-sm text-foreground">Auto-reconexion</p>
            <p className="text-[11px] text-muted">
              Intentar reconectar automaticamente si se pierde la conexion con
              el servidor
            </p>
          </div>
        </label>
      </Section>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 transition-colors"
        >
          Guardar configuracion
        </button>
        {saved && (
          <span className="text-xs text-success">Configuracion guardada</span>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-card-border rounded-xl p-6 space-y-4">
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      {children}
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
