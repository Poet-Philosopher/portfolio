"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";

export function WordReveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <p className={className}>{text}</p>;
  const words = text.split(" ");
  return (
    <p className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.045, ease: "easeOut" }}
          >
            {word}
          </motion.span>{" "}
        </Fragment>
      ))}
    </p>
  );
}
