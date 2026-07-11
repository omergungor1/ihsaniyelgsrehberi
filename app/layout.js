import { Inter, Montserrat } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata = {
  title: "İhsaniye LGS Rehberi | Okul Tercih Platformu",
  description:
    "LGS puanınıza göre en uygun okulu bulun. 500+ okul, gelişmiş filtreleme.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${montserrat.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1 pt-[76px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
