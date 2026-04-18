import type { Metadata } from "next";
import "./globals.css";
import SettingsSidebar from "@/components/SettingsSidebar";

export const metadata: Metadata = {
  title: "Al-Quran Al-Kareem",
  description: "A professional and clean Quran reading experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-slate-50">
        {children}
        <SettingsSidebar />
      </body>
    </html>
  );
}
