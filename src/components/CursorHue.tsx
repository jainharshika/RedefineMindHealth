import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useAnimate } from "framer-motion";

export default function CursorHue() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  const [scope, animate] = useAnimate();

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const click = async () => {
      if (!scope.current) return;
      // Subtle swell — present but not demanding attention
      await animate(scope.current, { scale: 1.6, opacity: 0.35 }, { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] });
      // Gently recede back
      await animate(scope.current, { scale: 1, opacity: 1 }, { duration: 0.9, ease: [0.45, 0, 0.55, 1] });
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
    };
  }, [x, y, animate, scope]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 hidden md:block"
      style={{ mixBlendMode: "normal" }}
    >
      <motion.div
        ref={scope}
        className="absolute rounded-full"
        style={{
          x: sx,
          y: sy,
          width: 550,
          height: 550,
          marginLeft: -275,
          marginTop: -275,
          background:
            "radial-gradient(circle, rgba(212,180,136,0.50) 0%, rgba(212,180,136,0.25) 38%, rgba(212,180,136,0) 70%)",
        }}
      />
    </motion.div>
  );
}
