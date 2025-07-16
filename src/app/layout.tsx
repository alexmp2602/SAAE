// src/app/layout.tsx
import "@/styles/globals.css";
import { Geist } from "next/font/google";
import AppLayout from "@/components/AppLayout"; // cliente
import type { Metadata } from "next";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAAE - Sistema de Administración de Acciones Estatutarias",
  description: "Gestión de acciones estatutarias para Región 10",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geist.variable} font-sans`}>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
