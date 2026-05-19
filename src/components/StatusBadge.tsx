import { AgentStatus } from "@/lib/types";

const statusConfig: Record<AgentStatus, { label: string; color: string; dot: string; bg: string }> = {
  online:  { label: "Online",  color: "text-success", dot: "bg-success", bg: "bg-success/8 border border-success/15" },
  offline: { label: "Offline", color: "text-muted",   dot: "bg-muted",   bg: "bg-muted/8 border border-muted/15" },
  busy:    { label: "Ocupado", color: "text-warning", dot: "bg-warning", bg: "bg-warning/8 border border-warning/15" },
  error:   { label: "Error",   color: "text-danger",  dot: "bg-danger",  bg: "bg-danger/8 border border-danger/15" },
};

export function StatusBadge({ status }: { status: AgentStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-lg ${cfg.bg} ${cfg.color} uppercase tracking-wider`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === "online" ? "animate-pulse-dot" : ""}`} />
      {cfg.label}
    </span>
  );
}
