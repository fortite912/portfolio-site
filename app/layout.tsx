import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CursorGlow } from "@/components/cursor-glow";
import { BackToTop } from "@/components/back-to-top";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-site-ten-pearl-61.vercel.app"),
  title: {
    default: "Sean Fritsch — Portfolio SISR",
    template: "%s | Portfolio SISR",
  },
  description:
    "Systèmes • Réseaux • Cybersécurité — labs documentés avec preuves vérifiables.",
  keywords: ["SISR", "BTS SIO", "portfolio", "systèmes", "réseaux", "cybersécurité", "Azure", "Cisco", "stage", "Sean Fritsch"],
  authors: [{ name: "Sean Fritsch" }],
  openGraph: {
    title: "Sean Fritsch — Portfolio SISR",
    description: "Systèmes • Réseaux • Cybersécurité — labs documentés avec preuves vérifiables.",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Sean Fritsch — Portfolio SISR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sean Fritsch — Portfolio SISR",
    description: "Systèmes • Réseaux • Cybersécurité — labs documentés avec preuves vérifiables.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <div className="dot-grid" />
        <div className="ambient-glow" />
        <CursorGlow />
        <Navbar />
        <main className="relative z-10 mx-auto w-full max-w-[1120px] px-5 py-10 md:py-16 flex-1 page-enter">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
