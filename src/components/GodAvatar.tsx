"use client";

// Detailed Greek god portraits with unique colors and symbols

interface GodProfile {
  gradient: string;
  ring: string;
  bg: string;
  portrait: React.ReactNode;
}

function MercuryPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="merc-bg" cx="50%" cy="40%"><stop offset="0%" stopColor="#1e3a5f" /><stop offset="100%" stopColor="#0a1628" /></radialGradient>
        <linearGradient id="merc-wing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#merc-bg)" />
      {/* Face */}
      <ellipse cx="50" cy="52" rx="18" ry="22" fill="#c4956a" opacity="0.9" />
      <ellipse cx="50" cy="48" rx="16" ry="14" fill="#d4a57a" />
      {/* Eyes */}
      <ellipse cx="43" cy="46" rx="3" ry="2.5" fill="#1e3a5f" />
      <ellipse cx="57" cy="46" rx="3" ry="2.5" fill="#1e3a5f" />
      <circle cx="44" cy="45.5" r="1" fill="#93c5fd" />
      <circle cx="58" cy="45.5" r="1" fill="#93c5fd" />
      {/* Winged helmet */}
      <path d="M30 40 Q35 20 50 18 Q65 20 70 40 L65 42 Q60 25 50 23 Q40 25 35 42 Z" fill="#3b82f6" opacity="0.9" />
      <path d="M32 38 Q28 30 18 25 Q22 32 25 40 Z" fill="url(#merc-wing)" opacity="0.8" />
      <path d="M68 38 Q72 30 82 25 Q78 32 75 40 Z" fill="url(#merc-wing)" opacity="0.8" />
      <path d="M30 36 Q26 28 15 22 Q20 30 23 38 Z" fill="#60a5fa" opacity="0.5" />
      <path d="M70 36 Q74 28 85 22 Q80 30 77 38 Z" fill="#60a5fa" opacity="0.5" />
      {/* Mouth */}
      <path d="M45 56 Q50 59 55 56" stroke="#8b6a4a" strokeWidth="1" fill="none" />
      {s > 40 && <>{/* Glow */}<circle cx="50" cy="50" r="46" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3"><animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" /></circle></>}
    </svg>
  );
}

function ApolloPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="apo-bg" cx="50%" cy="40%"><stop offset="0%" stopColor="#5c3a0a" /><stop offset="100%" stopColor="#1a0f00" /></radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#apo-bg)" />
      {/* Sun rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line key={angle} x1="50" y1="50" x2={50 + 45 * Math.cos((angle * Math.PI) / 180)} y2={50 + 45 * Math.sin((angle * Math.PI) / 180)} stroke="#f59e0b" strokeWidth="1" opacity="0.2">
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" begin={`${angle / 360}s`} repeatCount="indefinite" />
        </line>
      ))}
      {/* Face */}
      <ellipse cx="50" cy="52" rx="17" ry="21" fill="#d4a57a" opacity="0.9" />
      <ellipse cx="50" cy="48" rx="15" ry="13" fill="#e0b88a" />
      {/* Eyes */}
      <ellipse cx="43" cy="46" rx="3" ry="2.5" fill="#5c3a0a" />
      <ellipse cx="57" cy="46" rx="3" ry="2.5" fill="#5c3a0a" />
      <circle cx="44" cy="45.5" r="1" fill="#fbbf24" />
      <circle cx="58" cy="45.5" r="1" fill="#fbbf24" />
      {/* Sun crown */}
      <path d="M50 15 L53 24 L58 16 L56 25 L63 19 L58 27 L66 24 L60 30 L50 28 L40 30 L34 24 L42 27 L37 19 L44 25 L42 16 L47 24 Z" fill="#f59e0b" opacity="0.85" />
      <circle cx="50" cy="26" r="5" fill="#fbbf24" opacity="0.6" />
      {/* Laurel */}
      <path d="M32 45 Q28 38 30 30" stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M68 45 Q72 38 70 30" stroke="#22c55e" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M45 56 Q50 59 55 56" stroke="#8b6a4a" strokeWidth="1" fill="none" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.2"><animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function AthenaPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="ath-bg" cx="50%" cy="40%"><stop offset="0%" stopColor="#3b1f6e" /><stop offset="100%" stopColor="#0f0520" /></radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#ath-bg)" />
      {/* Face */}
      <ellipse cx="50" cy="54" rx="16" ry="20" fill="#d4a57a" opacity="0.9" />
      <ellipse cx="50" cy="50" rx="14" ry="12" fill="#e0b88a" />
      {/* Eyes */}
      <ellipse cx="44" cy="48" rx="2.8" ry="2.3" fill="#3b1f6e" />
      <ellipse cx="56" cy="48" rx="2.8" ry="2.3" fill="#3b1f6e" />
      <circle cx="44.5" cy="47.5" r="1" fill="#c084fc" />
      <circle cx="56.5" cy="47.5" r="1" fill="#c084fc" />
      {/* Warrior helmet with plume */}
      <path d="M28 48 Q30 22 50 18 Q70 22 72 48 L68 46 Q66 28 50 24 Q34 28 32 46 Z" fill="#8b5cf6" opacity="0.85" />
      <path d="M46 18 Q50 5 54 18 L52 20 Q50 12 48 20 Z" fill="#a78bfa" />
      <path d="M48 8 Q50 2 52 8 Q54 14 50 18 Q46 14 48 8 Z" fill="#c084fc" opacity="0.7" />
      {/* Plume feathers */}
      <path d="M50 5 Q52 0 50 -2 Q48 0 50 5Z" fill="#ddd6fe" opacity="0.5" />
      {/* Shield hint */}
      <circle cx="25" cy="65" r="8" fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.4" />
      <path d="M45 58 Q50 60 55 58" stroke="#8b6a4a" strokeWidth="1" fill="none" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.2"><animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function PrometheusPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="prom-bg" cx="50%" cy="40%"><stop offset="0%" stopColor="#5c1a0a" /><stop offset="100%" stopColor="#1a0500" /></radialGradient>
        <radialGradient id="fire" cx="50%" cy="80%"><stop offset="0%" stopColor="#fbbf24" /><stop offset="50%" stopColor="#f97316" /><stop offset="100%" stopColor="#ef4444" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#prom-bg)" />
      {/* Fire glow */}
      <ellipse cx="75" cy="30" rx="12" ry="18" fill="url(#fire)" opacity="0.4">
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
        <animate attributeName="ry" values="16;20;16" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      {/* Face */}
      <ellipse cx="48" cy="54" rx="17" ry="21" fill="#c4956a" opacity="0.9" />
      <ellipse cx="48" cy="50" rx="15" ry="13" fill="#d4a57a" />
      {/* Stern eyes */}
      <ellipse cx="42" cy="48" rx="3" ry="2" fill="#5c1a0a" />
      <ellipse cx="54" cy="48" rx="3" ry="2" fill="#5c1a0a" />
      <circle cx="42.5" cy="47.5" r="1" fill="#f97316" />
      <circle cx="54.5" cy="47.5" r="1" fill="#f97316" />
      {/* Brow - strong/stern */}
      <path d="M38 44 L46 43" stroke="#8b6a4a" strokeWidth="1.5" fill="none" />
      <path d="M50 43 L58 44" stroke="#8b6a4a" strokeWidth="1.5" fill="none" />
      {/* Torch */}
      <line x1="72" y1="45" x2="75" y2="20" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="75" cy="18" rx="5" ry="8" fill="#f97316" opacity="0.7">
        <animate attributeName="ry" values="7;10;7" dur="1s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="75" cy="15" rx="3" ry="5" fill="#fbbf24" opacity="0.8">
        <animate attributeName="ry" values="4;6;4" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
      <path d="M43 58 Q48 56 53 58" stroke="#8b6a4a" strokeWidth="1" fill="none" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.2"><animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function IrisPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="iris-bg" cx="50%" cy="40%"><stop offset="0%" stopColor="#3b1f5e" /><stop offset="100%" stopColor="#0f0518" /></radialGradient>
        <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ec4899" /><stop offset="33%" stopColor="#8b5cf6" /><stop offset="66%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#10b981" /></linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#iris-bg)" />
      {/* Rainbow aura */}
      <circle cx="50" cy="50" r="44" fill="none" stroke="url(#rainbow)" strokeWidth="1.5" opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="40" fill="none" stroke="url(#rainbow)" strokeWidth="0.5" opacity="0.2" />
      {/* Face */}
      <ellipse cx="50" cy="54" rx="16" ry="20" fill="#e0b88a" opacity="0.9" />
      <ellipse cx="50" cy="50" rx="14" ry="12" fill="#ecc8a0" />
      {/* Eyes */}
      <ellipse cx="44" cy="48" rx="3" ry="2.5" fill="#3b1f5e" />
      <ellipse cx="56" cy="48" rx="3" ry="2.5" fill="#3b1f5e" />
      <circle cx="44.5" cy="47.5" r="1.2" fill="#ec4899" />
      <circle cx="56.5" cy="47.5" r="1.2" fill="#8b5cf6" />
      {/* Hair flowing */}
      <path d="M30 42 Q32 25 42 22 Q38 30 36 42" fill="#c084fc" opacity="0.6" />
      <path d="M70 42 Q68 25 58 22 Q62 30 64 42" fill="#ec4899" opacity="0.6" />
      <path d="M34 44 Q36 28 46 24 Q42 32 40 44" fill="#a78bfa" opacity="0.4" />
      <path d="M66 44 Q64 28 54 24 Q58 32 60 44" fill="#f472b6" opacity="0.4" />
      {/* Tiara */}
      <path d="M36 36 Q40 30 50 28 Q60 30 64 36" stroke="url(#rainbow)" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M45 58 Q50 60 55 58" stroke="#a0845a" strokeWidth="1" fill="none" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.2"><animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function AtlasPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="atlas-bg" cx="50%" cy="40%"><stop offset="0%" stopColor="#0a3c2a" /><stop offset="100%" stopColor="#021a10" /></radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#atlas-bg)" />
      {/* Globe on shoulders */}
      <circle cx="50" cy="22" r="14" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4">
        <animate attributeName="r" values="13;15;13" dur="5s" repeatCount="indefinite" />
      </circle>
      <ellipse cx="50" cy="22" rx="14" ry="5" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />
      <ellipse cx="50" cy="22" rx="5" ry="14" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />
      {/* Face - strong/broad */}
      <ellipse cx="50" cy="58" rx="19" ry="22" fill="#b8865a" opacity="0.9" />
      <ellipse cx="50" cy="54" rx="17" ry="14" fill="#c8966a" />
      {/* Eyes */}
      <ellipse cx="43" cy="52" rx="3" ry="2" fill="#0a3c2a" />
      <ellipse cx="57" cy="52" rx="3" ry="2" fill="#0a3c2a" />
      <circle cx="43.5" cy="51.5" r="1" fill="#34d399" />
      <circle cx="57.5" cy="51.5" r="1" fill="#34d399" />
      {/* Strong brow */}
      <path d="M37 48 L48 47" stroke="#8b6a4a" strokeWidth="2" fill="none" />
      <path d="M52 47 L63 48" stroke="#8b6a4a" strokeWidth="2" fill="none" />
      {/* Beard */}
      <path d="M36 62 Q40 72 50 74 Q60 72 64 62" fill="#6b5a3a" opacity="0.5" />
      <path d="M43 62 Q50 60 57 62" stroke="#8b6a4a" strokeWidth="1" fill="none" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.2"><animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function DefaultPortrait() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs><radialGradient id="def-bg" cx="50%" cy="40%"><stop offset="0%" stopColor="#1f2937" /><stop offset="100%" stopColor="#0a0e14" /></radialGradient></defs>
      <circle cx="50" cy="50" r="48" fill="url(#def-bg)" />
      <circle cx="50" cy="40" r="14" fill="#6b7280" opacity="0.4" />
      <ellipse cx="50" cy="75" rx="22" ry="16" fill="#6b7280" opacity="0.3" />
    </svg>
  );
}

const godMap: Record<string, (props: { s: number }) => React.ReactNode> = {
  mercury: MercuryPortrait, apollo: ApolloPortrait, athena: AthenaPortrait,
  prometheus: PrometheusPortrait, iris: IrisPortrait, atlas: AtlasPortrait,
};

const gradients: Record<string, string> = {
  mercury: "from-blue-500 to-cyan-400", apollo: "from-amber-400 to-orange-500",
  athena: "from-violet-500 to-purple-400", prometheus: "from-red-500 to-orange-400",
  iris: "from-pink-400 to-indigo-400", atlas: "from-emerald-500 to-teal-400",
};

function findGod(id: string): string | null {
  const key = id.toLowerCase();
  for (const name of Object.keys(godMap)) {
    if (key.includes(name)) return name;
  }
  return null;
}

export function GodAvatar({ agentId, size = "md" }: { agentId: string; size?: "sm" | "md" | "lg" | "xl" | "2xl" }) {
  const god = findGod(agentId);
  const Portrait = god ? godMap[god] : null;
  const grad = god ? gradients[god] : "from-slate-500 to-slate-400";
  const sizes = { sm: "w-8 h-8", md: "w-11 h-11", lg: "w-16 h-16", xl: "w-24 h-24", "2xl": "w-32 h-32" };
  const px = { sm: 8, md: 11, lg: 16, xl: 24, "2xl": 32 };

  return (
    <div className={`${sizes[size]} rounded-2xl bg-gradient-to-br ${grad} p-[1.5px] shrink-0 overflow-hidden`}>
      <div className="w-full h-full rounded-2xl overflow-hidden">
        {Portrait ? <Portrait s={px[size] * 4} /> : <DefaultPortrait />}
      </div>
    </div>
  );
}

export function getAgentGradient(agentId: string): string {
  const god = findGod(agentId);
  return god ? gradients[god] : "from-slate-500 to-slate-400";
}

export function getAgentColor(agentId: string): string {
  const colors: Record<string, string> = {
    mercury: "#3b82f6", apollo: "#f59e0b", athena: "#8b5cf6",
    prometheus: "#ef4444", iris: "#ec4899", atlas: "#10b981",
  };
  const god = findGod(agentId);
  return god ? colors[god] : "#6b7280";
}
