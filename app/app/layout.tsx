import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "tippa",
  description: "Tipping made easy",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-[#1A120B]`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
