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
  metadataBase: new URL("https://dreaminfinitydiagnosticsolution.com"),

  title: {
    default: "Dream Infinity Diagnostic Solution | IVD Products & Laboratory Equipment Bangladesh",
    template: "%s | Dream Infinity Diagnostic Solution",
  },

  description:
    "Dream Infinity Diagnostic Solution is a trusted supplier of IVD diagnostic products, laboratory equipment, reagents, consumables, and healthcare solutions in Bangladesh.",

  keywords: [
    "Dream Infinity Diagnostic Solution",
    "IVD Bangladesh",
    "Diagnostic Equipment Bangladesh",
    "Laboratory Equipment",
    "Medical Devices",
    "Clinical Chemistry Analyzer",
    "Immunoassay Analyzer",
    "Hematology Analyzer",
    "Laboratory Reagents",
    "Healthcare Bangladesh",
  ],

  authors: [{ name: "Dream Infinity Diagnostic Solution" }],

  creator: "Dream Infinity Diagnostic Solution",

  publisher: "Dream Infinity Diagnostic Solution",

  alternates: {
    canonical: "https://dreaminfinitydiagnosticsolution.com",
  },

  openGraph: {
    title:
      "Dream Infinity Diagnostic Solution | IVD Products & Laboratory Equipment",
    description:
      "Trusted supplier of IVD products, laboratory equipment, reagents, and healthcare solutions in Bangladesh.",
    url: "https://dreaminfinitydiagnosticsolution.com",
    siteName: "Dream Infinity Diagnostic Solution",
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
<body className="min-h-full flex flex-col">
  <CartProvider>
    <Navbar />
    {children}
  </CartProvider>
</body> 
  </html>
  );
}
