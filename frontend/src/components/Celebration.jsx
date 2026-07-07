import { AnimatePresence, motion } from "framer-motion";

export const Celebration = ({ data, onPlaceOnShelf, onNotYet }) => (
  <AnimatePresence>
    {data && (
      <motion.div
        data-testid="celebration-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        style={{ background: "rgba(0,0,0,0.55)" }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.15 }}
          data-testid="celebration-card"
          className="max-w-sm w-full rounded-2xl bg-[#FDFBF7] border border-[#EAE3D5] shadow-2xl p-8 text-center"
          style={{ boxShadow: "0 0 60px rgba(217,119,6,0.5)" }}
        >
          <h2 className="font-serif-cozy text-3xl text-[#3F332D]">
            You filled your jar.
          </h2>
          {data.reward ? (
            <p className="mt-5">
              <span className="pj-label text-[#8A7E78] block mb-1">
                Your Reward
              </span>
              <span className="font-serif-cozy text-2xl text-[#3F332D]">
                {data.reward}
              </span>
            </p>
          ) : (
            <p className="mt-5 text-[#8A7E78] italic">
              No reward was set this season.
            </p>
          )}

          <div className="mt-8 space-y-3">
            <button
              type="button"
              data-testid="place-on-shelf-button"
              onClick={onPlaceOnShelf}
              className="w-full bg-[#3F332D] text-[#FDFBF7] hover:bg-[#2a221d] rounded-lg px-4 py-2.5 font-medium transition-all active:scale-[0.98]"
            >
              Place on Shelf
            </button>
            <button
              type="button"
              data-testid="not-yet-button"
              onClick={onNotYet}
              className="w-full bg-transparent text-[#8A7E78] hover:text-[#3F332D] rounded-lg px-4 py-2 font-medium transition-colors"
            >
              Not yet — let me enjoy it
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
