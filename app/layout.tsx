import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Portfolio SISR \u2014 Sean Fritsch",
  description:
    "Syst\u00e8mes \u2022 R\u00e9seaux \u2022 Cybers\u00e9curit\u00e9 \u2014 preuves \u00e0 l\u2019appui.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <div className="scanlines" />
        <Navbar />
        <main className="mx-auto w-full max-w-[1100px] px-5 py-10 md:py-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
