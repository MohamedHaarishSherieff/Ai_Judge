import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Judge — Virtual Courtroom Platform",
  description: "Advanced AI-powered virtual courtroom and legal simulation platform for Indian jurisprudence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body 
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#000000] text-zinc-100 selection:bg-white selection:text-black antialiased"
      >
        {children}
      </body>
    </html>
  );
}
