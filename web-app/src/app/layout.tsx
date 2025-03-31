import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], preload: false });


export const metadata: Metadata = {
  title: "Chainlink Aggregator",
  description:
    "A chainlink data ggregator that uses google generative AI to predict Market Sentiment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="max-w-[1500px] mx-auto">{children}</div>
      </body>
    </html>
  );
}
