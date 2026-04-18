"use client";

import { useSettingsStore } from "@/store/useSettingsStore";

export default function SettingsSidebar() {
    const { arabicFont, arabicFontSize, translationFontSize, transliterationFontSize, isSidebarOpen, updateSettings, toggleSidebar } = useSettingsStore();

    if (!isSidebarOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">

            <div
                className="absolute inset-0 bg-slate-900/40 transition-opacity"
                onClick={toggleSidebar}
            />

            <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Display Settings</h2>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-10">

                    <div>
                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 font-sans">
                            Arabic Font
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { id: "amiri", name: "Amiri" },
                                { id: "scheherazade", name: "Scheherazade" },
                                { id: "changa", name: "Changa" },
                            ].map((font) => (
                                <button
                                    key={font.id}
                                    onClick={() => updateSettings({ arabicFont: font.id as any })}
                                    className={`px-4 py-3 rounded-xl border text-left transition-all ${arabicFont === font.id
                                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold shadow-sm"
                                            : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400"
                                        }`}
                                >
                                    {font.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex justify-between font-sans">
                            Arabic Size <span>{arabicFontSize}px</span>
                        </label>
                        <input
                            type="range"
                            min="24"
                            max="64"
                            value={arabicFontSize}
                            onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                            className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex justify-between font-sans">
                            Transliteration Size <span>{transliterationFontSize}px</span>
                        </label>
                        <input
                            type="range"
                            min="12"
                            max="32"
                            value={transliterationFontSize}
                            onChange={(e) => updateSettings({ transliterationFontSize: parseInt(e.target.value) })}
                            className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex justify-between font-sans">
                            Translation Size <span>{translationFontSize}px</span>
                        </label>
                        <input
                            type="range"
                            min="12"
                            max="32"
                            value={translationFontSize}
                            onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
                            className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>

                </div>

                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => updateSettings({ arabicFont: 'amiri', arabicFontSize: 40, translationFontSize: 18, transliterationFontSize: 14 })}
                        className="w-full py-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium text-sm transition-colors font-sans"
                    >
                        Reset to default
                    </button>
                </div>
            </div>
        </div>
    );
}
