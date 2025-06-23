import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "QanoonAI ",
  description: "A Legal Issue Resolver Bot Application for the citizens of Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar/>
            {children}
          <Footer/>
      </body>
    </html>
  );
}
