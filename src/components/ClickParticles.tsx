import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  ox: number; // origin x (click point)
  oy: number; // origin y
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: "burst" | "return" | "done";
  age: number; // ms since created
  burstDuration: number; // ms to keep bursting
  returnStiffness: number; // spring-like pull
}

const COLORS = [
  "#d4a24c", // mustard (primary-container)
  "#d4a24c",
  "#d4a24c",
  "#d4a24c",
  "#d7e4c7", // sage (secondary-container)
  "#d7e4c7",
  "#fef8f2", // cream (surface)
  "#f3be65", // golden (inverse-primary)
  "#d4a24c",
  "#becbaf", // muted sage
  "#d4a24c",
  "#f3be65",
  "#d7e4c7",
  "#d4a24c",
];

const COUNT = 14;
const BURST_SPEED_MIN = 4;
const BURST_SPEED_MAX = 9;
const BURST_DURATION = 180; // ms before returning
const RETURN_STIFFNESS = 0.08; // spring pull per frame
const RETURN_DAMPING = 0.82; // velocity damping per frame
const FADE_START = 500; // ms — start fading on return
const LIFETIME = 900; // ms — total particle life

function makeParticles(x: number, y: number): Particle[] {
  return Array.from({ length: COUNT }, (_, i) => {
    const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.4;
    const speed = BURST_SPEED_MIN + Math.random() * (BURST_SPEED_MAX - BURST_SPEED_MIN);
    return {
      x,
      y,
      ox: x,
      oy: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 2.5 + Math.random() * 2.5,
      color: COLORS[i % COLORS.length],
      phase: "burst",
      age: 0,
      burstDuration: BURST_DURATION + Math.random() * 60,
      returnStiffness: RETURN_STIFFNESS + Math.random() * 0.03,
    };
  });
}

export default function ClickParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onClick(e: MouseEvent) {
      particlesRef.current.push(...makeParticles(e.clientX, e.clientY));
    }
    window.addEventListener("click", onClick);

    function tick(time: number) {
      const dt = Math.min(time - lastTimeRef.current, 32); // cap at ~30fps delta
      lastTimeRef.current = time;

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.age += dt;
        if (p.age > LIFETIME) return false;

        if (p.phase === "burst" && p.age >= p.burstDuration) {
          p.phase = "return";
        }

        if (p.phase === "burst") {
          // Simple linear movement
          p.x += p.vx;
          p.y += p.vy;
          // Slight gravity drag
          p.vx *= 0.97;
          p.vy *= 0.97;
        } else {
          // Spring back to origin
          const dx = p.ox - p.x;
          const dy = p.oy - p.y;
          p.vx += dx * p.returnStiffness;
          p.vy += dy * p.returnStiffness;
          p.vx *= RETURN_DAMPING;
          p.vy *= RETURN_DAMPING;
          p.x += p.vx;
          p.y += p.vy;

          // Done when close enough
          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.hypot(p.vx, p.vy) < 0.3) {
            return false;
          }
        }

        // Opacity: full during burst, fade on return
        let alpha = 1;
        if (p.phase === "return" && p.age > FADE_START) {
          alpha = 1 - (p.age - FADE_START) / (LIFETIME - FADE_START);
          alpha = Math.max(0, alpha);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        return true;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame((t) => {
      lastTimeRef.current = t;
      rafRef.current = requestAnimationFrame(tick);
    });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden
    />
  );
}
