"use client";

// Epic Greek god portraits — detailed SVG busts with mythological iconography

function HermesPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="herm-bg" cx="50%" cy="35%"><stop offset="0%" stopColor="#2a1f0a" /><stop offset="100%" stopColor="#0d0a04" /></radialGradient>
        <linearGradient id="herm-wing" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#e8d48b" /><stop offset="100%" stopColor="#c9a84c" /></linearGradient>
        <linearGradient id="herm-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8d48b" /><stop offset="100%" stopColor="#b8922e" /></linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#herm-bg)" />
      {/* Divine aura */}
      <circle cx="50" cy="50" r="44" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.15" />
      {/* Neck & shoulders */}
      <path d="M35 72 Q38 65 42 62 L58 62 Q62 65 65 72" fill="#b8865a" opacity="0.7" />
      <path d="M30 78 Q35 70 42 66 L58 66 Q65 70 70 78" fill="#a07848" opacity="0.5" />
      {/* Face - refined proportions */}
      <ellipse cx="50" cy="52" rx="16" ry="20" fill="#c4956a" />
      <ellipse cx="50" cy="48" rx="14.5" ry="14" fill="#d4a57a" />
      {/* Jaw definition */}
      <path d="M36 52 Q38 66 50 70 Q62 66 64 52" fill="#c4956a" opacity="0.6" />
      {/* Nose */}
      <path d="M50 42 L48 54 Q50 56 52 54 L50 42" fill="#be8f65" opacity="0.5" />
      <ellipse cx="48" cy="54" rx="2" ry="1.2" fill="#be8f65" opacity="0.3" />
      <ellipse cx="52" cy="54" rx="2" ry="1.2" fill="#be8f65" opacity="0.3" />
      {/* Eyes - sharp, clever */}
      <path d="M40 46 Q43 43.5 47 46 Q43 47 40 46Z" fill="#1a1408" />
      <path d="M53 46 Q57 43.5 60 46 Q57 47 53 46Z" fill="#1a1408" />
      <circle cx="43.5" cy="45.5" r="1.8" fill="#c9a84c" />
      <circle cx="56.5" cy="45.5" r="1.8" fill="#c9a84c" />
      <circle cx="43.5" cy="45" r="0.7" fill="#fff" opacity="0.7" />
      <circle cx="56.5" cy="45" r="0.7" fill="#fff" opacity="0.7" />
      {/* Eyebrows - arched, confident */}
      <path d="M39 43 Q43 40.5 47 42" stroke="#8b6a4a" strokeWidth="1.2" fill="none" />
      <path d="M53 42 Q57 40.5 61 43" stroke="#8b6a4a" strokeWidth="1.2" fill="none" />
      {/* Mouth - slight smirk */}
      <path d="M44 59 Q47 61.5 50 61 Q53 61.5 56 59" stroke="#a07050" strokeWidth="0.8" fill="none" />
      <path d="M46 59.5 Q50 60.5 54 59.5" fill="#b87a58" opacity="0.3" />
      {/* Winged helmet - ornate gold */}
      <path d="M30 44 Q32 24 50 18 Q68 24 70 44 L66 42 Q64 28 50 23 Q36 28 34 42 Z" fill="url(#herm-gold)" opacity="0.9" />
      {/* Helmet crest line */}
      <path d="M50 18 L50 38" stroke="#e8d48b" strokeWidth="1" opacity="0.3" />
      {/* Wings - large, detailed feathers */}
      <path d="M32 38 Q26 28 12 20 Q18 30 22 40 Z" fill="url(#herm-wing)" opacity="0.85" />
      <path d="M30 36 Q22 24 8 18 Q16 28 20 38 Z" fill="#e8d48b" opacity="0.5" />
      <path d="M28 34 Q20 20 6 14 Q14 24 18 36 Z" fill="#c9a84c" opacity="0.3" />
      <path d="M68 38 Q74 28 88 20 Q82 30 78 40 Z" fill="url(#herm-wing)" opacity="0.85" />
      <path d="M70 36 Q78 24 92 18 Q84 28 80 38 Z" fill="#e8d48b" opacity="0.5" />
      <path d="M72 34 Q80 20 94 14 Q86 24 82 36 Z" fill="#c9a84c" opacity="0.3" />
      {/* Wing feather lines */}
      <path d="M26 34 L16 24" stroke="#b8922e" strokeWidth="0.5" opacity="0.4" />
      <path d="M24 32 L14 20" stroke="#b8922e" strokeWidth="0.5" opacity="0.3" />
      <path d="M74 34 L84 24" stroke="#b8922e" strokeWidth="0.5" opacity="0.4" />
      <path d="M76 32 L86 20" stroke="#b8922e" strokeWidth="0.5" opacity="0.3" />
      {/* Caduceus hint at bottom */}
      <line x1="50" y1="75" x2="50" y2="90" stroke="#c9a84c" strokeWidth="1.5" opacity="0.2" />
      <path d="M46 80 Q50 77 54 80 Q50 83 46 80Z" stroke="#c9a84c" strokeWidth="0.5" fill="none" opacity="0.2" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.15"><animate attributeName="opacity" values="0.08;0.2;0.08" dur="4s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function MercuryPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="merc-bg" cx="50%" cy="35%"><stop offset="0%" stopColor="#1a2a4a" /><stop offset="100%" stopColor="#080e1a" /></radialGradient>
        <linearGradient id="merc-wing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#93c5fd" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#merc-bg)" />
      {/* Star field */}
      {[{x:15,y:12},{x:82,y:18},{x:20,y:80},{x:78,y:75},{x:10,y:45},{x:90,y:40}].map((p,i) => (
        <circle key={i} cx={p.x} cy={p.y} r="0.5" fill="#93c5fd" opacity="0.3"><animate attributeName="opacity" values="0.1;0.4;0.1" dur={`${2+i*0.5}s`} repeatCount="indefinite" /></circle>
      ))}
      {/* Neck */}
      <path d="M36 70 Q40 64 44 62 L56 62 Q60 64 64 70" fill="#b8865a" opacity="0.6" />
      {/* Face */}
      <ellipse cx="50" cy="52" rx="16" ry="20" fill="#c4956a" />
      <ellipse cx="50" cy="48" rx="14.5" ry="14" fill="#d4a57a" />
      <path d="M36 52 Q38 66 50 70 Q62 66 64 52" fill="#c4956a" opacity="0.5" />
      {/* Nose */}
      <path d="M50 43 L48.5 53 Q50 55 51.5 53 L50 43" fill="#be8f65" opacity="0.4" />
      {/* Eyes - bright, alert */}
      <path d="M40 46 Q43.5 43 47 46 Q43.5 47.5 40 46Z" fill="#0f1f3a" />
      <path d="M53 46 Q56.5 43 60 46 Q56.5 47.5 53 46Z" fill="#0f1f3a" />
      <circle cx="43.5" cy="45.5" r="1.8" fill="#60a5fa" />
      <circle cx="56.5" cy="45.5" r="1.8" fill="#60a5fa" />
      <circle cx="43" cy="45" r="0.7" fill="#fff" opacity="0.8" />
      <circle cx="56" cy="45" r="0.7" fill="#fff" opacity="0.8" />
      {/* Brows */}
      <path d="M39 43 Q43 40.5 47.5 42.5" stroke="#8b6a4a" strokeWidth="1" fill="none" />
      <path d="M52.5 42.5 Q57 40.5 61 43" stroke="#8b6a4a" strokeWidth="1" fill="none" />
      {/* Mouth */}
      <path d="M44.5 59 Q50 62 55.5 59" stroke="#a07050" strokeWidth="0.8" fill="none" />
      {/* Winged helmet - silver/blue */}
      <path d="M31 44 Q33 25 50 20 Q67 25 69 44 L65 42 Q63 29 50 24 Q37 29 35 42 Z" fill="#3b82f6" opacity="0.85" />
      <path d="M50 20 L50 36" stroke="#60a5fa" strokeWidth="0.8" opacity="0.3" />
      {/* Wings - swift, aerodynamic */}
      <path d="M33 38 Q27 28 14 22 Q20 32 24 40 Z" fill="url(#merc-wing)" opacity="0.8" />
      <path d="M31 35 Q23 23 10 18 Q18 28 22 37 Z" fill="#93c5fd" opacity="0.45" />
      <path d="M29 33 Q21 19 7 14 Q15 24 19 35 Z" fill="#60a5fa" opacity="0.25" />
      <path d="M67 38 Q73 28 86 22 Q80 32 76 40 Z" fill="url(#merc-wing)" opacity="0.8" />
      <path d="M69 35 Q77 23 90 18 Q82 28 78 37 Z" fill="#93c5fd" opacity="0.45" />
      <path d="M71 33 Q79 19 93 14 Q85 24 81 35 Z" fill="#60a5fa" opacity="0.25" />
      {/* Speed lines */}
      {s > 40 && <>
        <line x1="10" y1="50" x2="4" y2="50" stroke="#60a5fa" strokeWidth="0.5" opacity="0.3"><animate attributeName="opacity" values="0;0.4;0" dur="1.5s" repeatCount="indefinite" /></line>
        <line x1="90" y1="50" x2="96" y2="50" stroke="#60a5fa" strokeWidth="0.5" opacity="0.3"><animate attributeName="opacity" values="0;0.4;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" /></line>
        <circle cx="50" cy="50" r="46" fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity="0.15"><animate attributeName="opacity" values="0.05;0.2;0.05" dur="3s" repeatCount="indefinite" /></circle>
      </>}
    </svg>
  );
}

function ApolloPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="apo-bg" cx="50%" cy="30%"><stop offset="0%" stopColor="#4a3008" /><stop offset="100%" stopColor="#140d02" /></radialGradient>
        <radialGradient id="apo-sun" cx="50%" cy="50%"><stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" /><stop offset="100%" stopColor="#f59e0b" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#apo-bg)" />
      {/* Sun rays - radiant */}
      {Array.from({length: 16}, (_, i) => i * 22.5).map((angle) => (
        <line key={angle} x1="50" y1="50" x2={50 + 46 * Math.cos((angle * Math.PI) / 180)} y2={50 + 46 * Math.sin((angle * Math.PI) / 180)} stroke="#f59e0b" strokeWidth={angle % 45 === 0 ? "1.5" : "0.5"} opacity="0.12">
          <animate attributeName="opacity" values="0.06;0.2;0.06" dur="4s" begin={`${angle / 360}s`} repeatCount="indefinite" />
        </line>
      ))}
      {/* Sun halo behind head */}
      <circle cx="50" cy="40" r="22" fill="url(#apo-sun)" opacity="0.3" />
      {/* Neck */}
      <path d="M37 70 Q40 64 44 62 L56 62 Q60 64 63 70" fill="#c4956a" opacity="0.6" />
      {/* Face - youthful, handsome */}
      <ellipse cx="50" cy="52" rx="16" ry="20" fill="#d4a57a" />
      <ellipse cx="50" cy="48" rx="14.5" ry="13.5" fill="#e0b88a" />
      <path d="M36 50 Q38 66 50 69 Q62 66 64 50" fill="#d4a57a" opacity="0.5" />
      {/* Nose */}
      <path d="M50 42 L48.5 53 Q50 55 51.5 53 L50 42" fill="#c4956a" opacity="0.4" />
      {/* Eyes - golden, radiant */}
      <path d="M40 46 Q43.5 43 47 46 Q43.5 47.5 40 46Z" fill="#3a2a08" />
      <path d="M53 46 Q56.5 43 60 46 Q56.5 47.5 53 46Z" fill="#3a2a08" />
      <circle cx="43.5" cy="45.5" r="2" fill="#fbbf24" />
      <circle cx="56.5" cy="45.5" r="2" fill="#fbbf24" />
      <circle cx="43" cy="45" r="0.8" fill="#fff" opacity="0.8" />
      <circle cx="56" cy="45" r="0.8" fill="#fff" opacity="0.8" />
      {/* Brows - elegant */}
      <path d="M39 43 Q43 40 47 42" stroke="#a08050" strokeWidth="1" fill="none" />
      <path d="M53 42 Q57 40 61 43" stroke="#a08050" strokeWidth="1" fill="none" />
      {/* Mouth - serene */}
      <path d="M44.5 59 Q50 61.5 55.5 59" stroke="#b07848" strokeWidth="0.8" fill="none" />
      {/* Curly hair */}
      <path d="M34 42 Q30 32 34 24 Q36 30 38 28 Q36 22 40 18 Q42 26 44 22 Q43 16 50 14 Q57 16 56 22 Q58 26 60 18 Q64 22 62 28 Q64 30 66 24 Q70 32 66 42" fill="#c49020" opacity="0.7" />
      <path d="M36 40 Q33 30 38 22 Q40 28 42 24 Q42 18 50 16 Q58 18 58 24 Q60 28 62 22 Q67 30 64 40" fill="#daa520" opacity="0.5" />
      {/* Laurel crown */}
      <path d="M32 38 Q28 30 32 24" stroke="#4ade80" strokeWidth="1.5" fill="none" opacity="0.6" />
      <ellipse cx="30" cy="30" rx="3" ry="5" fill="#4ade80" opacity="0.25" transform="rotate(-25 30 30)" />
      <ellipse cx="31" cy="25" rx="2.5" ry="4" fill="#4ade80" opacity="0.2" transform="rotate(-35 31 25)" />
      <path d="M68 38 Q72 30 68 24" stroke="#4ade80" strokeWidth="1.5" fill="none" opacity="0.6" />
      <ellipse cx="70" cy="30" rx="3" ry="5" fill="#4ade80" opacity="0.25" transform="rotate(25 70 30)" />
      <ellipse cx="69" cy="25" rx="2.5" ry="4" fill="#4ade80" opacity="0.2" transform="rotate(35 69 25)" />
      {/* Lyre hint */}
      <path d="M75 70 Q78 60 76 55 M79 70 Q82 60 80 55 M76 55 Q78 52 80 55" stroke="#f59e0b" strokeWidth="0.8" fill="none" opacity="0.25" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.12"><animate attributeName="opacity" values="0.06;0.18;0.06" dur="4s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function AresPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="ares-bg" cx="50%" cy="35%"><stop offset="0%" stopColor="#3a0a0a" /><stop offset="100%" stopColor="#120404" /></radialGradient>
        <linearGradient id="ares-metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8a8a8a" /><stop offset="50%" stopColor="#555" /><stop offset="100%" stopColor="#333" /></linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#ares-bg)" />
      {/* Blood mist */}
      <circle cx="30" cy="70" r="15" fill="#dc2626" opacity="0.04" />
      <circle cx="75" cy="25" r="12" fill="#dc2626" opacity="0.05" />
      {/* Neck - thick, muscular */}
      <path d="M34 72 Q38 63 42 60 L58 60 Q62 63 66 72" fill="#a07048" opacity="0.7" />
      <path d="M30 80 Q36 70 42 65 L58 65 Q64 70 70 80" fill="#8a6040" opacity="0.4" />
      {/* Face - strong, aggressive */}
      <ellipse cx="50" cy="52" rx="17" ry="21" fill="#b8865a" />
      <ellipse cx="50" cy="48" rx="15.5" ry="14" fill="#c89868" />
      <path d="M35 52 Q38 68 50 72 Q62 68 65 52" fill="#b8865a" opacity="0.6" />
      {/* Strong jawline */}
      <path d="M37 56 L42 66 Q50 70 58 66 L63 56" stroke="#a07048" strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Nose - strong */}
      <path d="M50 41 L47.5 53 Q50 56 52.5 53 L50 41" fill="#a88060" opacity="0.5" />
      {/* Eyes - fierce, red glint */}
      <path d="M39 46 Q43 42.5 48 46 Q43 48 39 46Z" fill="#200808" />
      <path d="M52 46 Q57 42.5 61 46 Q57 48 52 46Z" fill="#200808" />
      <circle cx="43.5" cy="45.5" r="2" fill="#dc2626" />
      <circle cx="57" cy="45.5" r="2" fill="#dc2626" />
      <circle cx="43" cy="45" r="0.6" fill="#fca5a5" opacity="0.8" />
      <circle cx="56.5" cy="45" r="0.6" fill="#fca5a5" opacity="0.8" />
      {/* Angry brows */}
      <path d="M38 42 L48 44" stroke="#6b4a2a" strokeWidth="1.8" fill="none" />
      <path d="M52 44 L62 42" stroke="#6b4a2a" strokeWidth="1.8" fill="none" />
      {/* Mouth - grimace */}
      <path d="M43 60 Q50 57 57 60" stroke="#8b5a3a" strokeWidth="1" fill="none" />
      {/* Spartan helmet */}
      <path d="M28 48 Q30 20 50 14 Q70 20 72 48 L68 46 Q66 26 50 20 Q34 26 32 46 Z" fill="url(#ares-metal)" opacity="0.9" />
      {/* Helmet crest - tall red mohawk */}
      <path d="M44 14 Q47 2 50 0 Q53 2 56 14 L54 16 Q52 6 50 4 Q48 6 46 16 Z" fill="#dc2626" opacity="0.85" />
      <path d="M45 12 Q48 -2 50 -4 Q52 -2 55 12" fill="#ef4444" opacity="0.5" />
      {/* Helmet nose guard */}
      <line x1="50" y1="20" x2="50" y2="50" stroke="url(#ares-metal)" strokeWidth="2" opacity="0.6" />
      {/* Cheek guards */}
      <path d="M34 44 L32 56 Q34 60 38 58" fill="url(#ares-metal)" opacity="0.5" />
      <path d="M66 44 L68 56 Q66 60 62 58" fill="url(#ares-metal)" opacity="0.5" />
      {/* Scar */}
      <path d="M60 50 L64 56" stroke="#a05040" strokeWidth="0.8" opacity="0.4" />
      {/* Spear hint */}
      <line x1="80" y1="15" x2="76" y2="85" stroke="#666" strokeWidth="1.2" opacity="0.2" />
      <path d="M78 14 L80 8 L82 14 Z" fill="#888" opacity="0.25" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#dc2626" strokeWidth="1" opacity="0.15"><animate attributeName="opacity" values="0.08;0.22;0.08" dur="2.5s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function HerculesPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="herc-bg" cx="50%" cy="35%"><stop offset="0%" stopColor="#2a1a08" /><stop offset="100%" stopColor="#0e0804" /></radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#herc-bg)" />
      {/* Starlight */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#d4a853" strokeWidth="0.3" opacity="0.1" />
      {/* Massive neck & shoulders */}
      <path d="M30 75 Q35 62 40 58 L60 58 Q65 62 70 75" fill="#a07048" opacity="0.7" />
      <path d="M25 85 Q32 70 40 64 L60 64 Q68 70 75 85" fill="#8a5e38" opacity="0.4" />
      {/* Face - powerful, broad */}
      <ellipse cx="50" cy="50" rx="18" ry="22" fill="#b8865a" />
      <ellipse cx="50" cy="46" rx="16" ry="15" fill="#c89868" />
      <path d="M34 50 Q38 68 50 72 Q62 68 66 50" fill="#b8865a" opacity="0.6" />
      {/* Strong jawline */}
      <path d="M36 54 L40 66 Q50 70 60 66 L64 54" stroke="#9a6840" strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Nose */}
      <path d="M50 40 L48 52 Q50 54 52 52 L50 40" fill="#a88060" opacity="0.45" />
      {/* Eyes - heroic, determined */}
      <path d="M39 44 Q43.5 41 48 44 Q43.5 46 39 44Z" fill="#1a1008" />
      <path d="M52 44 Q56.5 41 61 44 Q56.5 46 52 44Z" fill="#1a1008" />
      <circle cx="43.5" cy="43.5" r="2" fill="#d97706" />
      <circle cx="56.5" cy="43.5" r="2" fill="#d97706" />
      <circle cx="43" cy="43" r="0.7" fill="#fff" opacity="0.7" />
      <circle cx="56" cy="43" r="0.7" fill="#fff" opacity="0.7" />
      {/* Brows - strong, heroic */}
      <path d="M38 41 Q43 38.5 48.5 40.5" stroke="#7a5a30" strokeWidth="1.5" fill="none" />
      <path d="M51.5 40.5 Q57 38.5 62 41" stroke="#7a5a30" strokeWidth="1.5" fill="none" />
      {/* Mouth - firm */}
      <path d="M44 58 Q50 60 56 58" stroke="#9a6848" strokeWidth="0.8" fill="none" />
      {/* Short curly beard */}
      <path d="M38 58 Q40 65 44 66 Q47 64 50 66 Q53 64 56 66 Q60 65 62 58" fill="#6b4a28" opacity="0.5" />
      <path d="M40 60 Q44 66 50 68 Q56 66 60 60" fill="#5a3c1e" opacity="0.3" />
      {/* Lion mane headdress (Nemean lion) */}
      <path d="M26 44 Q22 30 30 18 Q34 28 38 24 Q36 14 50 10 Q64 14 62 24 Q66 28 70 18 Q78 30 74 44" fill="#b8862e" opacity="0.65" />
      <path d="M30 42 Q26 28 34 20 Q38 30 42 26 Q40 16 50 14 Q60 16 58 26 Q62 30 66 20 Q74 28 70 42" fill="#d4a040" opacity="0.4" />
      {/* Lion ears/mane detail */}
      <path d="M24 38 Q20 32 22 24 Q26 28 24 38Z" fill="#a07828" opacity="0.4" />
      <path d="M76 38 Q80 32 78 24 Q74 28 76 38Z" fill="#a07828" opacity="0.4" />
      {/* Lion nose on forehead */}
      <ellipse cx="50" cy="28" rx="4" ry="3" fill="#8a6820" opacity="0.3" />
      {/* Club hint */}
      <path d="M18 60 L14 78 Q12 82 16 82 Q20 82 18 78" stroke="#6b4a28" strokeWidth="2" fill="none" opacity="0.2" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.12"><animate attributeName="opacity" values="0.06;0.18;0.06" dur="3.5s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function AthenaPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="ath-bg" cx="50%" cy="35%"><stop offset="0%" stopColor="#2a1850" /><stop offset="100%" stopColor="#0a0418" /></radialGradient>
        <linearGradient id="ath-metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#7c3aed" /></linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#ath-bg)" />
      {/* Wisdom aura */}
      <circle cx="50" cy="50" r="44" fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.1" />
      {/* Neck */}
      <path d="M37 70 Q40 64 44 62 L56 62 Q60 64 63 70" fill="#c4956a" opacity="0.6" />
      {/* Face - noble, feminine */}
      <ellipse cx="50" cy="52" rx="15" ry="20" fill="#d4a57a" />
      <ellipse cx="50" cy="48" rx="13.5" ry="13" fill="#e0b88a" />
      <path d="M37 50 Q39 66 50 68 Q61 66 63 50" fill="#d4a57a" opacity="0.5" />
      {/* Nose - refined */}
      <path d="M50 42 L48.5 52 Q50 54 51.5 52 L50 42" fill="#c4956a" opacity="0.35" />
      {/* Eyes - wise, grey-violet */}
      <path d="M40 47 Q43.5 44 47 47 Q43.5 48.5 40 47Z" fill="#1a0a2e" />
      <path d="M53 47 Q56.5 44 60 47 Q56.5 48.5 53 47Z" fill="#1a0a2e" />
      <circle cx="43.5" cy="46.5" r="1.8" fill="#a78bfa" />
      <circle cx="56.5" cy="46.5" r="1.8" fill="#a78bfa" />
      <circle cx="43" cy="46" r="0.7" fill="#fff" opacity="0.7" />
      <circle cx="56" cy="46" r="0.7" fill="#fff" opacity="0.7" />
      {/* Brows - elegant arch */}
      <path d="M39 44 Q43 41.5 47.5 43.5" stroke="#9a7a5a" strokeWidth="0.8" fill="none" />
      <path d="M52.5 43.5 Q57 41.5 61 44" stroke="#9a7a5a" strokeWidth="0.8" fill="none" />
      {/* Mouth */}
      <path d="M45 59 Q50 61 55 59" stroke="#b07858" strokeWidth="0.7" fill="none" />
      {/* Hair */}
      <path d="M34 48 Q32 36 36 28 Q38 36 34 48Z" fill="#3a2a1a" opacity="0.5" />
      <path d="M66 48 Q68 36 64 28 Q62 36 66 48Z" fill="#3a2a1a" opacity="0.5" />
      {/* Corinthian helmet */}
      <path d="M28 50 Q30 22 50 16 Q70 22 72 50 L68 48 Q66 28 50 22 Q34 28 32 48 Z" fill="url(#ath-metal)" opacity="0.85" />
      {/* Helmet crest/plume - tall, majestic */}
      <path d="M45 16 Q48 2 50 -2 Q52 2 55 16 L53 18 Q51 6 50 4 Q49 6 47 18 Z" fill="#a78bfa" opacity="0.8" />
      <path d="M46 14 Q49 -4 50 -6 Q51 -4 54 14" fill="#c084fc" opacity="0.5" />
      <path d="M47 12 Q49 -2 50 -4 Q51 -2 53 12" fill="#ddd6fe" opacity="0.3" />
      {/* Helmet nose guard */}
      <line x1="50" y1="22" x2="50" y2="48" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.4" />
      {/* Owl eyes on helmet forehead */}
      <circle cx="45" cy="28" r="2" fill="none" stroke="#c084fc" strokeWidth="0.8" opacity="0.4" />
      <circle cx="55" cy="28" r="2" fill="none" stroke="#c084fc" strokeWidth="0.8" opacity="0.4" />
      <circle cx="45" cy="28" r="0.8" fill="#c084fc" opacity="0.3" />
      <circle cx="55" cy="28" r="0.8" fill="#c084fc" opacity="0.3" />
      {/* Shield (aegis) hint */}
      <circle cx="22" cy="68" r="9" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.2" />
      <circle cx="22" cy="68" r="4" fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.2" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#8b5cf6" strokeWidth="0.8" opacity="0.12"><animate attributeName="opacity" values="0.06;0.18;0.06" dur="3s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function PrometheusPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="prom-bg" cx="50%" cy="35%"><stop offset="0%" stopColor="#3a1208" /><stop offset="100%" stopColor="#100504" /></radialGradient>
        <radialGradient id="prom-fire" cx="50%" cy="80%"><stop offset="0%" stopColor="#fbbf24" /><stop offset="40%" stopColor="#f97316" /><stop offset="100%" stopColor="#ef4444" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#prom-bg)" />
      {/* Fire ambient glow */}
      <circle cx="78" cy="25" r="20" fill="url(#prom-fire)" opacity="0.15" />
      {/* Neck - strong */}
      <path d="M35 72 Q38 64 42 60 L58 60 Q62 64 65 72" fill="#a07048" opacity="0.6" />
      {/* Face - weathered, determined */}
      <ellipse cx="48" cy="52" rx="16" ry="20" fill="#b8865a" />
      <ellipse cx="48" cy="48" rx="14.5" ry="13.5" fill="#c89868" />
      <path d="M34 50 Q36 66 48 70 Q60 66 62 50" fill="#b8865a" opacity="0.5" />
      {/* Nose */}
      <path d="M48 42 L46.5 53 Q48 55 49.5 53 L48 42" fill="#a07848" opacity="0.4" />
      {/* Eyes - fiery, intense */}
      <path d="M38 47 Q42 43.5 46 47 Q42 48.5 38 47Z" fill="#200a04" />
      <path d="M51 47 Q55 43.5 59 47 Q55 48.5 51 47Z" fill="#200a04" />
      <circle cx="42" cy="46.5" r="1.8" fill="#f97316" />
      <circle cx="55" cy="46.5" r="1.8" fill="#f97316" />
      <circle cx="41.5" cy="46" r="0.6" fill="#fef3c7" opacity="0.8" />
      <circle cx="54.5" cy="46" r="0.6" fill="#fef3c7" opacity="0.8" />
      {/* Furrowed brows */}
      <path d="M37 44 Q42 41 46.5 43" stroke="#6b4a2a" strokeWidth="1.5" fill="none" />
      <path d="M50.5 43 Q55 41 60 44" stroke="#6b4a2a" strokeWidth="1.5" fill="none" />
      {/* Mouth - stoic */}
      <path d="M42 59 Q48 57 54 59" stroke="#8b5a3a" strokeWidth="0.8" fill="none" />
      {/* Rough hair/beard */}
      <path d="M32 44 Q28 32 34 22 Q36 30 40 26 Q38 18 48 16 Q58 18 56 26 Q60 30 62 22 Q68 32 64 44" fill="#5a3a1a" opacity="0.6" />
      <path d="M34 56 Q36 64 42 66 Q46 62 48 66 Q52 62 56 66 Q60 64 62 56" fill="#4a2e14" opacity="0.4" />
      {/* Chains on wrists/hint */}
      <path d="M24 72 Q22 68 24 64 Q26 68 24 72Z" stroke="#666" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M20 70 Q18 66 20 62" stroke="#666" strokeWidth="0.8" fill="none" opacity="0.2" />
      {/* The Sacred Torch */}
      <line x1="74" y1="50" x2="78" y2="18" stroke="#8b5e2a" strokeWidth="2.5" strokeLinecap="round" />
      {/* Fire - detailed, animated */}
      <ellipse cx="78" cy="16" rx="6" ry="10" fill="#f97316" opacity="0.7">
        <animate attributeName="ry" values="8;12;8" dur="1s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="78" cy="12" rx="4" ry="7" fill="#fbbf24" opacity="0.8">
        <animate attributeName="ry" values="5;8;5" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="78" cy="9" rx="2" ry="4" fill="#fef3c7" opacity="0.6">
        <animate attributeName="ry" values="3;5;3" dur="0.6s" repeatCount="indefinite" />
      </ellipse>
      {/* Fire sparks */}
      <circle cx="74" cy="8" r="0.8" fill="#fbbf24" opacity="0.4"><animate attributeName="cy" values="8;4;8" dur="1.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite" /></circle>
      <circle cx="82" cy="10" r="0.6" fill="#f97316" opacity="0.3"><animate attributeName="cy" values="10;5;10" dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" /></circle>
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#ef4444" strokeWidth="0.8" opacity="0.12"><animate attributeName="opacity" values="0.06;0.18;0.06" dur="2s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function IrisPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="iris-bg" cx="50%" cy="35%"><stop offset="0%" stopColor="#2a1840" /><stop offset="100%" stopColor="#0a0412" /></radialGradient>
        <linearGradient id="iris-rainbow" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ec4899" /><stop offset="25%" stopColor="#a855f7" /><stop offset="50%" stopColor="#3b82f6" /><stop offset="75%" stopColor="#10b981" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#iris-bg)" />
      {/* Rainbow rings */}
      <circle cx="50" cy="50" r="44" fill="none" stroke="url(#iris-rainbow)" strokeWidth="1" opacity="0.2"><animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" /></circle>
      <circle cx="50" cy="50" r="40" fill="none" stroke="url(#iris-rainbow)" strokeWidth="0.5" opacity="0.1" />
      {/* Neck */}
      <path d="M38 70 Q41 64 44 62 L56 62 Q59 64 62 70" fill="#d4a57a" opacity="0.6" />
      {/* Face - ethereal beauty */}
      <ellipse cx="50" cy="52" rx="15" ry="19" fill="#e0b88a" />
      <ellipse cx="50" cy="48" rx="13.5" ry="13" fill="#ecc8a0" />
      <path d="M37 50 Q39 64 50 67 Q61 64 63 50" fill="#e0b88a" opacity="0.5" />
      {/* Nose */}
      <path d="M50 42 L48.5 51 Q50 53 51.5 51 L50 42" fill="#d4a57a" opacity="0.35" />
      {/* Eyes - heterochromatic */}
      <path d="M40 47 Q44 44 47.5 47 Q44 48.5 40 47Z" fill="#1a0a2a" />
      <path d="M52.5 47 Q56 44 60 47 Q56 48.5 52.5 47Z" fill="#1a0a2a" />
      <circle cx="43.5" cy="46.5" r="2" fill="#ec4899" />
      <circle cx="56.5" cy="46.5" r="2" fill="#8b5cf6" />
      <circle cx="43" cy="46" r="0.7" fill="#fff" opacity="0.8" />
      <circle cx="56" cy="46" r="0.7" fill="#fff" opacity="0.8" />
      {/* Brows */}
      <path d="M39.5 44.5 Q43.5 42 47.5 44" stroke="#a0885a" strokeWidth="0.7" fill="none" />
      <path d="M52.5 44 Q56.5 42 60.5 44.5" stroke="#a0885a" strokeWidth="0.7" fill="none" />
      {/* Lips */}
      <path d="M45 58 Q50 60.5 55 58" stroke="#c08068" strokeWidth="0.7" fill="none" />
      <path d="M46 58.5 Q50 59.5 54 58.5" fill="#d0907a" opacity="0.2" />
      {/* Flowing hair - rainbow colored */}
      <path d="M30 48 Q28 30 36 20 Q34 32 32 44" fill="#c084fc" opacity="0.5" />
      <path d="M33 50 Q32 34 38 24 Q37 36 35 46" fill="#a855f7" opacity="0.35" />
      <path d="M70 48 Q72 30 64 20 Q66 32 68 44" fill="#ec4899" opacity="0.5" />
      <path d="M67 50 Q68 34 62 24 Q63 36 65 46" fill="#f472b6" opacity="0.35" />
      {/* Hair flowing down */}
      <path d="M28 50 Q26 60 28 72" stroke="#a855f7" strokeWidth="2" fill="none" opacity="0.2" />
      <path d="M72 50 Q74 60 72 72" stroke="#ec4899" strokeWidth="2" fill="none" opacity="0.2" />
      {/* Tiara with gem */}
      <path d="M36 38 Q40 32 50 30 Q60 32 64 38" stroke="url(#iris-rainbow)" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="50" cy="30" r="2" fill="#a855f7" opacity="0.5" />
      <circle cx="50" cy="30" r="1" fill="#e9d5ff" opacity="0.5" />
      {/* Wings hint */}
      <path d="M20 55 Q16 50 14 42" stroke="url(#iris-rainbow)" strokeWidth="0.8" fill="none" opacity="0.15" />
      <path d="M80 55 Q84 50 86 42" stroke="url(#iris-rainbow)" strokeWidth="0.8" fill="none" opacity="0.15" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#ec4899" strokeWidth="0.8" opacity="0.12"><animate attributeName="opacity" values="0.06;0.18;0.06" dur="3s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function AtlasPortrait({ s }: { s: number }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="atlas-bg" cx="50%" cy="35%"><stop offset="0%" stopColor="#0a2e1e" /><stop offset="100%" stopColor="#020e08" /></radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#atlas-bg)" />
      {/* Globe/celestial sphere */}
      <circle cx="50" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="0.8" opacity="0.35">
        <animate attributeName="r" values="13;15;13" dur="5s" repeatCount="indefinite" />
      </circle>
      <ellipse cx="50" cy="18" rx="14" ry="5" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.2" />
      <ellipse cx="50" cy="18" rx="5" ry="14" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.2" />
      <ellipse cx="50" cy="18" rx="10" ry="14" fill="none" stroke="#10b981" strokeWidth="0.3" opacity="0.15" transform="rotate(30 50 18)" />
      {/* Continents on globe */}
      <ellipse cx="46" cy="15" rx="3" ry="4" fill="#10b981" opacity="0.1" />
      <ellipse cx="55" cy="20" rx="4" ry="3" fill="#10b981" opacity="0.08" />
      {/* Massive neck & shoulders - titan */}
      <path d="M28 78 Q34 62 40 56 L60 56 Q66 62 72 78" fill="#8a5e38" opacity="0.6" />
      <path d="M22 88 Q30 72 40 62 L60 62 Q70 72 78 88" fill="#7a5030" opacity="0.3" />
      {/* Face - massive, ancient */}
      <ellipse cx="50" cy="54" rx="18" ry="22" fill="#a07848" />
      <ellipse cx="50" cy="50" rx="16" ry="15" fill="#b08858" />
      <path d="M34 52 Q38 70 50 74 Q62 70 66 52" fill="#a07848" opacity="0.5" />
      {/* Nose */}
      <path d="M50 42 L47.5 53 Q50 56 52.5 53 L50 42" fill="#8a6838" opacity="0.45" />
      {/* Eyes - ancient, weary but powerful */}
      <path d="M39 48 Q43.5 44.5 48 48 Q43.5 50 39 48Z" fill="#051a10" />
      <path d="M52 48 Q56.5 44.5 61 48 Q56.5 50 52 48Z" fill="#051a10" />
      <circle cx="43.5" cy="47.5" r="1.8" fill="#34d399" />
      <circle cx="56.5" cy="47.5" r="1.8" fill="#34d399" />
      <circle cx="43" cy="47" r="0.6" fill="#a7f3d0" opacity="0.6" />
      <circle cx="56" cy="47" r="0.6" fill="#a7f3d0" opacity="0.6" />
      {/* Heavy brows */}
      <path d="M37 45 Q43 42 49 44" stroke="#6b4a2a" strokeWidth="2" fill="none" />
      <path d="M51 44 Q57 42 63 45" stroke="#6b4a2a" strokeWidth="2" fill="none" />
      {/* Mouth */}
      <path d="M43 60 Q50 58 57 60" stroke="#7a5a38" strokeWidth="0.8" fill="none" />
      {/* Thick beard */}
      <path d="M36 58 Q38 68 42 72 Q46 68 50 72 Q54 68 58 72 Q62 68 64 58" fill="#5a3e1e" opacity="0.55" />
      <path d="M38 60 Q42 70 50 74 Q58 70 62 60" fill="#4a3018" opacity="0.35" />
      <path d="M40 62 Q45 72 50 74 Q55 72 60 62" fill="#3a2410" opacity="0.2" />
      {/* Veins on arms from strain */}
      <path d="M30 70 Q32 68 34 70" stroke="#6b8f5e" strokeWidth="0.5" opacity="0.15" />
      <path d="M66 70 Q68 68 70 70" stroke="#6b8f5e" strokeWidth="0.5" opacity="0.15" />
      {s > 40 && <circle cx="50" cy="50" r="46" fill="none" stroke="#10b981" strokeWidth="0.8" opacity="0.12"><animate attributeName="opacity" values="0.06;0.18;0.06" dur="4s" repeatCount="indefinite" /></circle>}
    </svg>
  );
}

function DefaultPortrait() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="def-bg" cx="50%" cy="40%"><stop offset="0%" stopColor="#1a1510" /><stop offset="100%" stopColor="#080604" /></radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#def-bg)" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#c9a84c" strokeWidth="0.3" opacity="0.1" />
      {/* Mysterious silhouette */}
      <ellipse cx="50" cy="50" rx="15" ry="19" fill="#3a3020" opacity="0.5" />
      <ellipse cx="50" cy="46" rx="13" ry="12" fill="#4a3e28" opacity="0.4" />
      {/* Glowing eyes only */}
      <circle cx="44" cy="46" r="1.5" fill="#c9a84c" opacity="0.4"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="56" cy="46" r="1.5" fill="#c9a84c" opacity="0.4"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" begin="0.5s" repeatCount="indefinite" /></circle>
      {/* Hood/cloak */}
      <path d="M28 55 Q30 25 50 18 Q70 25 72 55 L66 50 Q64 30 50 24 Q36 30 34 50 Z" fill="#2a2418" opacity="0.6" />
    </svg>
  );
}

const godMap: Record<string, (props: { s: number }) => React.ReactNode> = {
  hermes: HermesPortrait,
  mercury: MercuryPortrait,
  apollo: ApolloPortrait,
  ares: AresPortrait,
  hercules: HerculesPortrait,
  athena: AthenaPortrait,
  prometheus: PrometheusPortrait,
  iris: IrisPortrait,
  atlas: AtlasPortrait,
};

const gradients: Record<string, string> = {
  hermes: "from-amber-500 to-yellow-400",
  mercury: "from-blue-500 to-cyan-400",
  apollo: "from-amber-400 to-orange-500",
  ares: "from-red-600 to-red-400",
  hercules: "from-amber-600 to-orange-400",
  athena: "from-violet-500 to-purple-400",
  prometheus: "from-red-500 to-orange-400",
  iris: "from-pink-400 to-indigo-400",
  atlas: "from-emerald-500 to-teal-400",
};

function findGod(id: string): string | null {
  const key = id.toLowerCase();
  // Check exact matches and common variants
  const aliases: Record<string, string> = {
    apolo: "apollo", hercule: "hercules", heracle: "hercules", herakle: "hercules",
  };
  for (const name of Object.keys(godMap)) {
    if (key.includes(name)) return name;
  }
  for (const [alias, god] of Object.entries(aliases)) {
    if (key.includes(alias)) return god;
  }
  return null;
}

export function GodAvatar({ agentId, size = "md" }: { agentId: string; size?: "sm" | "md" | "lg" | "xl" | "2xl" }) {
  const god = findGod(agentId);
  const Portrait = god ? godMap[god] : null;
  const grad = god ? gradients[god] : "from-stone-600 to-stone-400";
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
  return god ? gradients[god] : "from-stone-600 to-stone-400";
}

export function getAgentColor(agentId: string): string {
  const colors: Record<string, string> = {
    hermes: "#c9a84c", mercury: "#3b82f6", apollo: "#f59e0b",
    ares: "#dc2626", hercules: "#d97706", athena: "#8b5cf6",
    prometheus: "#ef4444", iris: "#ec4899", atlas: "#10b981",
  };
  const god = findGod(agentId);
  return god ? colors[god] : "#7a7060";
}
