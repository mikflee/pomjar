import { motion } from "framer-motion";
import { CATEGORIES, CATEGORY_ORDER, GOAL } from "../lib/store";

const POM = 12;

export const Jar = ({ poms, lastPomId, glow }) => {
  const counts = {};
  CATEGORY_ORDER.forEach((c) => (counts[c] = 0));
  poms.forEach((p) => (counts[p.category] += 1));

  // Least-represented category first (renders at top), greatest last (bottom).
  const layerOrder = [...CATEGORY_ORDER].sort(
    (a, b) =>
      counts[a] - counts[b] ||
      CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b),
  );

  const ordered = [];
  layerOrder.forEach((cat) =>
    poms.filter((p) => p.category === cat).forEach((p) => ordered.push(p)),
  );

  return (
    <div className="flex flex-col items-center" data-testid="jar-wrapper">
      {/* Lid / rim */}
      <div
        className="h-3 w-40 rounded-t-md"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.08))",
          border: "1px solid rgba(255,255,255,0.25)",
          borderBottom: "none",
        }}
      />
      {/* Neck */}
      <div
        className="h-4 w-48 pj-jar"
        style={{ borderRadius: "6px 6px 0 0", borderBottom: "none" }}
      />
      {/* Body */}
      <div
        data-testid="jar-body"
        className={`pj-jar relative overflow-hidden ${glow ? "pj-jar-glow" : ""}`}
        style={{
          width: 288,
          height: 384,
          borderRadius: "8px 8px 34px 34px",
        }}
      >
        {/* left glass highlight */}
        <div
          className="pointer-events-none absolute left-2 top-3 bottom-6 w-1 rounded-full z-10"
          style={{ background: "rgba(255,255,255,0.35)" }}
        />
        <div
          className="absolute inset-0 flex p-3"
          style={{
            flexWrap: "wrap",
            alignItems: "flex-end",
            alignContent: "flex-end",
            justifyContent: "center",
            gap: "3px",
          }}
        >
          {ordered.map((p) => {
            const isNew = p.id === lastPomId;
            return (
              <motion.span
                key={p.id}
                initial={isNew ? { y: -320, opacity: 0 } : false}
                animate={{ y: 0, opacity: 1 }}
                transition={
                  isNew
                    ? { type: "spring", stiffness: 140, damping: 13, mass: 0.9 }
                    : { duration: 0 }
                }
                className="rounded-full"
                style={{
                  width: POM,
                  height: POM,
                  background: CATEGORIES[p.category].gradient,
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.4), inset 0 1px 1.5px rgba(255,255,255,0.45)",
                }}
              />
            );
          })}
        </div>
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
