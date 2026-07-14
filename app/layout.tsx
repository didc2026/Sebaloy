import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sebaloybd.com"),

  title: {
    default: "Sebaloy | Trusted Online Healthcare Marketplace Bangladesh",
    template: "%s | Sebaloy",
  },

  description:
    "Sebaloy is a trusted online healthcare marketplace in Bangladesh. Buy medicines, healthcare products, baby & mom care items, medical devices and more.",

  keywords: [
    "Sebaloy",
    "Online Pharmacy Bangladesh",
    "Healthcare Marketplace",
    "Medicine",
    "Medical Device",
    "Baby Care",
    "Healthcare Products",
    "Medical Equipment",
    "Bangladesh",
  ],

  authors: [{ name: "Sebaloy" }],
  creator: "Sebaloy",
  publisher: "Sebaloy",

  alternates: {
    canonical: "https://sebaloybd.com",
  },

  openGraph: {
    title: "Sebaloy | Trusted Online Healthcare Marketplace",
    description:
      "Buy medicines, healthcare products, baby care and medical devices from Sebaloy.",
    url: "https://sebaloybd.com",
    siteName: "Sebaloy",
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};