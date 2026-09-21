import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/site";
import { CursorGlow } from "@/components/cursor-glow";
import { BackToTop } from "@/components/back-to-top";
import { SiteChrome } from "@/components/site-chrome";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Sean Fritsch — Portfolio SISR",
    template: "%s | Portfolio SISR",
  },
  description:
    "Systèmes • Réseaux • Cybersécurité — labs documentés avec preuves vérifiables.",
  keywords: ["SISR", "BTS SIO", "portfolio", "systèmes", "réseaux", "cybersécurité", "Azure", "Cisco", "stage", "CentraleSupélec", "étudiant-entrepreneur", "Soveris", "Sean Fritsch"],
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
    <html lang="fr" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <SiteChrome>
          <div className="dot-grid" />
          <div className="ambient-glow" />
          <CursorGlow />
          <Navbar />
        </SiteChrome>
        <main className="relative z-10 mx-auto w-full max-w-[1120px] px-5 py-10 md:py-16 flex-1 page-enter">
          {children}
        </main>
        <SiteChrome>
          <Footer />
          <BackToTop />
        </SiteChrome>
      </body>
    </html>
  );
}
