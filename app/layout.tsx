import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OnChain Studio - Creative Video Production",
  description: "Bringing creativity onchain. We create cinematic founder stories, podcast productions, event glimpses, explainers, and social-first content that drives engagement.",
  icons: {
    icon: '/IMG_6276.PNG',
    shortcut: '/IMG_6276.PNG',
    apple: '/IMG_6276.PNG',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
