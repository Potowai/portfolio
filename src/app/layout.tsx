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
  title: {
    default: "Alexis Fiolleau | Creative Developer",
    template: "%s | Alexis Fiolleau"
  },
  description: "Interactive 3D portfolio featuring Bento Grid architecture, WebGL experiences, and modern web technologies. Built with Next.js 15, React Three Fiber, and Tailwind CSS.",
  keywords: ["Creative Developer", "Full Stack Engineer", "Next.js", "React Three Fiber", "Portfolio", "Web Development", "3D Web", "Alexis Fiolleau", "Frontend Developer"],
  authors: [{ name: "Alexis Fiolleau", url: "https://github.com/Potowai" }],
  creator: "Alexis Fiolleau",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexis-fiolleau.vercel.app",
    title: "Alexis Fiolleau | Creative Developer",
    description: "Interactive 3D portfolio featuring Bento Grid architecture and WebGL experiences.",
    siteName: "Alexis Fiolleau Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexis Fiolleau | Creative Developer",
    description: "Interactive 3D portfolio featuring Bento Grid architecture and WebGL experiences.",
    creator: "@Potowai"
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
