"use client";

import React from "react";
import Link from "next/link";
import { useSettingsStore } from "@/store/useSettingsStore";
import { getArabicFontClass } from "@/app/fonts";
import SearchModal from "@/components/SearchModal";

interface Surah {
    id: number;
    name: string;
    transliteration: string;
    translation: string;
    type: string;
    total_verses: number;
}

export default function HomeClient({ surahs }: { surahs: Surah[] }) {
    const { toggleSidebar, arabicFont } = useSettingsStore();
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const arabicFontClass = getArabicFontClass(arabicFont);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <div className="bg-emerald-600 text-white py-14 px-6 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4 pointer-events-none font-amiri">
                    <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                    </svg>
                </div>

                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">Quran Kareem</h1>
                        <p className="text-emerald-100 opacity-90 text-lg font-medium">Your personal digital Quran companion</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 transition-all group"
                            title="Global Search"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button
                            onClick={toggleSidebar}
                            className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 transition-all group"
                        >
                            <svg className="h-6 w-6 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {surahs.map((surah) => (
                        <Link
                            key={surah.id}
                            href={`/surah/${surah.id}`}
                            className="group bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex items-center justify-between overflow-hidden relative"
                        >
                            <div className="flex items-center gap-5 relative z-10 font-sans">
                                <div className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 font-bold rounded-2xl border border-slate-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300">
                                    {surah.id}
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-lg">{surah.transliteration}</h2>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{surah.translation}</p>
                                </div>
                            </div>
                            <div className="text-right relative z-10">
                                <div className={`text-2xl text-slate-800 mb-1 group-hover:scale-110 transition-transform origin-right duration-500 ${arabicFontClass}`}>{surah.name}</div>
                                <div className="text-[10px] text-emerald-600/60 font-bold tracking-tighter font-sans">{surah.total_verses} VERSES</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <footer className="py-20 border-t border-slate-100 text-center bg-white mt-12 font-sans">
                <div className="text-3xl font-extrabold text-emerald-600 mb-2 tracking-tighter">Quran Kareem</div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.4em]">Read • Learn • Reflect</p>
            </footer>

            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </div>
    );
}
