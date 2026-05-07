import type { Metadata, Viewport } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { StatusBar } from "@/components/layout/status-bar";
import { MotionProvider } from "@/lib/motion-provider";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { TerminalProvider } from "@/lib/terminal-context";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start-2p",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s — Aryan Mehta",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Aryan Mehta", url: "https://github.com/aryan-mht" }],
  creator: "Aryan Mehta",
  keywords: [
    "Aryan Mehta",
    "Software Engineer",
    "Software Engineering",
    "USask",
    "University of Saskatchewan",
    "Portfolio",
    "Terminal",
    "Backend",
    "Azure",
    "Boomi",
    "Next.js",
    "TypeScript",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} ${vt323.variable}`}>
        <MotionProvider>
          <TerminalProvider>
            <Navbar />
            {children}
            <StatusBar />
          </TerminalProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
