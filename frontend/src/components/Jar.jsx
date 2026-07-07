import { motion } from "framer-motion";
import { CATEGORIES, CATEGORY_ORDER } from "../lib/store";

// The jar body is a fixed size; the pom grid is computed from the goal so the
// jar fills completely at the goal, at any goal, with clearly visible poms.
const JAR_W = 288;
const JAR_H = 340;
const USABLE_W = 280;
const USABLE_H = 322;
const OFF_X = (JAR_W - USABLE_W) / 2;
const OFF_Y = 8;

const computeGrid = (n) => {
  const N = Math.max(1, n);
  let best = null;
  const maxC = Math.min(N, 30);
  for (let c = 1; c <= maxC; c++) {
    const r = Math.ceil(N / c);
    const stepX = USABLE_W / c;
    const stepY = USABLE_H / r;
    const cell = Math.min(stepX, stepY);
    const waste = c * r - N;
    const squareness = Math.min(stepX, stepY) / Math.max(stepX, stepY);
    const score = cell * squareness - waste * 0.6;
    if (!best || score > best.score) best = { c, r, stepX, stepY, score };
  }
  const pom = Math.max(5, Math.floor(Math.min(best.stepX, best.stepY)) - 2);
  return { perRow: best.c, stepX: best.stepX, stepY: best.stepY, pom };
};

export const Jar = ({ poms, landingPomId, glow, goal }) => {
  const capacity = Math.max(goal, poms.length, 1);
  const { perRow, stepX, stepY, pom } = computeGrid(capacity);

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

  const placed = ordered.map((p, i) => {
    const col = i % perRow;
    const row = Math.floor(i / perRow);
    return {
      id: p.id,
      category: p.category,
      x: OFF_X + col * stepX + (stepX - pom) / 2,
      y: -(OFF_Y + row * stepY + (stepY - pom) / 2),
    };
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
                width: pom,
                height: pom,
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
        <span className="text-white/50 text-2xl">/ {goal} pom poms</span>
      </p>
    </div>
  );
};
