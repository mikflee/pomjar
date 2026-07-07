import { CATEGORIES, CATEGORY_ORDER, monthYear } from "../lib/store";

const MiniJar = ({ counts }) => {
  const total =
    (counts.joy || 0) + (counts.consistency || 0) + (counts.momentum || 0) || 1;
  // largest first -> rendered at the bottom via column-reverse
  const order = [...CATEGORY_ORDER].sort(
    (a, b) =>
      (counts[b] || 0) - (counts[a] || 0) ||
      CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b),
  );
  return (
    <div
      className="pj-jar relative overflow-hidden"
      style={{ width: 44, height: 60, borderRadius: "4px 4px 12px 12px" }}
    >
      <div className="absolute inset-[3px] flex flex-col-reverse rounded-b-[9px] overflow-hidden">
        {order.map((cat) => {
          const h = ((counts[cat] || 0) / total) * 100;
          if (h <= 0) return null;
          return (
            <div
              key={cat}
              style={{ height: `${h}%`, background: CATEGORIES[cat].gradient }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Shelf = ({ jars }) => {
  if (!jars.length) return null;
  return (
    <div data-testid="shelf" className="mt-10 w-full">
      <p className="pj-label text-white/50 mb-4 text-center">
        Your Shelf · {jars.length}
      </p>
      <div className="pj-shelf flex flex-wrap items-end justify-center gap-x-6 gap-y-5">
        {jars.map((jar) => (
          <div
            key={jar.id}
            data-testid={`shelf-jar-${jar.id}`}
            className="flex flex-col items-center gap-1.5 w-24"
          >
            <MiniJar counts={jar.counts || {}} />
            <span className="pj-label text-white/45 text-[10px]">
              {monthYear(jar.date)}
            </span>
            <span className="text-[11px] text-white/70 text-center leading-tight line-clamp-2">
              {jar.reward || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
