import { motion } from "framer-motion";
import { CATEGORIES, CATEGORY_ORDER, GOAL } from "../lib/store";

// Fixed-grid jar: every pom is permanently assigned a column, so poms only
// ever move vertically (never horizontally). Columns are sorted by category
// with the greatest global category at the bottom -> stratified bands.
const PERROW = 9;
const POM = 26;
const STEP = 29; // pom + gap
const OFF_X = 15;
const OFF_Y = 12;

const yFor = (row) => -(OFF_Y + row * STEP);

export const Jar = ({ poms, landingPomId, glow }) => {
  const counts = {};
  CATEGORY_ORDER.forEach((c) => (counts[c] = 0));
  poms.forEach((p) => (counts[p.category] += 1));

  // Greatest global count first -> sits at the bottom of every column.
  const globalOrder = [...CATEGORY_ORDER].sort(
    (a, b) =>
      counts[b] - counts[a] ||
      CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b),
  );

  // Bucket poms into permanent columns by insertion order.
  const cols = Array.from({ length: PERROW }, () => []);
  poms.forEach((p, i) => cols[i % PERROW].push(p));

  const placed = [];
  cols.forEach((colPoms, col) => {
    const sorted = [...colPoms].sort(
      (a, b) =>
        globalOrder.indexOf(a.category) - globalOrder.indexOf(b.category),
    );
    const topRow = sorted.length - 1;
    sorted.forEach((p, row) => {
      placed.push({ ...p, col, row, topRow });
    });
  });

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
          const finalY = yFor(p.row);
          const topY = yFor(p.topRow);
          return (
            <motion.span
              key={p.id}
              initial={isLanding ? { opacity: 0 } : false}
              animate={
                isLanding
                  ? { y: [-372, topY, finalY], opacity: [0, 1, 1] }
                  : { y: finalY, opacity: 1 }
              }
              transition={
                isLanding
                  ? {
                      y: { duration: 1.5, times: [0, 0.5, 1], ease: "easeInOut" },
                      opacity: { duration: 0.3 },
                    }
                  : { y: { type: "spring", stiffness: 220, damping: 26, delay: 0.55 } }
              }
              className="rounded-full"
              style={{
                position: "absolute",
                left: OFF_X + p.col * STEP,
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
