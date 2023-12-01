import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RootStore {
  page: string;
  setPage: (page: string) => void;
  name: string | null;
  setName: (name: string) => void;
}

export const useStore = create(
  persist<RootStore>(
    (set) => ({
      page: "present",
      setPage: (page) => set({ page }),
      name: null,
      setName: (name) => set({ name }),
    }),
    {
      name: "root-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
