import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://croquet-ireland.vercel.app"),
  title: {
    default: "Croquet Association of Ireland",
    template: "%s | Croquet Association of Ireland",
  },
  description:
    "The governing body for the sport of croquet in Ireland: clubs, competitions, results, rankings and how to start playing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
