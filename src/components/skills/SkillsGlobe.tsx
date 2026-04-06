"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import { SkillIcon, type SkillName } from "./skillIcons";

type Vec3 = { x: number; y: number; z: number };
type Quat = { x: number; y: number; z: number; w: number };

const PRIORITY_SKILLS: SkillName[] = [
  "React",
  "Next.js",
  "Vercel",
  "MongoDB",
  "MySQL",
  "Firebase",
  "Laravel",
  "JavaScript",
  "CSS",
  "HTML",
];

function pickDisplaySkills(skills: SkillName[], max: number) {
  const picked: SkillName[] = [];
  const seen = new Set<SkillName>();

  for (const s of PRIORITY_SKILLS) {
    if (skills.includes(s) && !seen.has(s)) {
      picked.push(s);
      seen.add(s);
      if (picked.length >= max) return picked;
    }
  }

  for (const s of skills) {
    if (!seen.has(s)) {
      picked.push(s);
      seen.add(s);
      if (picked.length >= max) break;
    }
  }

  return picked;
}

function fibonacciSphere(n: number): Vec3[] {
  const points: Vec3[] = [];
  const offset = 2 / n;
  const inc = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < n; i += 1) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    points.push({
      x: Math.cos(phi) * r,
      y,
      z: Math.sin(phi) * r,
    });
  }

  return points;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function vecDot(a: Vec3, b: Vec3) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function vecCross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function vecLen(v: Vec3) {
  return Math.sqrt(vecDot(v, v));
}

function vecNormalize(v: Vec3): Vec3 {
  const l = vecLen(v);
  if (l <= 1e-10) return { x: 0, y: 0, z: 0 };
  return { x: v.x / l, y: v.y / l, z: v.z / l };
}

function vecScale(v: Vec3, s: number): Vec3 {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

function quatMul(a: Quat, b: Quat): Quat {
  return {
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
  };
}

function quatNormalize(q: Quat): Quat {
  const l = Math.sqrt(q.w * q.w + q.x * q.x + q.y * q.y + q.z * q.z);
  if (l <= 1e-10) return { x: 0, y: 0, z: 0, w: 1 };
  return { x: q.x / l, y: q.y / l, z: q.z / l, w: q.w / l };
}

function quatFromAxisAngle(axis: Vec3, angle: number): Quat {
  const a = vecNormalize(axis);
  const half = angle / 2;
  const s = Math.sin(half);
  return quatNormalize({ x: a.x * s, y: a.y * s, z: a.z * s, w: Math.cos(half) });
}

function rotateVec3ByQuat(v: Vec3, q: Quat): Vec3 {
  const u = { x: q.x, y: q.y, z: q.z };
  const t = vecScale(vecCross(u, v), 2);
  const out = {
    x: v.x + t.x * q.w + (u.y * t.z - u.z * t.y),
    y: v.y + t.y * q.w + (u.z * t.x - u.x * t.z),
    z: v.z + t.z * q.w + (u.x * t.y - u.y * t.x),
  };
  return out;
}

function pointerToArcball(el: HTMLElement, clientX: number, clientY: number): Vec3 {
  const rect = el.getBoundingClientRect();
  const size = Math.max(1, Math.min(rect.width, rect.height));
  const r = size / 2;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const x = (clientX - cx) / r;
  const y = (cy - clientY) / r;

  const d2 = x * x + y * y;
  if (d2 <= 1) return { x, y, z: Math.sqrt(1 - d2) };

  const d = Math.sqrt(d2);
  return { x: x / d, y: y / d, z: 0 };
}

function drawWireframe(
  canvas: HTMLCanvasElement,
  q: Quat,
  rCss: number,
  depthCss: number,
  stroke: string,
) {
  const rect = canvas.getBoundingClientRect();
  const dpr = canvas.width / Math.max(1, rect.width);
  const w = canvas.width;
  const h = canvas.height;
  if (!w || !h) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, w, h);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = stroke;

  const cx = w / 2;
  const cy = h / 2;
  const r = rCss * dpr;
  const depth = depthCss * dpr;

  const project = (p: Vec3) => {
    const v = rotateVec3ByQuat(p, q);
    const scaleP = depth / (depth - v.z * r);
    return { x: v.x * r * scaleP, y: v.y * r * scaleP, z: v.z };
  };

  const steps = 96;
  const meridians = 22;
  const parallels = 10;

  ctx.lineWidth = 0.9 * dpr;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  const drawCircle = (fn: (u: number) => Vec3) => {
    const pts = Array.from({ length: steps + 1 }, (_, i) => project(fn((i / steps) * Math.PI * 2)));
    for (let i = 0; i < pts.length - 1; i += 1) {
      const a = pts[i]!;
      const b = pts[i + 1]!;
      const zMid = (a.z + b.z) / 2;
      ctx.globalAlpha = zMid >= 0 ? 0.16 : 0.06;
      ctx.beginPath();
      ctx.moveTo(cx + a.x, cy + a.y);
      ctx.lineTo(cx + b.x, cy + b.y);
      ctx.stroke();
    }
  };

  for (let i = 0; i < meridians; i += 1) {
    const lambda = (i / meridians) * Math.PI;
    drawCircle((u) => ({
      x: Math.cos(u) * Math.cos(lambda),
      y: Math.sin(u),
      z: Math.cos(u) * Math.sin(lambda),
    }));
  }

  for (let i = 1; i <= parallels; i += 1) {
    const t = i / (parallels + 1);
    const phi = (t - 0.5) * Math.PI;
    const c = Math.cos(phi);
    const s = Math.sin(phi);
    drawCircle((u) => ({ x: c * Math.cos(u), y: s, z: c * Math.sin(u) }));
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

const SKILL_ACCENT: Record<SkillName, { icon: string; bg: string; border: string }> = {
  HTML: { icon: "text-orange-500", bg: "bg-orange-500/12", border: "border-orange-500/22" },
  CSS: { icon: "text-sky-400", bg: "bg-sky-400/12", border: "border-sky-400/22" },
  JavaScript: {
    icon: "text-yellow-300",
    bg: "bg-yellow-300/10",
    border: "border-yellow-300/20",
  },
  React: { icon: "text-cyan-300", bg: "bg-cyan-300/10", border: "border-cyan-300/20" },
  "Next.js": { icon: "text-zinc-100", bg: "bg-zinc-100/10", border: "border-zinc-100/18" },
  Vercel: { icon: "text-black", bg: "bg-white", border: "border-white/90" },
  jQuery: { icon: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  Laravel: { icon: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
  PHP: { icon: "text-indigo-300", bg: "bg-indigo-300/10", border: "border-indigo-300/20" },
  MySQL: { icon: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  MongoDB: {
    icon: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  Firebase: { icon: "text-amber-300", bg: "bg-amber-300/10", border: "border-amber-300/20" },
  Railway: { icon: "text-purple-300", bg: "bg-purple-300/10", border: "border-purple-300/20" },
};

export type SkillsGlobeProps = {
  skills: SkillName[];
  active?: boolean;
  className?: string;
};

export function SkillsGlobe({
  skills,
  active = true,
  className,
}: SkillsGlobeProps) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderNowRef = useRef<(() => void) | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const hoveredRef = useRef<SkillName | null>(null);

  const displaySkills = useMemo(() => pickDisplaySkills(skills, 10), [skills]);
  const safeIndex = displaySkills.length ? activeIndex % displaySkills.length : 0;
  const activeSkill = displaySkills[safeIndex] ?? null;

  const points = useMemo(() => {
    const pts = fibonacciSphere(displaySkills.length);
    return displaySkills.map((skill, i) => ({ skill, p: pts[i]! }));
  }, [displaySkills]);

  const stateRef = useRef({
    radius: 220,
    depth: 560,
    orientation: { x: 0.08, y: 0.0, z: 0, w: 0.997 } satisfies Quat,
    angVel: { x: 0, y: 0.22, z: 0 } satisfies Vec3,
    dragging: false,
    lastV: { x: 0, y: 0, z: 1 } satisfies Vec3,
    lastT: 0,
    restoreTouchAction: "",
    wireColor: "",
    wireColorAt: 0,
  });

  useEffect(() => {
    if (reduced) return;
    if (!active) return;

    const id = window.setInterval(() => {
      if (hoveredRef.current) return;
      if (stateRef.current.dragging) return;

      setPhase((p) => p + 1);
      setActiveIndex((idx) => (displaySkills.length ? (idx + 1) % displaySkills.length : 0));
    }, 3200);

    return () => window.clearInterval(id);
  }, [active, displaySkills, reduced]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onPointerMove = (e: PointerEvent) => {
      const s = stateRef.current;
      if (!s.dragging) return;

      const t = performance.now();
      const vNow = pointerToArcball(el, e.clientX, e.clientY);
      const vPrev = s.lastV;

      const axis = vecCross(vPrev, vNow);
      const axisLen = vecLen(axis);
      if (axisLen <= 1e-6) {
        s.lastV = vNow;
        s.lastT = t;
        return;
      }

      const angle = Math.acos(clamp(vecDot(vPrev, vNow), -1, 1));
      const dt = Math.max(1 / 240, (t - s.lastT) / 1000);
      const sensitivity = 1.1;
      const a = vecNormalize(axis);

      const qDelta = quatFromAxisAngle(a, angle * sensitivity);
      s.orientation = quatNormalize(quatMul(qDelta, s.orientation));

      const maxVel = 7;
      const speed = Math.min(maxVel, (angle * sensitivity) / dt);
      s.angVel = vecScale(a, speed);

      s.lastV = vNow;
      s.lastT = t;

      if (reduced) renderNowRef.current?.();
    };

    const onPointerDown = (e: PointerEvent) => {
      const s = stateRef.current;
      s.dragging = true;
      s.lastV = pointerToArcball(el, e.clientX, e.clientY);
      s.lastT = performance.now();
      s.restoreTouchAction = el.style.touchAction;
      el.style.touchAction = "none";
      el.setPointerCapture(e.pointerId);
    };

    const onPointerUp = (e: PointerEvent) => {
      const s = stateRef.current;
      s.dragging = false;
      el.style.touchAction = s.restoreTouchAction;
      el.releasePointerCapture(e.pointerId);
      if (reduced) renderNowRef.current?.();
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [reduced]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      const radius = Math.max(140, Math.round(size * 0.38));
      stateRef.current.radius = radius;
      stateRef.current.depth = Math.round(radius * 2.7);

      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        const px = Math.max(1, Math.round(size * dpr));
        canvas.width = px;
        canvas.height = px;
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    let lastT = performance.now();
    let running = false;

    const renderFrame = (t: number) => {
      const s = stateRef.current;
      const r = s.radius;
      const depth = s.depth;

      const dt = clamp((t - lastT) / 1000, 1 / 240, 1 / 20);
      lastT = t;

      if (!reduced && !s.dragging) {
        const friction = Math.exp(-1.6 * dt);
        s.angVel.x *= friction;
        s.angVel.y *= friction;
        s.angVel.z *= friction;

        const autoY = 0.22;
        const easeAuto = 1 - Math.exp(-1.4 * dt);
        const easeZero = 1 - Math.exp(-2.6 * dt);
        s.angVel.y += (autoY - s.angVel.y) * easeAuto;
        s.angVel.x += (0 - s.angVel.x) * easeZero;
        s.angVel.z += (0 - s.angVel.z) * easeZero;

        const speed = vecLen(s.angVel);
        if (speed > 1e-6) {
          const axis = vecScale(s.angVel, 1 / speed);
          const qStep = quatFromAxisAngle(axis, speed * dt);
          s.orientation = quatNormalize(quatMul(qStep, s.orientation));
        }
      }

      if (canvasRef.current) {
        if (!s.wireColor || t - s.wireColorAt > 1000) {
          s.wireColor =
            getComputedStyle(document.documentElement).getPropertyValue("--accent-2").trim() ||
            "#06b6d4";
          s.wireColorAt = t;
        }
        drawWireframe(canvasRef.current, s.orientation, r, depth, s.wireColor);
      }

      for (let i = 0; i < points.length; i += 1) {
        const ref = itemRefs.current[i];
        if (!ref) continue;

        let v = points[i]!.p;
        v = rotateVec3ByQuat(v, s.orientation);

        const scaleP = depth / (depth - v.z * r);
        const x = v.x * r * scaleP;
        const y = v.y * r * scaleP;
        const zN = (v.z + 1) / 2;

        const scale = 0.7 + zN * 0.55;
        const opacity = 0.35 + zN * 0.65;
        const zIndex = Math.round(zN * 1000);

        ref.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        ref.style.opacity = opacity.toFixed(3);
        ref.style.zIndex = String(zIndex);
      }
    };

    renderNowRef.current = () => renderFrame(performance.now());

    if (reduced || !active) {
      renderFrame(performance.now());
      return;
    }

    const stop = () => {
      if (!running) return;
      running = false;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
    };

    const loop = () => {
      if (!running) return;
      renderFrame(performance.now());
      raf = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      if (document.hidden) return;
      running = true;
      lastT = performance.now();
      raf = window.requestAnimationFrame(loop);
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    start();
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stop();
    };
  }, [active, points, reduced]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative mx-auto aspect-square w-full max-w-140 select-none touch-pan-y cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-90" />

      {points.map(({ skill }, i) => (
        <div
          key={skill}
          ref={(node) => {
            itemRefs.current[i] = node;
          }}
          className="absolute left-1/2 top-1/2 will-change-transform"
        >
          <button
            type="button"
            aria-label={skill}
            onMouseEnter={() => {
              hoveredRef.current = skill;
              const idx = displaySkills.indexOf(skill);
              if (idx >= 0) setActiveIndex(idx);
            }}
            onMouseLeave={() => {
              hoveredRef.current = null;
            }}
            onFocus={() => {
              hoveredRef.current = skill;
              const idx = displaySkills.indexOf(skill);
              if (idx >= 0) setActiveIndex(idx);
            }}
            onBlur={() => {
              hoveredRef.current = null;
            }}
            className={cn(
              "relative grid place-items-center rounded-full border border-border bg-surface/10",
              "shadow-[0_18px_70px_color-mix(in_oklab,var(--foreground)_10%,transparent)]",
              "h-14 w-14 sm:h-16 sm:w-16",
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "motion-reduce:transition-none",
            )}
          >
            <div
              className={cn(
                "grid h-12 w-12 place-items-center rounded-full border bg-surface/15 sm:h-14 sm:w-14",
                SKILL_ACCENT[skill].bg,
                SKILL_ACCENT[skill].border,
                SKILL_ACCENT[skill].icon,
              )}
            >
              <SkillIcon name={skill} className="h-7 w-7" />
            </div>

            {activeSkill === skill ? (
              <div
                key={`${skill}-${phase}`}
                className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2"
              >
                <div className="rounded-full border border-border bg-surface/55 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-foreground/90 backdrop-blur-sm">
                  {skill.toUpperCase()}
                </div>
              </div>
            ) : null}
          </button>
        </div>
      ))}
    </div>
  );
}
