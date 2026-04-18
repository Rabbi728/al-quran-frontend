import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ArabicFont } from "@/app/fonts";

interface SettingsState {
    arabicFont: ArabicFont;
    arabicFontSize: number;
    translationFontSize: number;
    transliterationFontSize: number;
    isSidebarOpen: boolean;
    updateSettings: (settings: Partial<Omit<SettingsState, "isSidebarOpen" | "updateSettings" | "toggleSidebar">>) => void;
    toggleSidebar: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            arabicFont: "amiri",
            arabicFontSize: 40,
            translationFontSize: 18,
            transliterationFontSize: 14,
            isSidebarOpen: false,
            surahList: [],
            updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        }),
        {
            name: "quran-settings",
            partialize: (state) => ({
                arabicFont: state.arabicFont,
                arabicFontSize: state.arabicFontSize,
                translationFontSize: state.translationFontSize,
                transliterationFontSize: state.transliterationFontSize,
            }),
        }
    )
);
