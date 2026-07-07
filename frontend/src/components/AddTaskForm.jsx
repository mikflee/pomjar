import { useState } from "react";
import { Plus } from "lucide-react";
import { CATEGORIES, CATEGORY_ORDER } from "../lib/store";
import { PomIcon } from "./PomIcon";

export const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("joy");
  const [destination, setDestination] = useState("today");

  const submit = (e) => {
    e.preventDefault();
    const name = title.trim();
    if (!name) return;
    onAdd({ title: name, category, destination });
    setTitle("");
  };

  const selectCls =
    "pj-select w-full rounded-lg border border-[#EAE3D5] bg-[#F4EFE6] px-3 py-2.5 text-[#3F332D] outline-none focus:border-[#3F332D] transition-colors appearance-none cursor-pointer";

  return (
    <form onSubmit={submit} data-testid="add-task-form" className="space-y-4">
      <input
        data-testid="task-name-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task"
        className="w-full bg-transparent border-b-2 border-[#EAE3D5] focus:border-[#3F332D] outline-none py-2 text-lg text-[#3F332D] placeholder:text-[#8A7E78] transition-colors"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="pj-label text-[#8A7E78]">Category</label>
          <div className="relative mt-1.5 flex items-center gap-2">
            <PomIcon category={category} size={18} />
            <select
              data-testid="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectCls}
            >
              {CATEGORY_ORDER.map((c) => (
                <option key={c} value={c}>
                  {CATEGORIES[c].name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="pj-label text-[#8A7E78]">Destination</label>
          <select
            data-testid="destination-select"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={`${selectCls} mt-1.5`}
          >
            <option value="today">Today</option>
            <option value="drawer">Task Drawer</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        data-testid="add-task-button"
        className="flex items-center justify-center gap-2 w-full bg-[#3F332D] text-[#FDFBF7] hover:bg-[#2a221d] rounded-lg px-4 py-2.5 font-medium transition-all active:scale-[0.98]"
      >
        <Plus size={18} /> Add task
      </button>
    </form>
  );
};
