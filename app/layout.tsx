import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400","700"] });
const dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing", weight: ["600","700"] });
const lato = Lato({ subsets: ["latin"], variable: "--font-lato", weight: ["300","400","700"] });

export const metadata: Metadata = {
  title: "creatuimagen.online",
  description: "Plataforma de presencia digital",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${dancing.variable} ${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
