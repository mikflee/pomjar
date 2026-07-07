import { motion } from "framer-motion";
import { ANIMALS, pick } from "../lib/store";

// Emoji animals face LEFT by default. To face right we mirror them, and an
// animal always travels in the direction it faces.
const Critter = ({ emoji, bottomVh, duration, delay, faceRight }) => (
  <motion.div
    className="absolute"
    style={{ bottom: `${bottomVh}vh`, left: 0 }}
    initial={{ x: faceRight ? "-22vw" : "122vw" }}
    animate={{ x: faceRight ? "122vw" : "-22vw" }}
    transition={{ duration, delay, ease: "linear" }}
  >
    <motion.div
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        fontSize: 66,
        lineHeight: 1,
        transform: faceRight ? "scaleX(-1)" : "none",
      }}
    >
      {emoji}
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
      faceRight: i % 2 === 0,
    }));
  } else {
    critters = [
      {
        emoji: pick(ANIMALS),
        bottomVh: 8 + Math.random() * 12,
        duration: 4.5,
        delay: 0,
        faceRight: Math.random() > 0.5,
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
