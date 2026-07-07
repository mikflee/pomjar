import { motion } from "framer-motion";
import { CATEGORIES, CATEGORY_ORDER, GOAL } from "../lib/store";

// Gravity row-fill jar sized so exactly GOAL (100) poms fill it — a 10x10 grid.
// Poms pack bottom-up, left-to-right, filling each row before the next. Ordered
// by category with the greatest at the bottom => full rows of one color.
const PERROW = 10;
const POM = 28;
const STEP_X = 28;
const STEP_Y = 33;
const OFF_X = 4;
const OFF_Y = 8;
const JAR_W = 288;
const JAR_H = 340;

export const Jar = ({ poms, landingPomId, glow }) => {
  const counts = {};
  CATEGORY_ORDER.forEach((c) => (counts[c] = 0));
  poms.forEach((p) => (counts[p.category] += 1));

  const globalOrder = [...CATEGORY_ORDER].sort(
    (a, b) =>
      counts[b] - counts[a] ||
      CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b),
  );

  const ordered = [];
  globalOrder.forEach((cat) =>
    poms.filter((p) => p.category === cat).forEach((p) => ordered.push(p)),
  );

  const placed = ordered.map((p, i) => ({
    id: p.id,
    category: p.category,
    x: OFF_X + (i % PERROW) * STEP_X,
    y: -(OFF_Y + Math.floor(i / PERROW) * STEP_Y),
  }));

  return (
    <div className="flex flex-col items-center" data-testid="jar-wrapper">
      <div
        className="h-3 w-40 rounded-t-md"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.08))",
          border: "1px solid rgba(255,255,255,0.25)",
          borderBottom: "none",
        }}
      />
      <div
        className="h-4 w-52 pj-jar"
        style={{ borderRadius: "6px 6px 0 0", borderBottom: "none" }}
      />
      <div
        data-testid="jar-body"
        className={`pj-jar relative overflow-hidden ${glow ? "pj-jar-glow" : ""}`}
        style={{ width: JAR_W, height: JAR_H, borderRadius: "8px 8px 30px 30px" }}
      >
        <div
          className="pointer-events-none absolute left-2 top-3 bottom-6 w-1 rounded-full z-10"
          style={{ background: "rgba(255,255,255,0.35)" }}
        />
        {placed.map((p) => {
          const isLanding = p.id === landingPomId;
          return (
            <motion.span
              key={p.id}
              initial={isLanding ? { x: p.x, y: -(JAR_H + 24), opacity: 0 } : false}
              animate={{ x: p.x, y: p.y, opacity: 1 }}
              transition={
                isLanding
                  ? {
                      y: { type: "spring", stiffness: 110, damping: 14, mass: 1 },
                      opacity: { duration: 0.25 },
                    }
                  : { type: "spring", stiffness: 240, damping: 30 }
              }
              className="rounded-full"
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: POM,
                height: POM,
                background: CATEGORIES[p.category].gradient,
                boxShadow:
                  "0 2px 4px rgba(0,0,0,0.4), inset 0 2px 3px rgba(255,255,255,0.45), inset 0 -3px 5px rgba(0,0,0,0.25)",
              }}
            />
          );
        })}
      </div>
      <p
        data-testid="jar-progress"
        className="mt-6 font-serif-cozy text-3xl text-white"
      >
        {poms.length}{" "}
        <span className="text-white/50 text-2xl">/ {GOAL} poms</span>
      </p>
    </div>
  );
};
