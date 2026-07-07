import { motion } from "framer-motion";
import { ANIMALS, pick } from "../lib/store";

const CheerPom = ({ side }) => (
  <motion.div
    animate={{ rotate: side === "left" ? [-22, 14, -22] : [22, -14, 22] }}
    transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
    style={{ transformOrigin: "bottom center" }}
    className="flex flex-col items-center"
  >
    <div
      style={{
        width: 26,
        height: 26,
        borderRadius: "9999px",
        background:
          "radial-gradient(circle at 34% 30%, #FDE047 0%, #EAB308 45%, #BE123C 100%)",
        boxShadow:
          "0 0 0 3px rgba(255,255,255,0.18), 0 0 0 6px rgba(234,179,8,0.15), inset 0 2px 3px rgba(255,255,255,0.5)",
      }}
    />
    <div style={{ width: 3, height: 14, background: "#6f5842", borderRadius: 2 }} />
  </motion.div>
);

const Critter = ({ emoji, bottomVh, duration, delay, fromLeft }) => (
  <motion.div
    className="absolute"
    style={{ bottom: `${bottomVh}vh`, left: 0 }}
    initial={{ x: fromLeft ? "-20vw" : "120vw" }}
    animate={{ x: fromLeft ? "120vw" : "-20vw" }}
    transition={{ duration, delay, ease: "linear" }}
  >
    <motion.div
      className="flex items-end gap-1"
      animate={{ y: [0, -16, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      style={{ transform: fromLeft ? "none" : "scaleX(-1)" }}
    >
      <CheerPom side="left" />
      <span style={{ fontSize: 60, lineHeight: 1 }}>{emoji}</span>
      <CheerPom side="right" />
    </motion.div>
  </motion.div>
);

export const WoodlandCheer = ({ cheer }) => {
  if (!cheer) return null;

  let critters = [];
  if (cheer.mode === "parade") {
    const pool = [...ANIMALS].sort(() => Math.random() - 0.5).slice(0, 5);
    critters = pool.map((emoji, i) => ({
      emoji,
      bottomVh: 6 + (i % 3) * 6,
      duration: 5.5 + (i % 3),
      delay: i * 0.7,
      fromLeft: i % 2 === 0,
    }));
  } else {
    critters = [
      {
        emoji: pick(ANIMALS),
        bottomVh: 8 + Math.random() * 12,
        duration: 4.5,
        delay: 0,
        fromLeft: Math.random() > 0.5,
      },
    ];
  }

  return (
    <div
      data-testid="woodland-cheer"
      className="fixed inset-0 z-40 overflow-hidden pointer-events-none"
    >
      {critters.map((c, i) => (
        <Critter key={`${cheer.id}-${i}`} {...c} />
      ))}
    </div>
  );
};
