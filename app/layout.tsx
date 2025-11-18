import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Birth Story - A Journey of Hope",
  description: "Every journey is different, but some test every bit of your strength",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
