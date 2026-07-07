import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, ArrowUpCircle, Trash2 } from "lucide-react";
import { CATEGORIES, CATEGORY_ORDER } from "../lib/store";
import { PomIcon } from "./PomIcon";

export const TaskDrawer = ({ drawer, onAddToToday, onDelete }) => {
  const [open, setOpen] = useState(true);

  return (
    <div data-testid="task-drawer" className="pj-drawer rounded-2xl overflow-hidden">
      <button
        type="button"
        data-testid="drawer-toggle"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-5 py-4 text-left"
      >
        <span className="flex items-center gap-3">
          <span className="pj-handle" />
          <span className="font-serif-cozy text-2xl text-[#3F332D]">
            Task Drawer
          </span>
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
            key="drawer-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 space-y-6">
              {CATEGORY_ORDER.map((cat) => {
                const items = drawer
                  .filter((d) => d.category === cat)
                  .sort((a, b) => a.title.localeCompare(b.title));
                return (
                  <div key={cat} data-testid={`drawer-group-${cat}`}>
                    <div className="flex items-center gap-2 mb-2 pb-1.5 border-b-2 border-[#EAE3D5]">
                      <PomIcon category={cat} size={14} />
                      <h3 className="pj-label text-[#8A7E78]">
                        {CATEGORIES[cat].name}
                      </h3>
                    </div>
                    {items.length === 0 ? (
                      <p className="text-sm text-[#b8aca4] italic py-1">Empty</p>
                    ) : (
                      items.map((task) => (
                        <div
                          key={task.id}
                          data-testid={`drawer-task-${task.id}`}
                          className="group flex items-center gap-3 py-2 hover:bg-[#F4EFE6] rounded-lg px-2 -mx-2 transition-colors"
                        >
                          <span className="flex-1 text-[#3F332D] truncate">
                            {task.title}
                          </span>
                          <button
                            type="button"
                            data-testid={`drawer-add-today-${task.id}`}
                            title="Add to Today"
                            onClick={() => onAddToToday(task)}
                            className="text-[#8A7E78] hover:text-[#4D7C0F] p-1.5 rounded-md hover:bg-[#EAE3D5] transition-colors"
                          >
                            <ArrowUpCircle size={18} />
                          </button>
                          <button
                            type="button"
                            data-testid={`drawer-delete-${task.id}`}
                            title="Delete"
                            onClick={() => onDelete(task.id)}
                            className="text-[#8A7E78] hover:text-[#BE123C] p-1.5 rounded-md hover:bg-[#EAE3D5] transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
