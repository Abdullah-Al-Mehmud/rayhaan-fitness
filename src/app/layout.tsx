import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BranchProvider } from "@/context/BranchContext";
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
  title: "Rayhan Fitness | Best Gym in Dhaka (Lalbagh, Dhanmondi, Mirpur)",
  description:
    "Join Rayhan Fitness across Dhaka. Premium imported equipment, national champion trainers, dedicated female workout hours, and structured personal training programs.",
  keywords: [
    "rayhan fitness",
    "best gym in dhaka",
    "gym lalbagh",
    "gym dhanmondi",
    "gym mirpur",
    "female gym dhaka",
    "bodybuilding dhaka",
    "personal training bangladesh",
    "fitness bangladesh",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">
        <BranchProvider>{children}</BranchProvider>
      </body>
    </html>
  );
}
