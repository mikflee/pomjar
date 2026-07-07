import { useEffect, useState } from "react";
import "@/App.css";
import {
  GOAL,
  DEFAULT_DRAWER,
  useLocalStorage,
  uid,
  countByCategory,
} from "@/lib/store";
import { Jar } from "@/components/Jar";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TodayList } from "@/components/TodayList";
import { TaskDrawer } from "@/components/TaskDrawer";
import { Celebration } from "@/components/Celebration";
import { Shelf } from "@/components/Shelf";
import { WoodlandCheer } from "@/components/WoodlandCheer";

function App() {
  const [tasks, setTasks] = useLocalStorage("pomjar_tasks", []);
  const [drawer, setDrawer] = useLocalStorage("pomjar_drawer", DEFAULT_DRAWER);
  const [poms, setPoms] = useLocalStorage("pomjar_poms", []);
  const [reward, setReward] = useLocalStorage("pomjar_reward", "");
  const [shelf, setShelf] = useLocalStorage("pomjar_shelf", []);

  const [lastPomId, setLastPomId] = useState(null);
  const [celebration, setCelebration] = useState(null);
  const [jarFull, setJarFull] = useState(false);
  const [cheer, setCheer] = useState(null);

  // Reaching the goal: glow + woodland parade, then the reward card.
  // The jar is NOT auto-emptied — the user chooses when to shelve it.
  useEffect(() => {
    if (poms.length >= GOAL && !jarFull) {
      setJarFull(true);
      setCheer({ id: uid(), mode: "parade" });
      const t = setTimeout(
        () => setCelebration({ reward }),
        1600,
      );
      return () => clearTimeout(t);
    }
  }, [poms.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-clear a running cheer.
  useEffect(() => {
    if (!cheer) return;
    const dur = cheer.mode === "parade" ? 9000 : 5500;
    const t = setTimeout(() => setCheer(null), dur);
    return () => clearTimeout(t);
  }, [cheer]);

  const addTask = ({ title, category, destination }) => {
    if (destination === "today" || destination === "both") {
      setTasks((t) => [...t, { id: uid(), title, category }]);
    }
    if (destination === "drawer" || destination === "both") {
      setDrawer((d) => [...d, { id: uid(), title, category }]);
    }
  };

  const completeTask = (task) => {
    setTasks((t) => t.filter((x) => x.id !== task.id));
    if (poms.length >= GOAL) return; // jar is full, awaiting shelving
    const pomId = uid();
    setLastPomId(pomId);
    setPoms((p) => [...p, { id: pomId, category: task.category }]);
    if (Math.random() < 0.18) setCheer({ id: uid(), mode: "single" });
  };

  const deleteTask = (id) => setTasks((t) => t.filter((x) => x.id !== id));

  const renameTask = (id, title) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, title } : x)));

  const dupe = (list, task) =>
    list.some(
      (x) =>
        x.title.toLowerCase() === task.title.toLowerCase() &&
        x.category === task.category,
    );

  const saveToDrawer = (task) => {
    setDrawer((d) =>
      dupe(d, task)
        ? d
        : [...d, { id: uid(), title: task.title, category: task.category }],
    );
  };

  const addToToday = (task) => {
    setTasks((t) =>
      dupe(t, task)
        ? t
        : [...t, { id: uid(), title: task.title, category: task.category }],
    );
  };

  const deleteDrawer = (id) => setDrawer((d) => d.filter((x) => x.id !== id));

  const placeOnShelf = () => {
    setShelf((s) => [
      ...s,
      { id: uid(), reward, date: Date.now(), counts: countByCategory(poms) },
    ]);
    setPoms([]);
    setReward("");
    setLastPomId(null);
    setJarFull(false);
    setCelebration(null);
  };

  const notYet = () => setCelebration(null);

  return (
    <div className="pj-bg">
      <div className="pj-content mx-auto max-w-6xl px-5 py-10 md:py-14">
        <header className="text-center mb-10 md:mb-14">
          <h1
            data-testid="app-title"
            className="font-serif-cozy text-6xl sm:text-7xl md:text-8xl text-white"
            style={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 24px rgba(217,119,6,0.35)",
            }}
          >
            Pom Jar
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-14 items-start">
          {/* Jar side */}
          <section className="md:col-span-5 flex flex-col items-center">
            <Jar poms={poms} lastPomId={lastPomId} glow={jarFull} />

            {jarFull && !celebration && (
              <button
                type="button"
                data-testid="shelf-jar-cta"
                onClick={() => setCelebration({ reward })}
                className="mt-5 rounded-full border border-white/25 bg-white/5 px-5 py-2 text-sm text-white/85 hover:bg-white/10 transition-colors"
              >
                Place this jar on the shelf
              </button>
            )}

            <div className="mt-8 w-full max-w-xs">
              <label className="pj-label text-white/50 block text-center mb-2">
                Your Reward
              </label>
              <input
                data-testid="reward-input"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="What will you earn?"
                className="text-center bg-transparent border-b border-white/25 text-white/90 text-xl font-serif-cozy py-2 w-full focus:border-white/60 outline-none placeholder:text-white/30 transition-colors"
              />
            </div>
            <Shelf jars={shelf} />
          </section>

          {/* Panels side */}
          <section className="md:col-span-7 space-y-8">
            <div className="pj-panel">
              <h2 className="font-serif-cozy text-2xl text-[#3F332D] mb-4">
                Add a task
              </h2>
              <AddTaskForm onAdd={addTask} />
            </div>

            <div className="pj-panel">
              <h2 className="font-serif-cozy text-2xl text-[#3F332D] mb-2">
                Today
              </h2>
              <TodayList
                tasks={tasks}
                onComplete={completeTask}
                onDelete={deleteTask}
                onRename={renameTask}
                onSaveToDrawer={saveToDrawer}
              />
            </div>
          </section>
        </div>

        <div className="mt-8 md:mt-10">
          <TaskDrawer
            drawer={drawer}
            onAddToToday={addToToday}
            onDelete={deleteDrawer}
          />
        </div>
      </div>

      <WoodlandCheer cheer={cheer} />
      <Celebration
        data={celebration}
        onPlaceOnShelf={placeOnShelf}
        onNotYet={notYet}
      />
    </div>
  );
}

export default App;
