import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { ConsentBanner } from "@/components/ConsentBanner";
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
  metadataBase: new URL("https://www.trump-countdown-timer.com"),
  title: "Trump Presidency Countdown",
  description:
    "Live countdown to the end of Donald Trump's second term — noon Eastern, January 20, 2029.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Trump Presidency Countdown",
    title: "Trump Presidency Countdown",
    description:
      "Live countdown to the end of Donald Trump's second term — noon Eastern, January 20, 2029.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trump Presidency Countdown",
    description:
      "Live countdown to the end of Donald Trump's second term — noon Eastern, January 20, 2029.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
