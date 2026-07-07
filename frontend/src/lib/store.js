import { useState, useEffect } from "react";

export const GOAL = 400;

export const CATEGORIES = {
  joy: {
    name: "Joy",
    hex: "#EAB308",
    gradient:
      "radial-gradient(circle at 30% 28%, #FDE047 0%, #EAB308 58%, #A16207 100%)",
  },
  consistency: {
    name: "Consistency",
    hex: "#4D7C0F",
    gradient:
      "radial-gradient(circle at 30% 28%, #A3E635 0%, #4D7C0F 58%, #365314 100%)",
  },
  momentum: {
    name: "Momentum",
    hex: "#BE123C",
    gradient:
      "radial-gradient(circle at 30% 28%, #FB7185 0%, #BE123C 58%, #881337 100%)",
  },
};

export const CATEGORY_ORDER = ["joy", "consistency", "momentum"];

export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const seed = (category, titles) =>
  titles.map((title) => ({ id: uid(), title, category }));

export const DEFAULT_DRAWER = [
  ...seed("momentum", [
    "Take the first step",
    "Schedule the appointment",
    "Send the email",
    "Draft the outline",
  ]),
  ...seed("joy", ["Read", "Go for a walk", "Spend time outside", "Do a hobby"]),
  ...seed("consistency", [
    "Exercise",
    "Take vitamins",
    "Wash dishes",
    "Do laundry",
  ]),
];

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);

  return [value, setValue];
}
