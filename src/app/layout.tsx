import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { StatusBar } from "@/components/layout/status-bar";
import { MotionProvider } from "@/lib/motion-provider";
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
  title: "Aryan Mehta — Software Engineer",
  description:
    "Terminal portfolio of Aryan Mehta, Software Engineering Honours student at USask.",
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
