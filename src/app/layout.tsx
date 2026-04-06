import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SkipToContent } from "@/components/layout/SkipToContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hein Htet Ko | Full Stack Web Developer",
  description:
    "Portfolio of Hein Htet Ko — full stack web developer building modern, scalable web applications.",
};

const themeScript = `
(() => {
  try {
    const root = document.documentElement;
    root.dataset.theme = "dark";
    localStorage.removeItem("theme");
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SkipToContent />
        {children}
      </body>
    </html>
  );
}
