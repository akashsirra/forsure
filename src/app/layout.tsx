import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forsure — Learn it. Understand it. Know it.",
  description: "An adaptive AI programming teacher that teaches until you understand."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}