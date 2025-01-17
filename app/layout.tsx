import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
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
  title: "CS022labs - Coded Solutions With AI Integrations",
  description: "CS022labs delivers cutting-edge coded solutions powered by AI integrations. We specialize in building intelligent, scalable software systems that drive innovation and efficiency.",
  openGraph: {
    title: "CS022labs - Coded Solutions With AI Integrations",
    description: "CS022labs delivers cutting-edge coded solutions powered by AI integrations. We specialize in building intelligent, scalable software systems that drive innovation and efficiency.",
    images: [
      {
        url: '/image-4.png',
        width: 1200,
        height: 630,
        alt: 'CS022labs AI Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "CS022labs - Coded Solutions With AI Integrations",
    description: "CS022labs delivers cutting-edge coded solutions powered by AI integrations. We specialize in building intelligent, scalable software systems that drive innovation and efficiency.",
    images: ['/image-4.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const inter = `${geistSans.variable} ${geistMono.variable} antialiased`;
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
