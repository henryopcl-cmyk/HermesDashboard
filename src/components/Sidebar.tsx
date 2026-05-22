"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Mission Control", icon: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" },
  { href: "/agents", label: "Pantheon", icon: "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5M4.5 15.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 004.5 8.25v9a2.25 2.25 0 002.25 2.25z" },
  { href: "/factory", label: "Forge of Hephaestus", icon: "M11.42 15.17l-5.84-3.37a.75.75 0 01-.38-.65V7.47a.75.75 0 01.38-.65l5.84-3.37a.75.75 0 01.76 0l5.84 3.37a.75.75 0 01.38.65v3.68a.75.75 0 01-.38.65l-5.84 3.37a.75.75 0 01-.76 0zM5.21 7.47l6.79 3.92 6.79-3.92M12 21.35V11.39" },
  { href: "/logs", label: "Oracle Logs", icon: "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0020.25 18V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v12a2.25 2.25 0 002.25 2.25z" },
  { href: "/settings", label: "Sacred Config", icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" },
];

// SVG laurel wreath for the logo
function LaurelWreath() {
  return (
    <svg viewBox="0 0 60 60" className="absolute inset-0 w-full h-full" style={{ transform: "scale(1.5)" }}>
      {/* Left laurel branch */}
      <path d="M18 42 Q14 35 16 28" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
      <ellipse cx="14" cy="34" rx="3" ry="5" fill="currentColor" opacity="0.1" transform="rotate(-20 14 34)" />
      <ellipse cx="15" cy="29" rx="2.5" ry="4" fill="currentColor" opacity="0.1" transform="rotate(-30 15 29)" />
      <ellipse cx="17" cy="25" rx="2" ry="3.5" fill="currentColor" opacity="0.08" transform="rotate(-40 17 25)" />
      {/* Right laurel branch */}
      <path d="M42 42 Q46 35 44 28" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
      <ellipse cx="46" cy="34" rx="3" ry="5" fill="currentColor" opacity="0.1" transform="rotate(20 46 34)" />
      <ellipse cx="45" cy="29" rx="2.5" ry="4" fill="currentColor" opacity="0.1" transform="rotate(30 45 29)" />
      <ellipse cx="43" cy="25" rx="2" ry="3.5" fill="currentColor" opacity="0.08" transform="rotate(40 43 25)" />
    </svg>
  );
}

// Greek column capital decoration
function ColumnCapital() {
  return (
    <svg viewBox="0 0 256 12" className="w-full h-3 opacity-20" preserveAspectRatio="none">
      <path d="M0 10 Q4 6 8 10 Q12 6 16 10 Q20 6 24 10 Q28 6 32 10 Q36 6 40 10 Q44 6 48 10 Q52 6 56 10 Q60 6 64 10 Q68 6 72 10 Q76 6 80 10 Q84 6 88 10 Q92 6 96 10 Q100 6 104 10 Q108 6 112 10 Q116 6 120 10 Q124 6 128 10 Q132 6 136 10 Q140 6 144 10 Q148 6 152 10 Q156 6 160 10 Q164 6 168 10 Q172 6 176 10 Q180 6 184 10 Q188 6 192 10 Q196 6 200 10 Q204 6 208 10 Q212 6 216 10 Q220 6 224 10 Q228 6 232 10 Q236 6 240 10 Q244 6 248 10 Q252 6 256 10"
        stroke="#c9a84c" strokeWidth="1.5" fill="none" />
      <line x1="0" y1="12" x2="256" y2="12" stroke="#c9a84c" strokeWidth="0.5" />
      <line x1="0" y1="2" x2="256" y2="2" stroke="#c9a84c" strokeWidth="0.5" />
    </svg>
  );
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`
      fixed top-0 left-0 h-full w-64 bg-card/98 backdrop-blur-xl
      flex flex-col z-50 transition-transform duration-300 ease-out
      ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
    `}>
      {/* Decorative right border - column fluting effect */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      <div className="absolute right-1 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/8 to-transparent" />

      {/* Logo - Temple pediment style */}
      <div className="p-5 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-gold/25 to-bronze/15 flex items-center justify-center border border-gold/30 animate-glow text-gold">
              <LaurelWreath />
              <svg className="w-5 h-5 text-gold relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-hermes tracking-[0.3em]">HERMES</h1>
              <p className="text-[9px] text-muted uppercase tracking-[0.35em]">Mount Olympus</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-muted hover:text-gold hover:bg-gold/5 lg:hidden transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Column capital ornament */}
        <div className="mt-4">
          <ColumnCapital />
        </div>
      </div>

      {/* Nav - Temple columns */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {nav.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={onClose}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive
                  ? "bg-gold/8 text-gold-light border border-gold/15"
                  : "text-muted hover:text-foreground hover:bg-gold/[0.03] border border-transparent"
              }`}>
              {/* Active torch glow */}
              {isActive && <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold/5 via-transparent to-transparent pointer-events-none" />}
              <svg className={`w-[18px] h-[18px] relative z-10 transition-colors ${isActive ? "text-gold" : "group-hover:text-gold/60"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <span className="relative z-10">{item.label}</span>
              {isActive && (
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-gold torch-flicker" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
                  <span className="w-1 h-1 rounded-full bg-gold torch-flicker" style={{ animationDelay: "0.5s" }} />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom - Oracle status */}
      <div className="px-3 pb-3 space-y-3">
        {/* Decorative separator */}
        <ColumnCapital />

        <div className="p-3 rounded-xl bg-gradient-to-br from-gold/8 to-bronze/5 border border-gold/12 relative overflow-hidden">
          {/* Torch glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-gold/10 rounded-full blur-lg torch-flicker" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse-dot" />
              <span className="text-gold font-semibold tracking-wider">Oracle Active</span>
            </div>
            <p className="text-[10px] text-muted mt-1 font-mono">/api/mcp</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
