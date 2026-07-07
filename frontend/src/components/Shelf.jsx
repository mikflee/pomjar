export const Shelf = ({ jars }) => {
  if (!jars.length) return null;
  return (
    <div data-testid="shelf" className="mt-10">
      <p className="pj-label text-white/50 mb-3 text-center">
        Filled Jars · {jars.length}
      </p>
      <div className="flex flex-wrap items-end justify-center gap-4">
        {jars.map((jar) => (
          <div
            key={jar.id}
            data-testid={`shelf-jar-${jar.id}`}
            title={jar.reward ? `Reward: ${jar.reward}` : "No reward set"}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className="h-12 w-9 rounded-b-lg rounded-t-sm pj-jar relative overflow-hidden"
              style={{ borderRadius: "3px 3px 8px 8px" }}
            >
              <div
                className="absolute inset-x-0 bottom-0 top-1.5"
                style={{
                  background:
                    "radial-gradient(circle at 30% 28%, #FDE047 0%, #EAB308 45%, #BE123C 100%)",
                  opacity: 0.85,
                }}
              />
            </div>
            <span className="text-[11px] text-white/45 max-w-[70px] truncate">
              {jar.reward || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
