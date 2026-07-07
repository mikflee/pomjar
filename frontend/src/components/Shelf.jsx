import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { CATEGORY_ORDER, CATEGORIES, monthYear } from "../lib/store";

const MiniJar = ({ counts }) => {
  const total =
    (counts.joy || 0) + (counts.consistency || 0) + (counts.momentum || 0) || 1;
  const order = [...CATEGORY_ORDER].sort(
    (a, b) =>
      (counts[b] || 0) - (counts[a] || 0) ||
      CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b),
  );
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: 46,
        height: 62,
        borderRadius: "4px 4px 12px 12px",
        border: "1px solid rgba(63,51,45,0.2)",
        background: "rgba(255,255,255,0.4)",
        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.6)",
      }}
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

export const Shelf = ({ jars, onDelete }) => {
  const [open, setOpen] = useState(true);

  return (
    <div data-testid="shelf" className="pj-drawer rounded-2xl overflow-hidden">
      <button
        type="button"
        data-testid="shelf-toggle"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-5 py-4 text-left"
      >
        <span className="flex items-center gap-3">
          <span className="pj-handle" />
          <span className="font-serif-cozy text-2xl text-[#3F332D]">
            Jar Shelf
          </span>
          <span className="text-[#8A7E78] text-sm">· {jars.length}</span>
        </span>
        {open ? (
          <ChevronDown className="text-[#8A7E78]" size={22} />
        ) : (
          <ChevronRight className="text-[#8A7E78]" size={22} />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="shelf-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pt-1">
              {jars.length === 0 ? (
                <p className="text-[#8A7E78] italic py-3">
                  No filled jars yet — fill your jar to keep a keepsake here.
                </p>
              ) : (
                <div className="flex flex-wrap items-start gap-x-6 gap-y-6">
                  {jars.map((jar) => (
                    <div
                      key={jar.id}
                      data-testid={`shelf-jar-${jar.id}`}
                      className="group flex flex-col items-center gap-1.5 w-24 text-center"
                    >
                      <MiniJar counts={jar.counts || {}} />
                      <span className="pj-label text-[#8A7E78] text-[10px]">
                        {monthYear(jar.date)}
                      </span>
                      <span className="text-[11px] text-[#3F332D] leading-tight line-clamp-2">
                        {jar.reward || "—"}
                      </span>
                      <button
                        type="button"
                        data-testid={`shelf-delete-${jar.id}`}
                        title="Delete jar"
                        onClick={() => onDelete(jar.id)}
                        className="text-[#8A7E78] hover:text-[#BE123C] p-1 rounded-md hover:bg-[#EAE3D5] transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
