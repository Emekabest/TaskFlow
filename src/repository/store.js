import { create } from "zustand";


// Stores the app's global theme mode for light/dark switching.
const useThemeStore = create((set) => ({
  isDark: false,

  toggleTheme: () =>
    set((state) => ({
      isDark: !state.isDark,
    })),
}));

export default useThemeStore;