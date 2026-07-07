import { AnimatePresence, motion } from "framer-motion";

export const Celebration = ({ data, onClose }) => (
  <AnimatePresence>
    {data && (
      <motion.div
        data-testid="celebration-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        style={{ background: "rgba(0,0,0,0.7)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          data-testid="celebration-card"
          className="max-w-sm w-full rounded-2xl bg-[#FDFBF7] border border-[#EAE3D5] shadow-2xl p-8 text-center"
          style={{ boxShadow: "0 0 60px rgba(217,119,6,0.5)" }}
        >
          <div
            className="mx-auto mb-5 h-16 w-16 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 28%, #FDE047 0%, #EAB308 55%, #A16207 100%)",
              boxShadow: "0 0 30px rgba(217,119,6,0.6)",
            }}
          />
          <h2 className="font-serif-cozy text-3xl text-[#3F332D]">
            You filled your jar.
          </h2>
          {data.reward ? (
            <p className="mt-4 text-lg text-[#3F332D]">
              <span className="pj-label text-[#8A7E78] block mb-1">
                Your Reward
              </span>
              <span className="font-serif-cozy text-2xl">{data.reward}</span>
            </p>
          ) : (
            <p className="mt-4 text-[#8A7E78] italic">
              No reward was set this time.
            </p>
          )}
          <button
            type="button"
            data-testid="celebration-close"
            onClick={onClose}
            className="mt-7 w-full bg-[#3F332D] text-[#FDFBF7] hover:bg-[#2a221d] rounded-lg px-4 py-2.5 font-medium transition-all active:scale-[0.98]"
          >
            Start a fresh jar
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
