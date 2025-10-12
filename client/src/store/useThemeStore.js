import {create} from "zustand" 

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("convofy-theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("convofy-theme", theme);
        set({ theme });
    }
}))