import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Portfolio SISR — Sean Fritsch",
  description: "Systèmes • Réseaux • Cybersécurité — preuves à l’appui.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="scanlines" />
        <Navbar />
        <main className="container" style={{ padding: "28px 0 60px" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
