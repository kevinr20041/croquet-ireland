import type { Metadata } from "next";
import { Lora, Public_Sans } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const publicSans = Public_Sans({
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
    "The governing body for the sport of croquet in Ireland — clubs, competitions, results, rankings and how to start playing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} ${publicSans.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
