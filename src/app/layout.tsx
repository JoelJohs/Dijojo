import type { Metadata } from "next";
import montserrat from "./fonts/Fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "DiJojo Restaurant",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
