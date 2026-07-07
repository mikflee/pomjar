import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Archive, Trash2, Check, X } from "lucide-react";
import { CATEGORY_ORDER } from "../lib/store";
import { PomIcon } from "./PomIcon";

const IconBtn = ({ children, ...props }) => (
  <button
    type="button"
    className="text-[#8A7E78] hover:text-[#3F332D] p-1.5 transition-colors rounded-md hover:bg-[#EAE3D5]"
    {...props}
  >
    {children}
  </button>
);

const Row = ({ task, onComplete, onDelete, onSaveToDrawer, onRename }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.title);

  const save = () => {
    const t = text.trim();
    if (t) onRename(task.id, t);
    else setText(task.title);
    setEditing(false);
  };

  return (
    <motion.div
      layout
      exit={{ opacity: 0, x: 24, height: 0, marginTop: 0, marginBottom: 0 }}
      transition={{ duration: 0.28 }}
      data-testid={`today-task-${task.id}`}
      className="flex items-center gap-3 py-3 border-b border-[#EAE3D5] last:border-b-0 hover:bg-[#F4EFE6] rounded-lg px-2 -mx-2 transition-colors"
    >
      <PomIcon category={task.category} size={18} />
      {editing ? (
        <input
          autoFocus
          data-testid={`edit-input-${task.id}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && save()}
          className="flex-1 bg-transparent border-b border-[#3F332D] outline-none text-[#3F332D]"
        />
      ) : (
        <span className="flex-1 text-[#3F332D] truncate">{task.title}</span>
      )}

      {editing ? (
        <>
          <IconBtn data-testid={`edit-save-${task.id}`} onClick={save}>
            <Check size={18} />
          </IconBtn>
          <IconBtn
            data-testid={`edit-cancel-${task.id}`}
            onClick={() => {
              setText(task.title);
              setEditing(false);
            }}
          >
            <X size={18} />
          </IconBtn>
        </>
      ) : (
        <>
          <IconBtn
            data-testid={`edit-task-${task.id}`}
            title="Edit"
            onClick={() => setEditing(true)}
          >
            <Pencil size={17} />
          </IconBtn>
          <IconBtn
            data-testid={`save-drawer-${task.id}`}
            title="Save to drawer"
            onClick={() => onSaveToDrawer(task)}
          >
            <Archive size={17} />
          </IconBtn>
          <IconBtn
            data-testid={`delete-task-${task.id}`}
            title="Delete"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 size={17} />
          </IconBtn>
          <button
            type="button"
            data-testid={`complete-task-${task.id}`}
            title="Complete"
            onClick={() => onComplete(task)}
            className="ml-1 flex items-center justify-center h-8 w-8 rounded-full bg-[#3F332D] text-[#FDFBF7] hover:bg-[#2a221d] transition-all active:scale-90"
          >
            <Check size={18} />
          </button>
        </>
      )}
    </motion.div>
  );
};

export const TodayList = (props) => {
  const sorted = [...props.tasks].sort(
    (a, b) =>
      CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) ||
      a.title.localeCompare(b.title),
  );

  return (
    <div data-testid="today-list">
      {sorted.length === 0 ? (
        <p className="text-[#8A7E78] py-6 text-center italic">
          No tasks yet — add one to begin filling your jar.
        </p>
      ) : (
        <AnimatePresence initial={false}>
          {sorted.map((task) => (
            <Row key={task.id} task={task} {...props} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};
