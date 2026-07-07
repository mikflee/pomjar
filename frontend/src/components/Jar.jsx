import { motion } from "framer-motion";
import { CATEGORIES, CATEGORY_ORDER, GOAL } from "../lib/store";

// Gravity row-fill jar: poms pack bottom-up, left-to-right, filling each row
// completely before the next row starts. Poms are ordered by category with the
// greatest category at the bottom, so rows are full of one color (red, then
// green, then yellow) with only the boundary row mixed. Existing poms never
// disappear — they smoothly roll to their slot as the pile rearranges.
const PERROW = 9;
const POM = 26;
const STEP = 29; // pom + gap
const OFF_X = 15;
const OFF_Y = 12;

export const Jar = ({ poms, landingPomId, glow }) => {
  const counts = {};
  CATEGORY_ORDER.forEach((c) => (counts[c] = 0));
  poms.forEach((p) => (counts[p.category] += 1));

  // Greatest global count first -> fills the bottom rows.
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
    x: OFF_X + (i % PERROW) * STEP,
    y: -(OFF_Y + Math.floor(i / PERROW) * STEP),
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
        className="h-4 w-48 pj-jar"
        style={{ borderRadius: "6px 6px 0 0", borderBottom: "none" }}
      />
      <div
        data-testid="jar-body"
        className={`pj-jar relative overflow-hidden ${glow ? "pj-jar-glow" : ""}`}
        style={{ width: 288, height: 384, borderRadius: "8px 8px 34px 34px" }}
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
              initial={
                isLanding
                  ? { x: p.x, y: -372, opacity: 0 }
                  : false
              }
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
