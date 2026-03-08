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
      <body>
        <div className="scanlines" />
        <Navbar />
        <main className="container" style={{ padding: "32px 0 64px" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
