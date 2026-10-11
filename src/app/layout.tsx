import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://www.rayhanfitnessbd.com";

export const viewport: Viewport = {
  themeColor: "#0F0D0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rayhan Fitness | Best Gym in Dhaka (Lalbagh, Dhanmondi, Mirpur)",
  description:
    "Join Rayhan Fitness across Dhaka. Premium imported equipment, national champion trainers, dedicated female workout hours, and structured personal training programs.",
  applicationName: "Rayhan Fitness",
  category: "fitness",
  alternates: {
    canonical: "/",
  },
  // File-convention icons (app/favicon.ico, app/icon.png, app/apple-icon.png)
  // also generate the correct <link> tags automatically. These explicit
  // entries use Google-compliant square assets (multiples of 48px) with
  // stable URLs so Google Search can pick up the favicon.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rayhan Fitness",
    title: "Rayhan Fitness | Best Gym in Dhaka (Lalbagh, Dhanmondi, Mirpur)",
    description:
      "Join Rayhan Fitness across Dhaka. Premium imported equipment, national champion trainers, dedicated female workout hours, and structured personal training programs.",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "Rayhan Fitness logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Rayhan Fitness | Best Gym in Dhaka (Lalbagh, Dhanmondi, Mirpur)",
    description:
      "Join Rayhan Fitness across Dhaka. Premium imported equipment, national champion trainers, dedicated female workout hours, and structured personal training programs.",
    images: ["/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
