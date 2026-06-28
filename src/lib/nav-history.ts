import { create } from "zustand";

type NavState = {
  previousPath: string;
  previousLabel: string;
  setPrevious: (path: string, label: string) => void;
};

const labelFromPath = (path: string): string => {
  if (path.startsWith("/home")) return "Home";
  if (path.startsWith("/category")) return "Category";
  if (path.startsWith("/my-learning")) return "My Learning";
  if (path.startsWith("/profile")) return "Profile";
  if (path.includes("/cards/")) return "Knowledge";
  if (path.includes("/modules/")) return "Modules";
  return "Home";
};

export const useNavHistory = create<NavState>((set) => ({
  previousPath: "/home",
  previousLabel: "Home",
  setPrevious: (path, label) => set({ previousPath: path, previousLabel: label || labelFromPath(path) }),
}));

export { labelFromPath };
