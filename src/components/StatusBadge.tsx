import { AgentStatus } from "@/lib/types";

const statusConfig: Record<
  AgentStatus,
  { label: string; color: string; dot: string }
> = {
  online: { label: "Online", color: "text-success", dot: "bg-success" },
  offline: { label: "Offline", color: "text-muted", dot: "bg-muted" },
  busy: { label: "Ocupado", color: "text-warning", dot: "bg-warning" },
  error: { label: "Error", color: "text-danger", dot: "bg-danger" },
};

export function StatusBadge({ status }: { status: AgentStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${cfg.color}`}>
      <span
        className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === "online" ? "animate-pulse-dot" : ""}`}
      />
      {cfg.label}
    </span>
  );
}
