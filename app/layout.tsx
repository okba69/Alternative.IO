import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UseInstead — Trouve une meilleure alternative",
  description:
    "UseInstead compare les outils payants avec des alternatives gratuites, open source ou freemium. Catalogue, requests et contributions communautaires.",
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
