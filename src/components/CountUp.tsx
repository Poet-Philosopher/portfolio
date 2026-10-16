"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}

export function CountUp({ to, decimals = 0, suffix = "", duration = 1.4, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, { duration, delay, ease: "easeOut", onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reduce, to, duration, delay]);

  const final = `${to.toFixed(decimals)}${suffix}`;
  return (
    <span ref={ref} className="tabular-nums" aria-label={final}>
      <span aria-hidden="true">{`${value.toFixed(decimals)}${suffix}`}</span>
    </span>
  );
}
