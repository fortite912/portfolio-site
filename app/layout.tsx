import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Sean Fritsch — Portfolio SISR",
  description:
    "Systèmes • Réseaux • Cybersécurité — labs documentés avec preuves vérifiables.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <div className="dot-grid" />
        <div className="ambient-glow" />
        <Navbar />
        <main className="relative z-10 mx-auto w-full max-w-[1120px] px-5 py-10 md:py-16 flex-1 page-enter">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
