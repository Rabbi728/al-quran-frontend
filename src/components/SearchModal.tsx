"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSettingsStore } from '@/store/useSettingsStore';
import { getArabicFontClass } from '@/app/fonts';

interface SearchResult {
    chapter: number;
    verse: number;
    text: string;
    translation: string;
    transliteration: string;
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const { arabicFont } = useSettingsStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const arabicFontClass = getArabicFontClass(arabicFont);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                if (data.success) {
                    setResults(data.data);
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-start justify-center pt-20 px-4 sm:px-6">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
            
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 relative">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a word or verse (e.g. Allah)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none focus:ring-4 focus:ring-emerald-500/10 text-lg"
                    />
                    <svg className="absolute left-10 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    
                    <button onClick={onClose} className="absolute right-10 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {loading && (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
                        </div>
                    )}

                    {!loading && results.length > 0 && results.map((result, idx) => (
                        <Link 
                            key={idx} 
                            href={`/surah/${result.chapter}#verse-${result.verse}`}
                            onClick={onClose}
                            className="block p-6 hover:bg-slate-50 border border-transparent hover:border-emerald-100 rounded-2xl transition-all group"
                        >
                            <div className="flex justify-between items-start gap-6">
                                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-lg border border-emerald-100 shrink-0">
                                    {result.chapter}:{result.verse}
                                </span>
                                <p className={`text-right text-slate-900 leading-relaxed ${arabicFontClass} text-2xl`}>
                                    {result.text}
                                </p>
                            </div>
                            <div className="mt-4 space-y-1">
                                <p className="text-emerald-700 italic text-sm font-medium">{result.transliteration}</p>
                                <p className="text-slate-600 text-sm leading-relaxed">{result.translation}</p>
                            </div>
                        </Link>
                    ))}

                    {!loading && query && results.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 font-medium">No results found for "{query}"</p>
                        </div>
                    )}

                    {!query && (
                        <div className="text-center py-20">
                            <p className="text-slate-400 font-medium">Type something to search the Quran...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
