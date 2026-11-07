import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kwalitygas.com"),
  title: {
    default: "Kwality Gas | Leading LPG Bottlers & Distributors in South India",
    template: "%s | Kwality Gas",
  },
  description:
    "Kwality Gas Bottlers Private Limited – Grade 1 Rated LPG Bottling & Distribution Company with plants in Hosur, Chennai, and Dharwad. 30,000 MTPA storage, 8,000 cylinders/day throughput.",
  keywords: [
    "Kwality Gas",
    "LPG gas Bangalore",
    "domestic LPG cylinder",
    "commercial LPG cylinder",
    "industrial gas cylinders",
    "33kg gas cylinder",
    "17kg commercial cylinder",
    "12kg domestic gas",
    "gas water heater",
    "Grade 1 LPG company",
    "LPG bottling Dharwad",
    "Hosur LPG plant",
  ],
  authors: [{ name: "Kwality Gas Bottlers Pvt Ltd" }],
  openGraph: {
    title: "Kwality Gas | Leading LPG Bottlers & Distributors in South India",
    description:
      "Grade 1 Rated LPG Bottling & Distribution. 30,000 MTPA storage facility, 8,000 cylinders/day capacity, serving domestic, commercial, and industrial clients.",
    url: "https://kwalitygas.com",
    siteName: "Kwality Gas",
    images: [
      {
        url: "/images/original/ban1-1.png",
        width: 1200,
        height: 630,
        alt: "Kwality Gas Bottlers Pvt Ltd",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/images/original/favicon.png",
    apple: "/images/original/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/images/original/favicon.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#182230] font-sans antialiased selection:bg-brand-orange selection:text-white overflow-x-hidden w-full max-w-full">
        <Header />
        <main className="flex-grow w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
