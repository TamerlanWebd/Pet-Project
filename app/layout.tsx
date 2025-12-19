import type { ReactNode } from "react";
import "./globals.css";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata = {
  title: "Christmas Magic 2025",
  description: "Festive Next.js Application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
