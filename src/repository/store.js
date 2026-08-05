import { create } from "zustand";
import ThemeService from "../services/ThemeService";

// Stores the app's global theme mode for light/dark switching.
const useThemeStore = create((set, get) => ({
  isDark: false,

  initializeTheme: async () => {
    const savedTheme = await ThemeService.getTheme();

    if (savedTheme === null || savedTheme === undefined) {
      await ThemeService.setTheme(String(false));
      set({ isDark: false });
      return;
    }

    const isDark = savedTheme === "true";
    set({ isDark });
  },

  toggleTheme: async (value) => {
    const nextValue = typeof value === "boolean" ? value : !get().isDark;

    set({ isDark: nextValue });
    await ThemeService.setTheme(String(nextValue));
  },
}));

export default useThemeStore;