/**
 * Intro.tsx — Full-screen intro page
 * يظهر قبل الـ portfolio — فيه الستيكر + الاسم + السوشيال + زرار Enter
 *
 * Props: onEnter() — بيتحط في App.tsx عشان يعدي للـ portfolio
 */
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
// ─── Palette ──────────────────────────────────────────────────────────────────
const P = {
  bg1:    "#050816",
  p400:   "#8B5CF6",
  p300:   "#A78BFA",
  p200:   "#C4B5FD",
  white:  "#FFFFFF",
  muted:  "rgba(196,181,253,0.50)",
  faint:  "rgba(196,181,253,0.20)",
  border: "rgba(139,92,246,0.16)",
  glow:   "rgba(139,92,246,0.22)",
};
const ease = [0.22, 1, 0.36, 1] as const;
// ─── Types ────────────────────────────────────────────────────────────────────
type Social = { label: string; href: string; color: string; glow: string; icon: React.ReactNode };

// ─── Social data — ترتيب: LinkedIn → GitHub → Facebook → Instagram ────────────
const SOCIALS: Social[] = [
  {
    label: "LinkedIn", href: "https://www.linkedin.com/in/ahmedabdelhalim2001/", color: "#0A66C2", glow: "rgba(10,102,194,0.45)",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>,
  },
  {
    label: "GitHub", href: "https://github.com/ahmed3012001", color: "#e2e8f0", glow: "rgba(226,232,240,0.35)",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  },
  {
    label: "Facebook", href: "https://www.facebook.com/ahmed.abdelhalim.233073?locale=ar_AR", color: "#1877F2", glow: "rgba(24,119,242,0.45)",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.62 23.1 24 18.1 24 12.07z"/></svg>,
  },
  {
    label: "Instagram", href: "https://www.instagram.com/halimo_92/", color: "#E1306C", glow: "rgba(225,48,108,0.45)",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
];

// ─── Roles ────────────────────────────────────────────────────────────────────
const ROLES = ["Front-End Developer", "React Specialist", "UI Engineer", "TypeScript Expert"];

// ─── Skill strips ─────────────────────────────────────────────────────────────
const SKILLS_A = ["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion", "GraphQL", "Vite"];
const SKILLS_B = ["JavaScript", "CSS", "REST APIs", "Redux", "Figma", "Git", "HTML5"];

// ══════════════════════════════════════════════════════════════════════════════
// Sub-components
// ══════════════════════════════════════════════════════════════════════════════

// ─── Star field canvas ───────────────────────────────────────────────────────
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let w = 0, h = 0;
    interface Star { x: number; y: number; r: number; a: number; da: number }
    interface Line { x1: number; y1: number; x2: number; y2: number; prog: number; speed: number; alpha: number }
    const stars: Star[] = [];
    const lines: Line[] = [];
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 140; i++) stars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.2 + 0.2, a: Math.random(), da: (Math.random() - 0.5) * 0.004 });
    const spawnLine = () => {
      const fromLeft = Math.random() > 0.5;
      const sx = fromLeft ? -60 : w + 60;
      const sy = Math.random() * h;
      const len = 80 + Math.random() * 140;
      const ang = (fromLeft ? 1 : -1) * (0.2 + Math.random() * 0.2);
      lines.push({ x1: sx, y1: sy, x2: sx + Math.cos(ang) * len, y2: sy + Math.sin(ang) * len, prog: 0, speed: 0.003 + Math.random() * 0.004, alpha: 0.12 + Math.random() * 0.18 });
    };
    for (let i = 0; i < 6; i++) spawnLine();
    let fc = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      fc++;
      if (fc % 90 === 0 && lines.length < 12) spawnLine();
      stars.forEach(s => {
        s.a = Math.max(0.05, Math.min(1, s.a + s.da));
        if (s.a <= 0.05 || s.a >= 1) s.da *= -1;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,181,253,${s.a * 0.6})`; ctx.fill();
      });
      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];
        l.prog = Math.min(1, l.prog + l.speed);
        const alpha = l.prog < 0.5 ? l.prog * 2 * l.alpha : (1 - l.prog) * 2 * l.alpha;
        const grd = ctx.createLinearGradient(l.x1, l.y1, l.x2, l.y2);
        grd.addColorStop(0, `rgba(139,92,246,0)`); grd.addColorStop(0.4, `rgba(167,139,250,${alpha})`); grd.addColorStop(1, `rgba(196,181,253,0)`);
        ctx.beginPath();
        ctx.moveTo(l.x1 + (l.x2 - l.x1) * (l.prog * 0.6), l.y1 + (l.y2 - l.y1) * (l.prog * 0.6));
        ctx.lineTo(l.x1 + (l.x2 - l.x1) * Math.min(1, l.prog * 1.4), l.y1 + (l.y2 - l.y1) * Math.min(1, l.prog * 1.4));
        ctx.strokeStyle = grd; ctx.lineWidth = 1; ctx.stroke();
        if (l.prog >= 1) lines.splice(i, 1);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ─── Ambient glows + grid ─────────────────────────────────────────────────────
function Glows() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.22, 0.34, 0.22] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "-15%", left: "-10%", width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,40,217,0.32) 0%, transparent 68%)", filter: "blur(48px)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.14, 0.22, 0.14] }}
        transition={{ duration: 16, delay: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: "-12%", right: "-8%", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 68%)", filter: "blur(56px)" }}
      />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(139,92,246,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.035) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
    </div>
  );
}

// ─── Custom cursor ────────────────────────────────────────────────────────────
function Cursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 160, damping: 18 });
  const sy = useSpring(my, { stiffness: 160, damping: 18 });
  const [active, setActive] = useState(false);
  useEffect(() => {
    const m = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const over = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("a,button,[data-cursor]")) setActive(true); };
    const out = () => setActive(false);
    window.addEventListener("mousemove", m);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", m); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); };
  }, [mx, my]);
  return (
    <>
      <motion.div style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", position: "fixed", top: 0, left: 0, zIndex: 9999, width: active ? 44 : 10, height: active ? 44 : 10, borderRadius: "50%", background: active ? "rgba(167,139,250,0.10)" : P.p300, border: active ? `1.5px solid rgba(167,139,250,0.6)` : "none", boxShadow: active ? `0 0 18px rgba(167,139,250,0.4)` : `0 0 6px rgba(167,139,250,0.8)`, pointerEvents: "none", transition: "width 0.25s, height 0.25s, background 0.25s, border 0.25s" }} />
      <motion.div style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%", position: "fixed", top: 0, left: 0, zIndex: 9998, width: 4, height: 4, borderRadius: "50%", background: P.white, pointerEvents: "none", opacity: active ? 0 : 0.9 }} />
    </>
  );
}

// ─── Corner mark (logo) ───────────────────────────────────────────────────────
function CornerMark() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
      style={{ position: "fixed", top: 32, left: 44, zIndex: 40, display: "flex", alignItems: "center", gap: 10, cursor: "default" }}
    >
      <div style={{ position: "relative", width: 34, height: 34 }}>
        <svg width="34" height="34" viewBox="0 0 34 34">
          <polygon points="17,2 31,10 31,24 17,32 3,24 3,10" fill="none" stroke={P.p400} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 5px ${P.glow})` }} />
          <text x="17" y="22" textAnchor="middle" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, fill: P.p200 }}>AA</text>
        </svg>
      </div>
      <div>
        <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700, color: P.white, lineHeight: 1.2, letterSpacing: "0.01em", margin: 0 }}>Ahmed Abdelhalim</p>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: P.muted, letterSpacing: "0.12em", margin: 0 }}>FE ENGINEER</p>
      </div>
    </motion.div>
  );
}

// ─── Side labels ──────────────────────────────────────────────────────────────
function SideLabel({ text, side }: { text: string; side: "left" | "right" }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
      style={{ position: "fixed", top: "50%", [side]: 20, transform: "translateY(-50%)", zIndex: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
    >
      <div style={{ writingMode: "vertical-rl", textOrientation: "mixed", fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: P.faint, textTransform: "uppercase" }}>{text}</div>
      <div style={{ width: 1, height: 50, background: `linear-gradient(to bottom, ${P.faint}, transparent)` }} />
    </motion.div>
  );
}

// ─── Role rotator ─────────────────────────────────────────────────────────────
function RoleRotator() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 3200);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, height: 28, overflow: "hidden" }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: P.p400 }}>{">"}</span>
      <div style={{ position: "relative", height: 28, overflow: "hidden", minWidth: 240 }}>
        <AnimatePresence mode="wait">
          <motion.span key={idx} initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -22, opacity: 0 }} transition={{ duration: 0.38, ease }}
            style={{ position: "absolute", fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700, color: P.p200, letterSpacing: "0.04em", whiteSpace: "nowrap" }}
          >
            {ROLES[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }}
        style={{ display: "inline-block", width: 2, height: 14, background: P.p300, borderRadius: 1, boxShadow: `0 0 6px ${P.p300}` }}
      />
    </div>
  );
}

// ─── Skill strip ──────────────────────────────────────────────────────────────
function SkillStrip({ items, direction, delay }: { items: string[]; direction: 1 | -1; delay: number }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)" }}>
      <motion.div
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear", delay }}
        style={{ display: "flex", gap: 10, width: "max-content" }}
      >
        {doubled.map((s, i) => (
          <div key={i} style={{ padding: "5px 14px", borderRadius: 6, border: `1px solid ${P.border}`, background: "rgba(139,92,246,0.06)", fontFamily: "'Space Mono', monospace", fontSize: 11, color: P.muted, whiteSpace: "nowrap", letterSpacing: "0.06em" }}>
            {s}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Social pill ──────────────────────────────────────────────────────────────
function SocialPill({ s, delay }: { s: Social; delay: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a href={s.href} aria-label={s.label}
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      whileHover={{ y: -5, scale: 1.12 }} whileTap={{ scale: 0.93 }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 12, border: `1px solid ${hov ? s.color + "55" : P.border}`, background: hov ? `${s.color}14` : "rgba(11,17,32,0.5)", backdropFilter: "blur(8px)", color: hov ? s.color : P.muted, boxShadow: hov ? `0 0 20px ${s.glow}` : "none", cursor: "pointer", textDecoration: "none", transition: "all 0.25s ease", position: "relative" }}
    >
      {s.icon}
      <AnimatePresence>
        {hov && (
          <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
            style={{ position: "absolute", bottom: -26, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.08em", color: s.color, whiteSpace: "nowrap" }}
          >
            {s.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

// ─── Chat types & data ───────────────────────────────────────────────────────
type Msg = { from: "bot" | "user"; text: string };

// Nav sections — clicking scrolls to section (works after entering portfolio)
const NAV_ACTIONS = [
  { label: "💬 التواصل",    id: "contact",  reply: "هوريك قسم التواصل! 👇 تقدر تبعت رسالة لأحمد مباشرة من هناك." },
  { label: "🚀 البروجكتات", id: "projects", reply: "هوريك مشاريع أحمد! 👇 شوف الشغل بنفسك." },
  { label: "⚡ المهارات",   id: "skills",   reply: "هوريك قسم المهارات! 👇 أحمد بيشتغل بـ React, TypeScript, Tailwind وأكتر." },
  { label: "👤 النبذة عني", id: "about",    reply: "هوريك قسم النبذة! 👇 تعرف على أحمد أكتر." },
] as const

const BOT_REPLIES: Record<string, string> = {
  default:   "مش فاهم السؤال تماماً 😅 استخدم الأزرار أو اسألني بطريقة تانية!",
  هاي:       "هاي! 👋 أنا مساعد أحمد. إزاي أقدر أساعدك؟",
  مرحبا:     "مرحبا! 👋 أنا هنا أساعدك تتعرف على أحمد وشغله.",
  hi:        "Hi! 👋 أنا مساعد بورتفوليو أحمد. إزاي أساعدك؟",
  hello:     "Hello! 👋 أنا هنا أساعدك. اضغط على الأزرار أو اسأل بحرية!",
  skills:    "أحمد بيشتغل بـ React, TypeScript, Tailwind CSS, JavaScript, HTML & CSS. بيركز على الـ performance والـ clean UI.",
  مهارات:    "أحمد بيشتغل بـ React, TypeScript, Tailwind CSS. متخصص في الـ Front-End بالكامل.",
  projects:  "أحمد عمل مشاريع production-grade حقيقية. اضغط 'البروجكتات' عشان تشوفها!",
  مشاريع:    "أحمد عمل مشاريع حقيقية. اضغط زرار 'البروجكتات' عشان تشوفها كلها!",
  contact:   "تقدر توصل لأحمد عن طريق LinkedIn أو GitHub أو من خلال فورم التواصل في البورتفوليو.",
  تواصل:     "اضغط زرار 'التواصل' وهتلاقي فورم بتبعت رسالة لأحمد مباشرة!",
  hire:      "أحمد open لـ opportunities جديدة! روح لقسم التواصل وابدأ المحادثة.",
  توظيف:     "أحمد مستعد لفرص جديدة! اضغط زرار 'التواصل' ابعتله رسالة.",
  react:     "React هي الـ framework الأساسية عند أحمد. بيبني component systems قابلة للـ scale.",
  about:     "أحمد Front-End Engineer متخصص في React و TypeScript. مهتم بالـ performance والـ UI/UX.",
  عني:       "أحمد Front-End Software Engineer، بيشتغل بـ React وTypeScript ومهتم جداً بتفاصيل الـ UI.",
};

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(BOT_REPLIES)) {
    if (key !== "default" && lower.includes(key)) return BOT_REPLIES[key];
  }
  return BOT_REPLIES.default;
}

// Scroll to section helper — works whether we're inside Intro or portfolio
function scrollToSection(id: string, onEnterFirst?: () => void) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (onEnterFirst) {
    // Section doesn't exist yet — we're still in Intro → enter first then scroll
    onEnterFirst();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 600);
  }
}

// ─── Chatbot modal ────────────────────────────────────────────────────────────
function ChatBot({ onClose, onEnter }: { onClose: () => void; onEnter: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "اهلا عزيزي في بورتفوليو أحمد عبدالحليم، أساعدك ازاي؟ 👋" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const botReply = (text: string) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { from: "bot", text }]);
    }, 700 + Math.random() * 300);
  };

  const send = (text?: string) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed) return;
    setMessages(m => [...m, { from: "user", text: trimmed }]);
    setInput("");
    botReply(getBotReply(trimmed));
  };

  const handleNav = (action: typeof NAV_ACTIONS[number]) => {
    setMessages(m => [...m, { from: "user", text: action.label }]);
    botReply(action.reply);
    // small delay so user reads the reply before scrolling
    setTimeout(() => {
      onClose();
      scrollToSection(action.id, onEnter);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      {/* Panel */}
      <motion.div
        initial={{ scale: 0.88, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 12, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(460px, 94vw)",
          height: "min(600px, 85vh)",
          borderRadius: 22,
          background: "rgba(8,12,28,0.94)",
          border: `1px solid ${P.border}`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.10)`,
          backdropFilter: "blur(28px)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* ── Header ── */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${P.border}`, display: "flex", alignItems: "center", gap: 12, flexShrink: 0, background: "rgba(139,92,246,0.05)" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${P.p400}, #6d28d9)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 14px ${P.glow}` }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700, color: P.white }}>مساعد أحمد عبدالحليم</p>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.4, repeat: Infinity }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.8)" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(34,197,94,0.85)", letterSpacing: "0.1em" }}>متاح الآن</span>
            </div>
          </div>
          <button onClick={onClose}
            style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${P.border}`, borderRadius: 8, width: 32, height: 32, color: P.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, transition: "background 0.2s, color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = P.white; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = P.muted; }}
          >✕</button>
        </div>

        {/* ── Nav action buttons ── */}
        <div style={{ padding: "12px 16px 10px", borderBottom: `1px solid ${P.border}`, display: "flex", gap: 7, flexWrap: "wrap", flexShrink: 0, background: "rgba(0,0,0,0.15)" }}>
          <p style={{ width: "100%", margin: "0 0 8px", fontFamily: "'Space Mono', monospace", fontSize: 9, color: P.faint, letterSpacing: "0.14em", textTransform: "uppercase" }}>انتقل إلى</p>
          {NAV_ACTIONS.map(action => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleNav(action)}
              style={{
                padding: "7px 13px", borderRadius: 10,
                border: `1px solid ${P.border}`,
                background: "rgba(139,92,246,0.10)",
                fontFamily: "'Manrope', sans-serif", fontSize: 12, fontWeight: 600,
                color: P.p200, cursor: "pointer",
                transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
                display: "flex", alignItems: "center", gap: 5,
              }}
              onMouseEnter={e => {
                const t = e.currentTarget;
                t.style.background = "rgba(139,92,246,0.22)";
                t.style.borderColor = P.p400;
                t.style.boxShadow = `0 0 14px ${P.glow}`;
              }}
              onMouseLeave={e => {
                const t = e.currentTarget;
                t.style.background = "rgba(139,92,246,0.10)";
                t.style.borderColor = P.border;
                t.style.boxShadow = "none";
              }}
            >
              {action.label}
            </motion.button>
          ))}
        </div>

        {/* ── Messages ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
          {messages.map((msg, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 7 }}
            >
              {msg.from === "bot" && (
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${P.p400}, #6d28d9)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 2 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                </div>
              )}
              <div style={{
                maxWidth: "74%", padding: "9px 13px",
                borderRadius: msg.from === "user" ? "14px 14px 4px 14px" : "4px 14px 14px 14px",
                background: msg.from === "user"
                  ? `linear-gradient(135deg, ${P.p400}, #6d28d9)`
                  : "rgba(255,255,255,0.07)",
                border: msg.from === "bot" ? `1px solid ${P.border}` : "none",
                fontFamily: "'Manrope', sans-serif", fontSize: 13, lineHeight: 1.6,
                color: msg.from === "user" ? "#fff" : P.p200,
                direction: "rtl",
              }}>
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing dots */}
          <AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ display: "flex", alignItems: "flex-end", gap: 7 }}
              >
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg, ${P.p400}, #6d28d9)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                </div>
                <div style={{ padding: "10px 14px", borderRadius: "4px 14px 14px 14px", background: "rgba(255,255,255,0.07)", border: `1px solid ${P.border}`, display: "flex", gap: 4, alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.55, delay: i * 0.14, repeat: Infinity }}
                      style={{ width: 5, height: 5, borderRadius: "50%", background: P.p400 }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* ── Input ── */}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${P.border}`, display: "flex", gap: 8, flexShrink: 0 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") send(); }}
            placeholder="اكتب سؤالك هنا..."
            style={{
              flex: 1, background: "rgba(255,255,255,0.05)", border: `1px solid ${P.border}`,
              borderRadius: 10, padding: "9px 13px", color: P.white,
              fontFamily: "'Manrope', sans-serif", fontSize: 13, outline: "none",
              transition: "border-color 0.2s", direction: "rtl",
            }}
            onFocus={e => (e.target.style.borderColor = P.p400)}
            onBlur={e => (e.target.style.borderColor = P.border)}
          />
          <button onClick={() => send()} disabled={!input.trim()}
            style={{
              width: 40, height: 40, borderRadius: 10, border: "none", flexShrink: 0,
              background: input.trim() ? `linear-gradient(135deg, ${P.p400}, #6d28d9)` : "rgba(255,255,255,0.05)",
              color: input.trim() ? "#fff" : P.muted, cursor: input.trim() ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s", boxShadow: input.trim() ? `0 0 14px ${P.glow}` : "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}



// ─── Chat trigger button ───────────────────────────────────────────────────────
function ChatButton({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.08, ease }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      title="Chat with Ahmed's assistant"
      style={{
        position: "relative", width: 48, height: 48, borderRadius: 14, border: `1px solid ${hov ? P.p400 + "88" : P.border}`,
        background: hov ? "rgba(139,92,246,0.18)" : "rgba(11,17,32,0.6)",
        backdropFilter: "blur(10px)", color: hov ? P.p300 : P.muted,
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hov ? `0 0 20px ${P.glow}` : "none",
        transition: "all 0.25s ease", flexShrink: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
      {/* Notification dot */}
      <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: "50%", background: "#22c55e", border: "1.5px solid rgba(8,12,28,0.9)", boxShadow: "0 0 6px rgba(34,197,94,0.8)" }}
      />
    </motion.button>
  );
}

// ─── Enter button ─────────────────────────────────────────────────────────────
function EnterButton({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0, ease }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      style={{ position: "relative", padding: "13px 30px", borderRadius: 14, border: "none", cursor: "pointer", fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "0.03em", background: hov ? `linear-gradient(135deg, #7c3aed, ${P.p400}, ${P.p300})` : `linear-gradient(135deg, ${P.p400}, #6d28d9)`, color: P.white, boxShadow: hov ? `0 0 36px rgba(139,92,246,0.55), 0 8px 28px rgba(109,40,217,0.4)` : `0 0 18px ${P.glow}`, transform: hov ? "translateY(-2px)" : "translateY(0)", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)", overflow: "hidden" }}
    >
      {hov && (
        <motion.div initial={{ x: "-100%" }} animate={{ x: "250%" }} transition={{ duration: 0.5 }}
          style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)", pointerEvents: "none" }}
        />
      )}
      <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8 }}>
        Enter Empire
        <motion.span animate={{ x: hov ? 5 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
      </span>
    </motion.button>
  );
}

// ─── DevSticker — animated SVG with float ────────────────────────────────────
function DevSticker() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "relative" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.82, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.85, ease }}
        style={{ position: "relative", width: 260, height: 260, flexShrink: 0 }}
      >
        {/* Glow behind */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: -20, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)", filter: "blur(18px)", pointerEvents: "none" }}
        />
        {/* Float shadow */}
        <motion.div
          animate={{ scaleX: [1, 0.82, 1], opacity: [0.22, 0.10, 0.22] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: -18, left: "50%", transform: "translateX(-50%)", width: 180, height: 18, borderRadius: "50%", background: "rgba(139,92,246,0.35)", filter: "blur(12px)", pointerEvents: "none" }}
        />

        <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          <defs>
            <radialGradient id="iScreenGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" /><stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" /></radialGradient>
            <linearGradient id="iLaptopBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e2d4a" /><stop offset="100%" stopColor="#0f1a2e" /></linearGradient>
            <linearGradient id="iScreenBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0d1630" /><stop offset="100%" stopColor="#070e1f" /></linearGradient>
            <linearGradient id="iShirtGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2d1b69" /><stop offset="100%" stopColor="#1a0f3e" /></linearGradient>
            <linearGradient id="iDeskGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2540" /><stop offset="100%" stopColor="#101828" /></linearGradient>
            <clipPath id="iScreenClip"><rect x="72" y="108" width="116" height="72" rx="3" /></clipPath>
          </defs>
          {/* Desk */}
          <rect x="30" y="208" width="200" height="14" rx="4" fill="url(#iDeskGrad)" />
          <rect x="30" y="208" width="200" height="2" rx="1" fill="rgba(139,92,246,0.25)" />
          {/* Laptop base */}
          <rect x="58" y="196" width="144" height="14" rx="3" fill="url(#iLaptopBody)" />
          <rect x="58" y="196" width="144" height="2" rx="1" fill="rgba(139,92,246,0.20)" />
          <rect x="112" y="200" width="36" height="7" rx="2" fill="rgba(139,92,246,0.10)" stroke="rgba(139,92,246,0.20)" strokeWidth="0.8" />
          {[0,1,2].map(row => (
            <g key={row}>{[0,1,2,3,4,5,6,7].map(col => (
              <rect key={col} x={66+col*15+(row===2?8:0)} y={198+row*2.8} width={row===2?10:12} height="2" rx="0.6" fill="rgba(167,139,250,0.18)" />
            ))}</g>
          ))}
          {/* Screen */}
          <rect x="66" y="104" width="128" height="94" rx="6" fill="url(#iLaptopBody)" />
          <rect x="72" y="108" width="116" height="72" rx="3" fill="url(#iScreenBg)" />
          <rect x="72" y="108" width="116" height="72" rx="3" fill="url(#iScreenGlow)" />
          {/* Animated code lines */}
          <g clipPath="url(#iScreenClip)">
            <motion.rect x="78" y="116" height="4" rx="1.5" fill="#A78BFA" initial={{ width: 0 }} animate={{ width: [0,55,55,0] }} transition={{ duration: 3.2, repeat: Infinity, times: [0,0.35,0.75,1], ease: "easeInOut", delay: 0 }} />
            <motion.rect x="82" y="124" height="4" rx="1.5" fill="#34d399" initial={{ width: 0 }} animate={{ width: [0,40,40,0] }} transition={{ duration: 3.2, repeat: Infinity, times: [0,0.35,0.75,1], ease: "easeInOut", delay: 0.4 }} />
            <motion.rect x="86" y="132" height="4" rx="1.5" fill="#fbbf24" initial={{ width: 0 }} animate={{ width: [0,68,68,0] }} transition={{ duration: 3.2, repeat: Infinity, times: [0,0.35,0.75,1], ease: "easeInOut", delay: 0.8 }} />
            <motion.rect x="86" y="140" height="4" rx="1.5" fill="#f87171" initial={{ width: 0 }} animate={{ width: [0,48,48,0] }} transition={{ duration: 3.2, repeat: Infinity, times: [0,0.35,0.75,1], ease: "easeInOut", delay: 1.2 }} />
            <motion.rect x="82" y="148" height="4" rx="1.5" fill="#C4B5FD" initial={{ width: 0 }} animate={{ width: [0,30,30,0] }} transition={{ duration: 3.2, repeat: Infinity, times: [0,0.35,0.75,1], ease: "easeInOut", delay: 1.6 }} />
            <motion.rect x="78" y="156" height="4" rx="1.5" fill="#818cf8" initial={{ width: 0 }} animate={{ width: [0,20,20,0] }} transition={{ duration: 3.2, repeat: Infinity, times: [0,0.35,0.75,1], ease: "easeInOut", delay: 2.0 }} />
            <motion.rect x="78" y="163" width="5" height="5" rx="1" fill="#C4B5FD" animate={{ opacity: [1,0,1] }} transition={{ duration: 0.8, repeat: Infinity }} />
          </g>
          <rect x="72" y="108" width="116" height="72" rx="3" fill="none" stroke="rgba(139,92,246,0.35)" strokeWidth="1" />
          {/* Chair */}
          <rect x="100" y="168" width="60" height="8" rx="4" fill="#1a2540" />
          <rect x="118" y="176" width="24" height="32" rx="3" fill="#131e33" />
          {/* Body */}
          <ellipse cx="130" cy="176" rx="32" ry="12" fill="url(#iShirtGrad)" />
          <rect x="104" y="176" width="52" height="28" rx="8" fill="url(#iShirtGrad)" />
          <path d="M122 176 Q130 183 138 176" stroke="rgba(139,92,246,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Arms */}
          <motion.g animate={{ rotate: [-2,2,-2] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "106px 180px" }}>
            <path d="M106 180 Q92 192 88 200" stroke="#c8a882" strokeWidth="9" strokeLinecap="round" fill="none" />
            <ellipse cx="88" cy="202" rx="7" ry="5" fill="#c8a882" />
          </motion.g>
          <motion.g animate={{ rotate: [2,-2,2] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 0.15 }} style={{ transformOrigin: "154px 180px" }}>
            <path d="M154 180 Q168 192 172 200" stroke="#c8a882" strokeWidth="9" strokeLinecap="round" fill="none" />
            <ellipse cx="172" cy="202" rx="7" ry="5" fill="#c8a882" />
          </motion.g>
          {/* Neck + Head */}
          <rect x="124" y="158" width="12" height="18" rx="5" fill="#c8a882" />
          <ellipse cx="130" cy="148" rx="22" ry="24" fill="#c8a882" />
          <path d="M108 144 Q110 118 130 116 Q150 118 152 144 Q148 128 130 126 Q112 128 108 144Z" fill="#1a0a00" />
          <path d="M122 118 Q130 110 138 118 Q133 112 130 110 Q127 112 122 118Z" fill="#1a0a00" />
          {/* Eyes */}
          <motion.g animate={{ scaleY: [1,1,0.1,1,1] }} transition={{ duration: 3.5, repeat: Infinity, times: [0,0.45,0.5,0.55,1] }} style={{ transformOrigin: "130px 148px" }}>
            <ellipse cx="122" cy="148" rx="3.5" ry="3.5" fill="#1a0a00" />
            <ellipse cx="138" cy="148" rx="3.5" ry="3.5" fill="#1a0a00" />
            <circle cx="123.5" cy="146.5" r="1" fill="white" opacity="0.7" />
            <circle cx="139.5" cy="146.5" r="1" fill="white" opacity="0.7" />
          </motion.g>
          <path d="M118 143 Q122 141 126 143" stroke="#1a0a00" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M134 143 Q138 141 142 143" stroke="#1a0a00" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Smile */}
          <motion.path d="M124 156 Q130 161 136 156" stroke="#8b5020" strokeWidth="1.8" strokeLinecap="round" fill="none"
            animate={{ d: ["M124 156 Q130 161 136 156","M125 155 Q130 163 135 155","M124 156 Q130 161 136 156"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Headphones */}
          <path d="M108 148 Q108 128 130 126 Q152 128 152 148" stroke="#1e2d4a" strokeWidth="5" fill="none" strokeLinecap="round" />
          <rect x="104" y="145" width="8" height="10" rx="3" fill="#2d1b69" stroke="rgba(139,92,246,0.6)" strokeWidth="1" />
          <rect x="148" y="145" width="8" height="10" rx="3" fill="#2d1b69" stroke="rgba(139,92,246,0.6)" strokeWidth="1" />
          {/* Sparkles */}
          <motion.text x="158" y="130" fontSize="13" fill={P.p300} opacity="0.9" animate={{ y:[130,122,130], opacity:[0.9,0.5,0.9], rotate:[-8,8,-8] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "164px 130px" }}>{"</>"}</motion.text>
          <motion.text x="92" y="126" fontSize="11" fill="#fbbf24" animate={{ y:[126,118,126], opacity:[0.8,0.3,0.8], scale:[1,1.2,1] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} style={{ transformOrigin: "97px 126px" }}>✦</motion.text>
          <motion.text x="162" y="112" fontSize="9" fill={P.p200} animate={{ y:[112,106,112], opacity:[0.7,0.2,0.7] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}>★</motion.text>
          {/* WiFi dots */}
          <motion.g animate={{ opacity:[0.4,1,0.4] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx="174" cy="116" r="2" fill={P.p400} />
            <circle cx="180" cy="116" r="2" fill={P.p400} opacity="0.6" />
            <circle cx="186" cy="116" r="2" fill={P.p400} opacity="0.3" />
          </motion.g>
        </svg>

        {/* CODING... badge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, background: "rgba(11,17,32,0.7)", border: `1px solid ${P.border}`, backdropFilter: "blur(8px)", whiteSpace: "nowrap" }}
        >
          <motion.div animate={{ opacity:[0.4,1,0.4] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px rgba(34,197,94,0.8)" }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: P.muted, letterSpacing: "0.14em" }}>CODING...</span>
          <div style={{ display: "flex", gap: 2 }}>
            {[0,1,2].map(i => (
              <motion.div key={i} animate={{ scaleY:[0.4,1,0.4] }} transition={{ duration: 0.7, delay: i*0.15, repeat: Infinity }} style={{ width: 2, height: 8, borderRadius: 1, background: P.p400, transformOrigin: "center" }} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Main Intro component
// ══════════════════════════════════════════════════════════════════════════════
export default function Intro({ onEnter }: { onEnter: () => void }) {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative", background: P.bg1, cursor: "none" }}>
      <Cursor />
      <StarField />
      <Glows />
      <CornerMark />
      <SideLabel text="© 2025 Ahmed Abdelhalim" side="left" />
      <SideLabel text="FE · React · TypeScript" side="right" />

      {/* Central layout */}
      <div style={{ position: "relative", zIndex: 20, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 60px 60px", boxSizing: "border-box", gap: 0 }}>

        {/* Eyebrow + name + role */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 28 }}>

          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px 5px 10px", borderRadius: 40, border: `1px solid ${P.border}`, background: "rgba(139,92,246,0.07)", backdropFilter: "blur(8px)", marginBottom: 24 }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: P.p400, boxShadow: `0 0 8px ${P.glow}` }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: P.p200, letterSpacing: "0.15em" }}>WELCOME TO MY EMPIRE</span>
          </motion.div>

          {/* Name */}
          <div style={{ position: "relative", marginBottom: 14 }}>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.45, ease }}
              style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(3.4rem, 7vw, 6.5rem)", lineHeight: 0.95, letterSpacing: "-0.035em", color: P.white, textAlign: "center", margin: 0 }}
            >Ahmed</motion.h1>
            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.58, ease }}
              style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 1.0, letterSpacing: "-0.02em", background: `linear-gradient(110deg, ${P.p200} 0%, ${P.p300} 50%, ${P.p400} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textAlign: "center", margin: 0 }}
            >Abdel Halim</motion.h1>
            {/* Corner brackets */}
            {(["top","bottom"] as const).flatMap(v => (["left","right"] as const).map(h => (
              <motion.div key={`${v}${h}`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 0.4 }}
                style={{ position: "absolute", [v]: -8, [h]: -12, width: 12, height: 12, borderTop: v==="top" ? `1.5px solid ${P.p400}` : "none", borderBottom: v==="bottom" ? `1.5px solid ${P.p400}` : "none", borderLeft: h==="left" ? `1.5px solid ${P.p400}` : "none", borderRight: h==="right" ? `1.5px solid ${P.p400}` : "none" }}
              />
            )))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.6 }}>
            <RoleRotator />
          </motion.div>
        </div>

        {/* Sticker + Enter button + Chat button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.82, ease }}
          style={{ display: "flex", alignItems: "center", gap: 36, marginBottom: 30, flexWrap: "wrap", justifyContent: "center" }}
        >
          <DevSticker />
          {/* Buttons group */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            <EnterButton onClick={onEnter} />
            {/* Chat button — same row feel, below Enter */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ChatButton onClick={() => setChatOpen(true)} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: P.muted, letterSpacing: "0.1em" }}>
                Ask me anything
              </span>
            </div>
          </div>
        </motion.div>

        {/* Chatbot modal */}
        <AnimatePresence>
          {chatOpen && <ChatBot onClose={() => setChatOpen(false)} onEnter={onEnter} />}
        </AnimatePresence>

        {/* Skill strips */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 0.7 }}
          style={{ width: "100%", maxWidth: 700, display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}
        >
          <SkillStrip items={SKILLS_A} direction={-1} delay={0} />
          <SkillStrip items={SKILLS_B} direction={1} delay={0.5} />
        </motion.div>

        {/* Socials — LinkedIn → GitHub → Facebook → Instagram */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, transparent, ${P.border})` }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: P.faint, letterSpacing: "0.2em" }}>FIND ME ON</span>
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, ${P.border}, transparent)` }} />
          </motion.div>
          <div style={{ display: "flex", gap: 10, paddingBottom: 8 }}>
            {SOCIALS.map((s, i) => <SocialPill key={s.label} s={s} delay={1.2 + i * 0.07} />)}
          </div>
        </div>

      </div>
    </div>
  );
}
