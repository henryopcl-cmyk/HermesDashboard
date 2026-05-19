const godProfiles: Record<string, { gradient: string; symbol: string; bg: string }> = {
  mercury:    { gradient: "from-blue-500 to-cyan-400",    symbol: "M13 10V3L4 14h7v7l9-11h-7z", bg: "bg-blue-500/10" },           // Wings/speed - messenger
  apollo:     { gradient: "from-amber-400 to-orange-500", symbol: "M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z", bg: "bg-amber-500/10" }, // Sun
  athena:     { gradient: "from-violet-500 to-purple-400", symbol: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", bg: "bg-violet-500/10" }, // Shield - wisdom
  prometheus: { gradient: "from-red-500 to-orange-400",   symbol: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z", bg: "bg-red-500/10" }, // Fire
  iris:       { gradient: "from-pink-400 to-indigo-400",  symbol: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", bg: "bg-pink-500/10" }, // Rainbow/globe
  atlas:      { gradient: "from-emerald-500 to-teal-400", symbol: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", bg: "bg-emerald-500/10" }, // Globe - world holder
  hermes:     { gradient: "from-indigo-500 to-purple-500", symbol: "M13 10V3L4 14h7v7l9-11h-7z", bg: "bg-indigo-500/10" },
};

const defaultProfile = { gradient: "from-slate-500 to-slate-400", symbol: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", bg: "bg-slate-500/10" };

function getProfile(agentId: string) {
  const key = agentId.toLowerCase();
  for (const [name, profile] of Object.entries(godProfiles)) {
    if (key.includes(name)) return profile;
  }
  return defaultProfile;
}

export function GodAvatar({ agentId, size = "md" }: { agentId: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const profile = getProfile(agentId);
  const sizes = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };
  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div className={`${sizes[size]} rounded-2xl bg-gradient-to-br ${profile.gradient} p-[1px] shrink-0`}>
      <div className={`w-full h-full rounded-2xl ${profile.bg} backdrop-blur-sm flex items-center justify-center`}>
        <svg
          className={`${iconSizes[size]} text-white`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={profile.symbol} />
        </svg>
      </div>
    </div>
  );
}

export function getAgentGradient(agentId: string): string {
  return getProfile(agentId).gradient;
}

export function getAgentBg(agentId: string): string {
  return getProfile(agentId).bg;
}
