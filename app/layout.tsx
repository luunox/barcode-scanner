import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barcode Scanner Pro",
  description: "Escanea y busca productos instantaneamente",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-neutral-50 antialiased`}>
        <Providers>
          <main className="mx-auto w-full min-h-screen bg-background shadow-2xl overflow-hidden relative border-x border-neutral-200/50">
            {children}
          </main>
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
