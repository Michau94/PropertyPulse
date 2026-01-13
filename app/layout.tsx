import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PropertyPulse",
  description: "Find the perfect property with PropertyPulse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <div className="text-white p-2 ">
          <Link href="/" className="mr-4">
            Home
          </Link>
          <Link href="/about">About</Link>
          <Link href="/portfolio" className="ml-4">
            Portfolio
          </Link>
        </div> */}
          <Navbar />
          <main>{children}</main>
          <Footer></Footer>
        </body>
      </html>
    </AuthProvider>
  );
}
