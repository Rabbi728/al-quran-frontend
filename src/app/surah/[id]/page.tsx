import Link from "next/link";
import Ayats from "./Ayats";

export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs`);
    const surahs = await res.json();
    return surahs.data.map((surah: any) => ({
        id: String(surah.id),
    }));
}

async function getSurahData(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs/${id}/ayats`);
    const result = await response.json();
    return result.success ? result.data : null;
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const surahData = await getSurahData(id);

    if (!surahData) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
                <div className="text-red-500 font-bold text-xl">Surah not found</div>
                <Link href="/" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    Back to Home
                </Link>
            </div>
        );
    }

    return <Ayats surahData={surahData} id={id} />;
}