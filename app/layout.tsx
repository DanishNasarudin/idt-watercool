import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Footer from "./(components)/Footer";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

const Navbar = dynamic(() => import("./(components)/Navbar"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://watercool.idealtech.com.my"
      : "http://localhost:3000"
  ),
  title: "Ideal Tech PC Watercooling",
  description:
    "Extreme PC customization with Watercooling Solutions through Ideal Tech PC.",
  keywords: [
    "Ideal Tech",
    "Custom PC",
    "Watercooling",
    "Watercool",
    "Full-Loop Watercooling PC",
    "Customized Watercooling PC",
  ],
  icons: {
    icon: "/icon?<generated>",
  },
  appleWebApp: true,
  openGraph: {
    title: "Ideal Tech PC Watercooling",
    description:
      "Extreme PC customization with Watercooling Solutions through Ideal Tech PC.",
    images: [
      {
        url: "https://idealtech.com.my/wp-content/uploads/2023/07/01_Artwork-PC.png",
        width: 1000,
        height: 1000,
        alt: "Ideal Tech Custom PC",
      },
      {
        url: "https://idealtech.com.my/wp-content/uploads/2023/03/IDT_LOGO-150x150.png",
        width: 1000,
        height: 1000,
        alt: "Ideal Tech Gaming PC",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <NextUIProvider>
          <Navbar />
          <div className="mx-auto">{children}</div>
          <div className="h-[50vh]"></div>
          <Footer />
        </NextUIProvider>
      </body>
    </html>
  );
}
