import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alternative.IO — Trouve la bonne alternative gratuite",
  description:
    "Le catalogue communautaire des vraies alternatives gratuites, freemium, open source ou auto-hébergées aux outils payants — statut tarifaire précis, limites et date de vérification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
