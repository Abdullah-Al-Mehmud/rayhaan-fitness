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
  title: "Rayhaan Fitness | রায়হান ফিটনেস — Best Gym in Lalbag, Dhaka",
  description: "One of the best affordable gyms in Puran Dhaka. Modern equipment, expert trainers, sauna & steam, female hours, yoga & zumba. Located at 21/c Nur Fattah Lane, Lalbag. 4.6 ★ from 1,002 reviews.",
  keywords: ["rayhaan fitness", "gym in lalbag dhaka", "puran dhaka gym", "affordable gym dhaka", "fitness bangladesh", "sauna steam gym dhaka", "female gym dhaka", "yoga zumba dhaka", "personal training bangladesh", "workout"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
