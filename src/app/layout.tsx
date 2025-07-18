// src/app/layout.tsx
import "@/styles/globals.css";
import { Geist } from "next/font/google";
import AppLayout from "@/app/AppLayout";
import type { Metadata } from "next";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAAE - Región 10",
  description:
    "Sistema moderno para la gestión de acciones estatutarias docentes en la Región 10 de la Provincia de Buenos Aires.",
  metadataBase: new URL("https://saae-sist.vercel.app"),
  openGraph: {
    title: "SAAE - Sistema de Administración de Acciones Estatutarias",
    description:
      "Gestión y organización de acciones docentes como MAD, Traslados y Servicios Provisorios en Región 10.",
    url: "https://saae-sist.vercel.app",
    siteName: "SAAE",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "SAAE - Gestión de Acciones Docentes",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAAE - Sistema de Administración de Acciones Estatutarias",
    description:
      "Gestión y organización de acciones docentes como MAD, Traslados y Servicios Provisorios en Región 10.",
    images: ["/logo.png"],
    creator: "@saae_app",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geist.variable} font-sans`}>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
