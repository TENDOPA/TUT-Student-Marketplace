import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

/* Scroll-triggered reveal: fade + slide up (or zoom) when entering viewport */
export function Reveal({ children, delay = 0, y = 24, scale = 1, className = "", once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Staggered container for lists */
export function Stagger({ children, className = "", stagger = 0.06 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* Animated number counter that runs when scrolled into view */
export function CountUp({ to, suffix = "", prefix = "", duration = 1.8, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const animate = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(animate);
      else setVal(to);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
}

/* 3D tilt-on-hover card wrapper */
export function TiltCard({ children, className = "", intensity = 8 }) {
  const ref = useRef(null);
  const rx = useSpring(0, { stiffness: 200, damping: 18 });
  const ry = useSpring(0, { stiffness: 200, damping: 18 });
  const sx = useTransform(rx, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const sy = useTransform(ry, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rx.set((e.clientY - r.top) / r.height - 0.5);
    ry.set((e.clientX - r.left) / r.width - 0.5);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d", transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Shared fallback image for broken/missing Unsplash URLs */
export const FALLBACK_IMG = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80";

export function SafeImage({ src, alt = "", className = "", loading, ...rest }) {
  const [s, setS] = useState(src);
  return <img src={s} alt={alt} className={className} loading={loading} onError={() => setS(FALLBACK_IMG)} {...rest} />;
}

/* Skeleton loader block */
export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-xl bg-muted ${className}`} />;
}

export function ProductSkeleton() {
  return (
    <div className="glass rounded-3xl overflow-hidden premium-shadow">
      <Skeleton className="rounded-none aspect-[4/3] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}