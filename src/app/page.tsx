import HomeClient from "./HomeClient";

interface Surah {
    id: number;
    name: string;
    transliteration: string;
    translation: string;
    type: string;
    total_verses: number;
}

async function getSurahs(): Promise<Surah[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch surahs");
  }

  const result = await res.json();
  return result.success ? result.data : result;
}

export default async function Home() {
    const surahs = await getSurahs();

    return <HomeClient surahs={surahs} />;
}