import type { Metadata } from "next";
import { Outfit, Teko } from "next/font/google";
import IntroLoader from "./components/IntroLoader";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-sans',
});

const teko = Teko({
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: "CodeVoyage Hackathon",
  description: "Avengers themed hackathon website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${teko.variable} ${outfit.className}`}>
      <body>
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
