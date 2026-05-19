import { AgentStatus } from "@/lib/types";

const statusConfig: Record<
  AgentStatus,
  { label: string; color: string; dot: string; bg: string }
> = {
  online: { label: "Online", color: "text-success", dot: "bg-success", bg: "bg-success-glow" },
  offline: { label: "Offline", color: "text-muted", dot: "bg-muted", bg: "bg-muted/10" },
  busy: { label: "Ocupado", color: "text-warning", dot: "bg-warning", bg: "bg-warning-glow" },
  error: { label: "Error", color: "text-danger", dot: "bg-danger", bg: "bg-danger-glow" },
};

export function StatusBadge({ status }: { status: AgentStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === "online" ? "animate-pulse-dot" : ""}`}
      />
      {cfg.label}
    </span>
  );
}
