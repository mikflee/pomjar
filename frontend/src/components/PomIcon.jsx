import { CATEGORIES } from "../lib/store";

export const PomIcon = ({ category, size = 16, className = "" }) => (
  <span
    data-testid={`pom-icon-${category}`}
    aria-label={CATEGORIES[category].name}
    title={CATEGORIES[category].name}
    className={`inline-block rounded-full shrink-0 ${className}`}
    style={{
      width: size,
      height: size,
      background: CATEGORIES[category].gradient,
      boxShadow:
        "0 1px 2px rgba(0,0,0,0.35), inset 0 1px 1.5px rgba(255,255,255,0.45)",
    }}
  />
);
